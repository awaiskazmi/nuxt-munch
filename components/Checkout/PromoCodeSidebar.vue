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
          <div class="flex-grow-1 position-relative">
            <button
              @click="clearPromo"
              v-if="promoCode && promoCode.length > 0"
              class="clear-promo-code"
            >
              <span class="material-icons">close</span>
            </button>
            <BaseInput
              class="input-custom-promo"
              v-model="promoCode"
              prepend="local_offer"
              placeholder="Enter promo code"
            />
          </div>
          <BaseButton
            :disabled="
              (promoCode && promoCode.length == 0) || inputPromoVerifying
            "
            isButton
            type="outline-secondary ml-2"
            @click="applyPromoCode('input')"
            ><b-spinner
              v-show="inputPromoVerifying"
              class="mr-1"
              small
            ></b-spinner
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
                  :disabled="p.verifying || p.applied"
                  isButton
                  @click="onPromoSelect(p)"
                  type="outline-primary px-3"
                  ><b-spinner
                    v-show="p.verifying"
                    class="mr-1"
                    small
                  ></b-spinner>
                  <span v-show="p.applied" class="material-icons mr-1"
                    >check</span
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
      promoCode: "",
      inputPromoVerifying: false,
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
        promoCode: this.promoCode, // 1 = cash on delivery
      };
    },
  },
  async fetch() {
    this.getUserPromoCodes();
  },
  fetchOnServer: false,
  methods: {
    async getUserPromoCodes() {
      console.log("...fetching promos...");
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
        this.promos = res.data.data;
        this.promos = this.promos.map((pObj) => ({
          ...pObj,
          verifying: false,
          applied: pObj.code == this.promoCode ? true : false,
        }));
      } catch (error) {
        // session expired, logout user and redirect to login page
        if (error.response.data.code == 4000) {
          this.$logoutOutSessionExpired();
        }
      }
    },
    clearPromo() {
      this.promoCode = null;
      this.getUserPromoCodes();
      this.applyPromoCode("input");
    },
    promoCodeExpiry(timestamp) {
      let end = new Date(timestamp);
      return `${end.getDate()}-${end.getMonth()}-${end.getFullYear()}`;
    },
    onPromoSelect(promoCode) {
      // 1. set promo code in invoice
      this.customPromo = promoCode.code;
      // 2. send invoice call
      this.applyPromoCode("promo", promoCode);
    },
    async applyPromoCode(source, promoCode = null) {
      // check if promo from input or selected
      if (source == "input") {
        // from input
        this.inputPromoVerifying = true;
      } else {
        // from object
        this.promoCode = promoCode.code;
        promoCode.verifying = true;
      }
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

        this.getUserPromoCodes();
        // emit new invoice data
        let promoData = {
          invoice: res.data,
          promo: promoCode,
        };

        this.$emit("select", promoData);
        this.$root.$emit("bv::toggle::collapse", "sidebar-promo-code");

        // enable disable relevant spinners
        source == "input"
          ? (this.inputPromoVerifying = false)
          : (promoCode.verifying = false);
      } catch (err) {
        this.$store.dispatch("toast", {
          title: `Error applying promo code!`,
          message: err.response.data.message,
          variant: "danger",
        });

        source == "input"
          ? (this.inputPromoVerifying = false)
          : (promoCode.verifying = false);
      }
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
.clear-promo-code {
  position: absolute;
  top: 17px;
  right: 17px;
  height: 16px;
  width: 16px;
  border-radius: 100px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border: none;
  flex-grow: 0;
  flex-shrink: 0;
}
.clear-promo-code span {
  font-size: 12px;
}
</style>
