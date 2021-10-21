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
        <div class="d-flex">
          <BaseInput
            :disabled="customPromoVerifying"
            class="input-custom-promo"
            v-model="customPromo"
            prepend="local_offer"
            placeholder="PROMOCODE"
          />
          <BaseButton
            :disabled="customPromo.length == 0"
            isButton
            type="outline-secondary ml-2"
            @click="applyCustomPromo"
            >Apply</BaseButton
          >
        </div>
        <div class="pt-3 text-center">
          <b-spinner variant="secondary" label="Spinning"></b-spinner>
        </div>
        {{ customPromo }}
        <pre>{{ invoice }}</pre>
      </div>
      <div class="promo-codes p-3">
        <CheckoutPromoCode
          v-for="p in promos"
          :key="p.id"
          :id="p.id"
          :code="p.code"
          :description="p.description"
          :start="p.effectiveFrom"
          :end="p.expiredOn"
          :status="p.status"
          :title="p.title"
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
      customPromo: "MYPROMO",
      customPromoVerifying: false,
      promos: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      location: (state) => state.locationObj,
      products: (state) => state.products.products,
    }),
    serviceArea() {
      return this.location.service_area;
    },
    invoice() {
      return {
        orderItems: this.products,
        orderType: "NORMAL",
        serviceAreaId: this.serviceArea,
        contactPersonName: this.user.name,
        contactPersonPhone: this.user.phone,
        fake: false,
        hubId: 11836,
        partialOrderAcceptable: false,
        paymentId: 1, // 1 = cash on delivery
        promoCode: "mypromo", // 1 = cash on delivery
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
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async applyCustomPromo() {
      let invoice = { ...this.invoice, promoCode: this.customPromo };
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
    },
    onPromoCodeSelect(code) {
      this.$emit("select", code);
      this.$root.$emit("bv::toggle::collapse", "sidebar-promo-code");
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
