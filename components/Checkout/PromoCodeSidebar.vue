<template>
  <b-sidebar
    id="sidebar-promo-code"
    width="460px"
    title="Sidebar"
    right
    backdrop
    shadow
    bg-variant="white"
    no-header
  >
    <template #default="{ hide }">
      <BaseButton isButton type="m-btn-action m-sidebar-close" @click="hide">
        <span class="material-icons">close</span>
      </BaseButton>
      <div class="pt-6 px-3 px-md-4">
        <p class="my-4 h2 font-weight-bold">Promo</p>
      </div>
      <div class="bg-light p-3">
        <p>Add promo code</p>
        <pre>{{ invoice }}</pre>
        <div class="d-flex">
          <BaseInput
            :disabled="customPromoVerifying"
            class="input-custom-promo"
            v-model="customPromo"
            prepend="local_offer"
            placeholder="Enter promo code"
          />
          <BaseButton
            :disabled="customPromo.length == 0 || customPromoVerifying == true"
            isButton
            type="outline-secondary ml-2"
            @click="applyCustomPromo"
            ><b-spinner
              v-show="customPromoVerifying"
              class="mr-1"
              small
            ></b-spinner
            ><span>Apply</span></BaseButton
          >
        </div>
      </div>
      <div class="promo-codes p-3">
        <CheckoutPromoCode
          v-for="p in promos"
          :key="p.id"
          :promocode="p"
          @select="onPromoCodeSelect"
        />
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      promos: [],
      customPromo: "",
      customPromoVerifying: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      location: (state) => state.locationObj,
      products: (state) => state.products.products,
      hubId: (state) => state.hubId,
    }),
    serviceArea() {
      return this.location.service_area;
    },
    orderItems() {
      return this.products.map((p) => ({
        productsId: p.id,
        quantity: p.quantity,
      }));
    },
    invoice() {
      return {
        orderItems: this.orderItems,
        orderType: "NORMAL",
        serviceAreaId: this.serviceArea,
        contactPersonName: this.user.name,
        contactPersonPhone: this.user.phone,
        fake: false,
        hubId: this.hubId,
        partialOrderAcceptable: false,
        paymentId: 1, // 1 = cash on delivery
        promoCode: this.customPromo, // 1 = cash on delivery
      };
    },
  },
  async mounted() {
    try {
      const res = await this.$axios({
        mode: "cors",
        method: "get",
        url: `/qa/v1/api/promo-codes/active?serviceAreaId=${this.serviceArea}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });
      console.log("...ACTIVE PROMO CODES...", res);
      this.promos = res.data.data;
    } catch (error) {
      console.log("...PROMO CODES NOT FETCHED...");
      console.log(error.response.data);
      // session expired, logout user and redirect to login page
      if (error.response.data.code == 4000) {
        this.$logoutOutSessionExpired();
      }
    }
  },
  methods: {
    async applyCustomPromo() {
      this.customPromoVerifying = true;
      let invoice = { ...this.invoice, promoCode: this.customPromo };
      try {
        const res = await this.$axios({
          mode: "cors",
          method: "post",
          url: `/qa/v2/api/order/invoice`,
          data: invoice,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });

        console.log(res);
      } catch (err) {
        this.$store.dispatch("toast", {
          title: "Error!",
          message: err.response.data.message,
          variant: "danger",
        });
        this.customPromoVerifying = false;
        console.log(err.response.data);
      }
    },
    onPromoCodeSelect(promocode) {
      console.log("selected promo", promocode);
      this.$emit("select", promocode);
      // this.$root.$emit("bv::toggle::collapse", "sidebar-promo-code");
    },
  },
};
</script>

<style lang="css" scoped>
.labels {
  display: flex;
}
.input-custom-promo {
  flex: 1;
}
</style>
