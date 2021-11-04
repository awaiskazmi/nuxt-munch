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
        <!-- <pre>{{ invoice }}</pre> -->
        <div class="d-flex">
          <BaseInput
            :disabled="customPromoVerifying || promoApplied"
            class="input-custom-promo"
            v-model="customPromo"
            prepend="local_offer"
            placeholder="Enter promo code"
          />
          <BaseButton
            :disabled="
              customPromo.length == 0 || customPromoVerifying || promoApplied
            "
            isButton
            type="outline-secondary ml-2"
            @click="applyCustomPromo"
            ><span>Apply</span></BaseButton
          >
        </div>
      </div>
      <p v-if="$fetchState.pending" class="text-center py-5">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </p>
      <div class="promo-codes px-3" v-for="p in promos" :key="p.id">
        <div :id="p.id" class="my-3">
          <!-- promo code card: start -->
          <b-card
            header-bg-variant="white"
            footer-bg-variant="white"
            :title="p.title"
            header-tag="header"
            footer-tag="footer"
          >
            <template #header>
              <div class="d-flex align-items-center justify-content-between">
                <h6 class="d-flex align-items-center mb-0">
                  <span
                    v-if="p.applied"
                    class="material-icons text-success mr-1"
                    >check_circle</span
                  ><span>{{ p.code }}</span>
                </h6>
                <span>Expires: {{ promoCodeExpiry(p.expiredOn) }}</span>
              </div>
            </template>
            <b-card-text>
              {{ p.description }}
            </b-card-text>
            <template #footer>
              <div class="d-flex align-items-center justify-content-between">
                <small class="text-muted">Terms and conditions apply</small>
                <BaseButton
                  :disabled="p.verifying || p.applied || !p.available"
                  isButton
                  @click="onPromoSelect(p)"
                  type="outline-primary px-5"
                  ><b-spinner
                    v-show="p.verifying"
                    class="mr-1"
                    small
                  ></b-spinner
                  ><span>{{
                    !p.applied ? "Apply" : "Applied"
                  }}</span></BaseButton
                >
              </div>
            </template>
          </b-card>
          <!-- promo code card: start -->
        </div>
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
      chosenPromo: "",
      customPromoVerifying: false,
      promoApplied: false,
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
        productsId: p.productId,
        quantity: p.cartQuantity,
      }));
    },
    invoicePromo() {
      return this.customPromo.length > 0 ? this.customPromo : this.chosenPromo;
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
        promoCode: this.invoicePromo, // 1 = cash on delivery
      };
    },
  },
  async fetch() {
    // get all logged in user promo codes
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
      this.promos = this.promos.map((pObj) => ({
        ...pObj,
        available: true,
        verifying: false,
        verified: false,
        applied: false,
      }));
    } catch (error) {
      console.log("...PROMO CODES NOT FETCHED...");
      console.log(error.response.data);
      // session expired, logout user and redirect to login page
      if (error.response.data.code == 4000) {
        this.$logoutOutSessionExpired();
      }
    }
  },
  fetchOnServer: false,
  methods: {
    promoCodeExpiry(timestamp) {
      let end = new Date(timestamp);
      return `${end.getDate()}-${end.getMonth()}-${end.getFullYear()}`;
    },
    onPromoSelect(promoCode) {
      console.log(promoCode);
      // 1. set verifying, disable button etc
      promoCode.verifying = true;
      // 2. set promo code in invoice
      this.chosenPromo = promoCode.code;
      // 3. send invoice call
      this.applyCustomPromo(promoCode);
    },
    async applyCustomPromo(promoCode = null) {
      this.customPromoVerifying = true;
      try {
        const res = await this.$axios({
          mode: "cors",
          method: "post",
          url: `/qa/v2/api/order/invoice`,
          data: this.invoice,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
        if (promoCode != null) {
          promoCode.avialable = false;
          promoCode.verifying = false;
          promoCode.verified = true;
          promoCode.applied = true;
        }
        // disable all other promo codes
        this.promos = this.promos.map((pObj) => ({
          ...pObj,
          available: false,
        }));
        // disable spinners
        this.customPromoVerifying = false;
        this.promoApplied = true;
        // emit new invoice data
        let promoData = {
          invoice: res.data,
          promo: this.invoicePromo,
        };
        this.$emit("select", promoData);
        this.$root.$emit("bv::toggle::collapse", "sidebar-promo-code");
      } catch (err) {
        this.$store.dispatch("toast", {
          title: `Error ${err.response.data.code}`,
          message: err.response.data.message,
          variant: "danger",
        });
        this.customPromoVerifying = false;
      }
    },
    onPromoCodeSelect(promocode) {
      console.log("selected promo", promocode.code);
      this.customPromo = "";
      this.chosenPromo = promocode.code;
      this.applyCustomPromo();
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
