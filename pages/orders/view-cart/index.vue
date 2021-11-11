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
            <div class="row product" v-for="p in products" :key="p.productId">
              <div class="col-3 pr-0">
                <div class="image-wrapper">
                  <img
                    :src="`https://munchies-qa.impact.venturedive.com/v2/public/resources/${p.imageUrl}`"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="col-9 col-md d-flex flex-column justify-content-between"
              >
                <h4 class="font-weight-bold mb-3">{{ p.name }}</h4>
                <!-- <p class="text-muted">{{ p.weight }}</p> -->
                <div class="d-flex align-items-end justify-content-between">
                  <div class="price" v-if="p.productDiscountDto != null">
                    <span class="sale">
                      Rs. {{ p.productDiscountDto.discountedPrice }}
                    </span>
                    <span class="original"
                      ><s>Rs. {{ p.price }}</s></span
                    >
                  </div>
                  <div v-else class="price">
                    <span class="sale">Rs. {{ p.price }}</span>
                  </div>
                  <ProductControls :product="{ ...p }" />
                </div>
              </div>
            </div>
            <!-- product row: end -->
          </div>
          <div class="col-12 col-md-4">
            <p v-if="$fetchState.pending" class="p-3 text-center">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </p>
            <nuxtjs-sticky-sidebar v-else>
              <div class="bg-light mb-3">
                <div class="p-3 border-bottom">
                  <h3>Order summary</h3>
                </div>
                <div class="px-3">
                  <div class="row py-2">
                    <div class="col">Sub total</div>
                    <div class="col-auto">Rs. {{ subtotal }}</div>
                  </div>
                  <div class="row py-2">
                    <div class="col">Dicsount</div>
                    <div class="col-auto">Rs. {{ discount }}</div>
                  </div>
                  <div class="row py-2 d-none">
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
              <div>
                <div v-if="!auth">
                  <BaseButton
                    full
                    type="primary"
                    url="/login?ref=orders-view-cart"
                    >Sign in to place order</BaseButton
                  >
                </div>
                <div v-else-if="auth && orderAlreadyInProgress">
                  <BaseButton disabled full type="primary" url="#"
                    >1 order(s) already in progress</BaseButton
                  >
                </div>
                <div v-else-if="auth && !orderAlreadyInProgress && total < 100">
                  <div class="alert text-center">
                    Minimum order amount is Rs. 100
                  </div>
                  <BaseButton disabled full type="primary" url="/orders/"
                    >Checkout - Rs. {{ total }}</BaseButton
                  >
                </div>
                <div
                  v-else-if="auth && !orderAlreadyInProgress && total >= 100"
                >
                  <BaseButton full type="primary" url="/orders/checkout"
                    >Checkout - Rs. {{ total }}</BaseButton
                  >
                </div>
              </div>
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
      orderAlreadyInProgress: false,
      anim: null,
      lottieOptions: {
        animationData: animData.default,
      },
    };
  },
  async fetch() {
    const res = await this.$axios({
      mode: "cors",
      method: "get",
      url: `/qa/v2/api/orders/list?orderStates=IN_PROGRESS`,
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      },
    });
    console.log("...IN PROGRESS ORDERS...", res.data.data);
    if (res.data.data.length > 0) this.orderAlreadyInProgress = true;
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
    subtotal() {
      let total = 0;
      this.products.forEach((p) => {
        total = total + parseInt(p.cartQuantity) * parseInt(p.price);
      });
      return parseInt(total);
    },
    discount() {
      let discount = 0;
      this.products.forEach((p) => {
        if (p.productDiscountDto != null) {
          discount +=
            parseInt(p.cartQuantity) *
            parseInt(p.price - p.productDiscountDto.discountedPrice);
        }
      });
      return parseInt(discount);
    },
    total() {
      let sub = 0;
      this.products.forEach((p) => {
        if (p.productDiscountDto == null) {
          sub += parseInt(p.cartQuantity) * parseInt(p.price);
        } else {
          sub +=
            parseInt(p.cartQuantity) *
            parseInt(p.productDiscountDto.discountedPrice);
        }
      });
      return parseInt(sub);
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

.price
  margin-top: 28px

  .sale
    font-size: 20px
    font-weight: 700
  .original
    font-size: 1rem
    font-weight: 600
    color: #F95050
    margin-left: 0.25rem
</style>
