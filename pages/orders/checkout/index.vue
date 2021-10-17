<template>
  <div class="container-fluid py-md-5">
    <div class="row">
      <div class="col-12 col-md-6 order-1 order-md-0 px-md-7">
        <!-- breadcrumbs -->
        <div class="d-none d-md-block">
          <b-breadcrumb>
            <b-breadcrumb-item to="/">
              <span class="d-flex align-items-center">
                <small class="material-icons icon-home mr-1">home</small>
                Home
              </span>
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
            <b-breadcrumb-item to="/checkout" active
              >Checkout</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
        <h1 class="mt-3">Checkout</h1>
        <!-- address details -->
        <div>
          <div class="row">
            <div class="col-auto">
              <h4>Deliver to</h4>
            </div>
            <div class="col-auto ml-auto">
              <BaseButton
                v-b-toggle.sidebar-location
                type="outline-secondary"
                variant="sm"
                >Change address</BaseButton
              >
            </div>
          </div>
          <div class="row">
            <div class="col address-details">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col-auto mr-3">
                  <img src="~/assets/images/icon-location.svg" height="24" />
                </div>
                <div class="col">
                  <h6 class="font-weight-bold">
                    {{ area }}
                  </h6>
                  <p class="text-muted m-0">
                    <small v-if="address.details">{{ address.details }}</small>
                    <small v-else>Click on plus to add address details</small>
                  </p>
                </div>
                <div class="col-auto">
                  <button
                    v-b-toggle.sidebar-address
                    class="btn btn-outline-secondary btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- order details -->
        <div>
          <div class="row">
            <div class="col-auto">
              <h4>Order details</h4>
            </div>
            <div class="col-auto ml-auto">
              <BaseButton
                url="/orders/view-cart"
                type="outline-secondary"
                variant="sm"
                >View details</BaseButton
              >
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col-auto mr-3">
                  <img src="~/assets/images/icon-location.svg" height="24" />
                </div>
                <div class="col">
                  <h6 class="font-weight-bold">
                    {{ itemsCount }} items - Rs. {{ total }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- promo code -->
        <div>
          <div class="row">
            <div class="col">
              <h4>Promo code</h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col-auto mr-3">
                  <img src="~/assets/images/icon-location.svg" height="24" />
                </div>
                <div class="col">
                  <h6 class="text-muted">Add promo code</h6>
                  <p class="mt-1 mb-0" v-if="promo.length > 0">{{ promo }}</p>
                </div>
                <div class="col-auto">
                  <button
                    v-b-toggle.sidebar-promo-code
                    class="btn btn-outline-secondary btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- when -->
        <div>
          <div class="row">
            <div class="col-auto">
              <h4>When</h4>
            </div>
            <div class="col-auto ml-auto">
              <span>6pm &mdash; 9pm</span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col d-flex">
                  <BaseRadio label="Now" />
                  <BaseRadio label="Later" />
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- payment method -->
        <div>
          <div class="row">
            <div class="col">
              <h4>Payment Method</h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col-auto mr-3">
                  <img src="~/assets/images/icon-location.svg" height="24" />
                </div>
                <div class="col">
                  <h6 class="text-muted">Cash on Delivery</h6>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- payment method -->
        <div>
          <div class="row">
            <div class="col-auto">
              <h4>Order for someone else</h4>
            </div>
            <div class="col-auto ml-auto">
              <b-form-checkbox
                v-model="someoneElseSwitch"
                name="check-button"
                switch
                size="lg"
              />
            </div>
          </div>
          <div class="row" v-if="someoneElseSwitch">
            <div class="col">
              <p><label for="">Recipient's Details</label></p>
              <div class="row">
                <div class="col-6">
                  <BaseInput placeholder="Name" />
                </div>
                <div class="col-6">
                  <BaseInput placeholder="Phone" />
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- notes -->
        <div>
          <div class="row">
            <div class="col-auto">
              <h4>Delivery Notes</h4>
            </div>
            <div class="col-auto ml-auto">
              <span class="text-muted">Optional</span>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <textarea
                rows="5"
                placeholder="e.g. please don't ring the bell"
                class="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- place order -->
        <div>
          <div class="row mt-4">
            <div class="col">
              <BaseButton type="primary" full
                >Place Order - Rs. {{ total }}</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 order-0 order-md-1 p-0" id="map-wrapper">
        <nuxtjs-sticky-sidebar class="h-100">
          <CheckoutMap @update="onMapUpdate" />
        </nuxtjs-sticky-sidebar>
      </div>
    </div>
    <!-- Address sidebar -->
    <CheckoutAddressSidebar @update="onAddressUpdate" />
    <!-- Promo code sidebar -->
    <CheckoutPromoCodeSidebar @select="onPromoCodeSelect" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import nuxtjsStickySidebar from "nuxtjs-sticky-sidebar";

export default {
  components: {
    "nuxtjs-sticky-sidebar": nuxtjsStickySidebar,
  },
  data() {
    return {
      center: {},
      address: {},
      promo: {},
      schedule: {},
      payment: {},
      someoneElseSwitch: false,
      someoneElse: {},
      notes: {},
    };
  },
  computed: {
    ...mapState({
      area: (state) => state.location,
    }),
    ...mapGetters({
      getAddedProducts: "getAddedProducts",
    }),
    items: {
      get() {
        return this.getAddedProducts;
      },
    },
    itemsCount() {
      return this.items
        .map((obj) => obj.quantity)
        .reduce((prev, next) => prev + next, 0);
    },
    total() {
      let total = 0;
      this.items.forEach((p) => {
        total = total + parseInt(p.quantity) * parseInt(p.price);
      });
      return total;
    },
  },
  methods: {
    onMapUpdate(center) {
      this.center = center;
    },
    onAddressUpdate(address) {
      this.address = address;
    },
    onPromoCodeSelect(promo) {
      this.promo = promo;
    },
  },
};
</script>

<style scoped lang="sass">
#map-wrapper
  @media(max-width: 768px)
    position: relative
    width: 100%
    height: 320px
    margin-bottom: 1.5rem
h4
  font-weight: bold
  margin-bottom: 1.5rem
h1,
hr
  margin-bottom: 2rem
h6
  margin: 0
.suggestion
  padding: 1rem 0
  border-radius: 8px

  &:not(:last-child)::after
    content: ''
    display: none
    height: 1px
    width: 100%
    margin: 1rem 0
    background-color: #E0E0E0
</style>
