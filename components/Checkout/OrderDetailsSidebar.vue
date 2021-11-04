<template>
  <b-sidebar
    id="sidebar-order-details"
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
      <div class="d-flex flex-column justify-content-between h-100">
        <div class="pt-6 pb-2 px-3 px-md-4">
          <p class="my-4 h2 font-weight-bold">Order Details</p>
          <div class="mt-5 mt-md-6"></div>
          <div
            v-for="product in products"
            :key="product.id"
            class="row mb-3 product-rows"
          >
            <div class="col d-flex align-items-center">
              <div class="product-count">{{ product.cartQuantity }}</div>
              <div class="product-name">{{ product.name }}</div>
            </div>
            <div class="col-auto ml-auto">
              Rs. {{ product.cartQuantity * product.price }}
            </div>
          </div>
          <hr />
          <div class="row mb-3">
            <div class="col-auto">Sub total</div>
            <div class="col-auto ml-auto">Rs. {{ subtotal }}</div>
          </div>
          <div class="row mb-3">
            <div class="col-auto">Discount</div>
            <div class="col-auto ml-auto">Rs. {{ discount }}</div>
          </div>
          <div class="row mb-3">
            <div class="col-auto">Delivery charges</div>
            <div class="col-auto ml-auto">
              <small class="text-secondary">Rs. {{ daliveryCharges }}</small>
            </div>
          </div>
          <hr />
          <div class="row mb-3">
            <div class="col-auto h5">Total</div>
            <div class="col-auto ml-auto h5">Rs. {{ total }}</div>
          </div>
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["orderAmountDetails"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    discount() {
      return this.orderAmountDetails.discount;
    },
    daliveryCharges() {
      return this.orderAmountDetails.delivery;
    },
    subtotal() {
      return this.orderAmountDetails.discountedSubTotal;
    },
    total() {
      return this.orderAmountDetails.orderTotal;
    },
  },
};
</script>

<style lang="sass" scoped>
.product-count
  height: 24px
  width: 24px
  border-radius: 100px
  background-color: #E3F5FB
  color: #315780
  font-weight: 500
  font-size: .8rem
  display: inline-flex
  align-items: center
  justify-content: center
  margin-right: 0.5rem
</style>
