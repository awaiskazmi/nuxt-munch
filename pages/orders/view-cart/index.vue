<template>
  <div class="container py-3 py-md-5">
    <div class="d-none d-md-block">
      <b-breadcrumb>
        <b-breadcrumb-item to="/">
          <span class="d-flex align-items-center">
            <small class="material-icons icon-home mr-1">home</small>
            Home
          </span>
        </b-breadcrumb-item>
        <b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
        <b-breadcrumb-item to="/view-cart" active>Cart</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="row">
      <div class="col">
        <h1>My cart</h1>
        <div v-if="products.length > 0" class="row mt-4 mt-md-5">
          <div class="col-12 col-md-8">
            <!-- product row: start -->
            <div class="row product" v-for="p in products" :key="p.id">
              <div class="col-3 pr-0">
                <div class="image-wrapper">
                  <img
                    :src="`https://munchies-qa.impact.venturedive.com/v2/public/resources/${p.imageUrl}`"
                    alt=""
                  />
                </div>
              </div>
              <div class="col">
                <h4 class="font-weight-bold mb-3">{{ p.name }}</h4>
                <p class="text-muted">{{ p.weight }}</p>
                <h5>Rs. {{ p.price }}</h5>
              </div>
              <div class="col-auto align-self-start d-flex align-items-center">
                <ProductControls :product="{ ...p }" />
              </div>
            </div>
            <!-- product row: end -->
          </div>
          <div class="col-12 col-md-4">
            <nuxtjs-sticky-sidebar>
              <div class="bg-light mb-3">
                <div class="p-3 border-bottom">
                  <h3>Order summary</h3>
                </div>
                <div class="px-3">
                  <div class="row py-2">
                    <div class="col">Sub total</div>
                    <div class="col-auto">Rs. {{ total }}</div>
                  </div>
                  <div class="row py-2">
                    <div class="col">Dicsount</div>
                    <div class="col-auto">Rs. {{ discount }}</div>
                  </div>
                  <div class="row py-2">
                    <div class="col">Delivery charges</div>
                    <div class="col-auto">
                      <small class="text-secondary">FREE</small>
                    </div>
                  </div>
                  <div class="row py-3 border-top">
                    <div class="col h5">Total</div>
                    <div class="col-auto h5">Rs. {{ total }}</div>
                  </div>
                </div>
              </div>
              <BaseButton v-if="!auth" full type="primary" url="/login"
                >Checkout - Rs. {{ total }}</BaseButton
              >
              <BaseButton v-else full type="primary" url="/orders/checkout"
                >Checkout - Rs. {{ total }}</BaseButton
              >
            </nuxtjs-sticky-sidebar>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-12 col-md-4 mx-auto text-center">
            <lottie
              :height="300"
              :options="lottieOptions"
              v-on:animCreated="handleAnimation"
            />
            <h4 class="font-weight-bold">Ah.. Empty cart?!</h4>
            <p class="text-muted">
              Fill your cart and heart with some snack-love now! <3
            </p>
            <BaseButton full type="primary" url="/orders"
              >Continue shopping</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import nuxtjsStickySidebar from "nuxtjs-sticky-sidebar";
import lottie from "vue-lottie/src/lottie.vue";
import * as animData from "~/static/lottie/empty-cart.json";

export default {
  components: {
    "nuxtjs-sticky-sidebar": nuxtjsStickySidebar,
    lottie: lottie,
  },
  data() {
    return {
      anim: null,
      lottieOptions: {
        animationData: animData.default,
      },
    };
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      products: (state) => state.products.products,
    }),
    discount() {
      return 0;
    },
    total() {
      let total = 0;
      this.products.forEach((p) => {
        total = total + parseInt(p.quantity) * parseInt(p.price);
      });
      return total;
    },
  },
};
</script>

<style scoped lang="sass">
.product::after
  content: ''
  display: block
  width: 100%
  height: 1px
  margin: 1rem 0
  background-color: #ddd
.h5
  margin: 0

.image-wrapper
  position: relative
  height: 0
  padding-bottom: 75%

  img
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 100%
    object-fit: contain
</style>
