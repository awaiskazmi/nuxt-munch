<template>
  <div class="container py-md-5">
    <div class="row">
      <div class="col-12 col-md-6 order-1 order-md-0 pr-md-5">
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
                <div class="col pr-md-4">
                  <h6 class="font-weight-bold">
                    {{ address.locationName }}
                  </h6>
                  <p class="text-muted m-0">
                    <small v-if="'additionalDetails' in address">{{
                      address.additionalDetails
                    }}</small>
                    <small v-else>Click on plus to add address details</small>
                  </p>
                </div>
                <div class="col-auto">
                  <button v-b-toggle.sidebar-address class="btn m-btn-add">
                    <span class="material-icons">add</span>
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
                isButton
                type="outline-secondary"
                variant="sm"
                v-b-toggle.sidebar-order-details
                >View details</BaseButton
              >
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col-auto mr-3">
                  <img
                    src="~/assets/images/icon-order-details.svg"
                    height="24"
                  />
                </div>
                <div class="col">
                  <h6 class="font-weight-bold">
                    {{ itemsCount }} items - Rs.
                    {{ orderAmountDetails.orderTotal }}
                    <!-- discount applied -->
                    <small
                      class="text-danger"
                      v-if="
                        orderAmountDetails.orderTotal !=
                        orderAmountDetails.total
                      "
                      ><s>Rs. {{ orderAmountDetails.total }}</s></small
                    >
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
                  <img src="~/assets/images/icon-promo-code.svg" height="24" />
                </div>
                <div class="col">
                  <h6 class="text-muted">
                    {{
                      orderAmountDetails.orderTotal == orderAmountDetails.total
                        ? "Add promo code"
                        : "Promo code applied"
                    }}
                  </h6>
                </div>
                <div class="col-auto">
                  <button v-b-toggle.sidebar-promo-code class="btn m-btn-add">
                    <span class="material-icons">add</span>
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
              <span>15 &mdash; 20 minutes</span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row no-gutters align-items-center suggestion">
                <div class="col d-flex">
                  <BaseRadio
                    v-for="label in scheduleOptions"
                    :key="label.id"
                    :id="label.id"
                    :label="label.name"
                    :value="label.name"
                    :checked="scheduleOptionSelected == label.name"
                    v-model="scheduleOptionSelected"
                    name="radioSchedule"
                    @change="onScheduleOption(label)"
                  />
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
                  <img src="~/assets/images/icon-payment.svg" height="24" />
                </div>
                <div class="col">
                  <h6 class="text-muted">Cash on Delivery</h6>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <!-- someone else -->
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
          <div class="row mb-4" v-if="someoneElseSwitch">
            <div class="col">
              <p><label for="">Recipient's Details</label></p>
              <div class="row">
                <div class="col-6 pr-2">
                  <BaseInput
                    v-model="someoneElse.name"
                    placeholder="Full name"
                  />
                </div>
                <div class="col-6 pl-2">
                  <BaseInput
                    v-model="someoneElse.phone"
                    prependText="+92"
                    placeholder="Phone number"
                    maxLength="10"
                  />
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
                v-model="notes"
                placeholder="e.g. please don't ring the bell"
                class="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- place order -->
        <!-- if phone number is verified -->
        <div v-if="user.phoneVerified">
          <div class="row mt-4">
            <div class="col">
              <!-- if address details added -->
              <BaseButton
                v-if="readyToOrder"
                :disabled="isAttemptingPlacingOrder"
                isButton
                type="primary"
                full
                :title="
                  !readyToOrder ? 'You need to add your address details' : ''
                "
                @click="placeOrder"
                ><b-spinner
                  v-show="isAttemptingPlacingOrder"
                  class="mr-1"
                  small
                ></b-spinner
                ><span
                  >Place Order -
                  <u>Rs. {{ orderAmountDetails.orderTotal }}</u></span
                ></BaseButton
              >
              <!-- if address details NOT added -->
              <BaseButton
                v-else
                isButton
                type="primary"
                full
                v-b-toggle.sidebar-address
                >Add address details</BaseButton
              >
            </div>
          </div>
        </div>
        <!-- if phone number is NOT verified -->
        <div v-else>
          <div class="row mt-4">
            <div class="col">
              <BaseButton
                url="/auth/verify-phone?ref=checkout"
                type="primary"
                full
                >Verify phone number</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-12 col-md-6 order-0 order-md-1 px-0 px-md-3"
        id="map-wrapper"
      >
        <nuxtjs-sticky-sidebar class="h-100">
          <CheckoutMap @update="onMapUpdate" />
        </nuxtjs-sticky-sidebar>
      </div>
    </div>
    <!-- Address sidebar -->
    <CheckoutAddressSidebar @update="onAddressUpdate" />
    <!-- Order details sidebar -->
    <CheckoutOrderDetailsSidebar :orderAmountDetails="orderAmountDetails" />
    <!-- Promo code sidebar -->
    <CheckoutPromoCodeSidebar @select="onPromoCodeSelect" />
    <!-- Schedule sidebar -->
    <!-- <CheckoutScheduleSidebar
      :selected="scheduleOptionSelected"
      @select="onScheduleSelect"
    /> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import nuxtjsStickySidebar from "nuxtjs-sticky-sidebar";

export default {
  middleware({ store, redirect }) {
    if (!store.state.auth) {
      return redirect("/");
    }
  },
  components: {
    "nuxtjs-sticky-sidebar": nuxtjsStickySidebar,
  },
  data() {
    return {
      isAttemptingPlacingOrder: false,
      scheduleOptions: [
        {
          id: 1,
          name: "Now",
        },
        // {
        //   id: 2,
        //   name: "Later",
        // },
      ],
      title: "Custom title",
      scheduleOptionSelected: "Now",
      center: {},
      promo: null,
      schedule: {},
      paymentMethod: 1, // 1 = cash
      someoneElseSwitch: false,
      someoneElse: {
        name: "",
        phone: "",
      },
      notes: "",
      orderAmountDetails: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      address: (state) => state.locationObj,
      location: (state) => state.locationObj,
      hubId: (state) => state.hubId,
    }),
    readyToOrder: {
      get() {
        return this.address.addressId == null ? false : true;
      },
      set(newVal) {
        console.log(newVal);
        return newVal;
      },
    },
    ...mapGetters({
      getAddedProducts: "getAddedProducts",
    }),
    items: {
      get() {
        return this.getAddedProducts;
      },
    },
    addressId() {
      return this.address.addressId ? this.address.addressId : null;
    },
    elsePrePhone() {
      return "+92" + this.someoneElse.phone;
    },
    itemsCount() {
      return this.items
        .map((obj) => obj.cartQuantity)
        .reduce((prev, next) => prev + next, 0);
    },
    total() {
      let total = 0;
      this.items.forEach((p) => {
        total = total + parseInt(p.cartQuantity) * parseInt(p.price);
      });
      return total;
    },
    contactPersonName() {
      return this.someoneElseSwitch ? this.someoneElse.name : this.user.name;
    },
    contactPersonPhone() {
      return this.someoneElseSwitch
        ? "+92" + this.someoneElse.phone
        : this.user.phone;
    },
    invoice() {
      return {
        orderItems: this.items.map((item) => ({
          productsId: item.productId,
          quantity: item.cartQuantity,
        })),
        orderType: "NORMAL",
        serviceAreaId: this.location.service_area,
        contactPersonName: this.contactPersonName,
        contactPersonPhone: this.contactPersonPhone,
        fake: false,
        hubId: this.hubId,
        partialOrderAcceptable: false,
        paymentId: 1, // 1 = cash on delivery
        promoCode: null,
      };
    },
    orderDetails() {
      return {
        addressId: this.addressId,
        serviceAreaId: this.location.service_area,
        customerId: this.user.id,
        partialOrderAcceptable: true,
        swappable: true,
        paymentId: 1, // 1 = COD
        hubId: this.hubId,
        fake: false,
        contactPersonName: this.contactPersonName,
        contactPersonPhone: this.contactPersonPhone,
        orderType: "NORMAL",
        deliveryInstruction: this.notes,
        deliverySlotId: 0,
        deliveryTime: 0,
        deliveryType: "NOW",
        promoCode: this.promo,
        orderItems: this.items.map((item) => ({
          productsId: item.productId,
          quantity: item.cartQuantity,
        })),
      };
    },
  },
  created() {
    // send invoice call and get all the details
    this.fetchInvoice();
  },
  methods: {
    async fetchInvoice() {
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
        this.orderAmountDetails = res.data;
        console.log("ORDER DETAILS WITHOUT PROMO ===", res.data);
      } catch (error) {
        console.log(error.response.data);
        // session expired, logout user and redirect to login page
        if (error.response.data.code == 4000) {
          this.$logoutOutSessionExpired();
        }
      }
    },
    onScheduleOption(option) {
      if (option.name == "Later") {
        this.$root.$emit("bv::toggle::collapse", "sidebar-schedule");
      }
    },
    onMapUpdate(center) {
      this.center = center;
    },
    onAddressUpdate(address) {
      // console.warn(address);
      // this.addressId = address;
      // this.return;
      // console.log("ADDRESS SELECTED ===", address);
      // this.$store.commit("setUserLocation", address.locationName);
      // this.$store.commit("setUserLocationAddress", address);
      this.readyToOrder = true;
    },
    onPromoCodeSelect({ invoice, promo }) {
      this.orderAmountDetails = invoice;
      this.promo = promo;
    },
    onScheduleSelect(schedule) {
      console.log(schedule);
      return;
    },
    async placeOrder() {
      console.log("...placing order...");
      this.isAttemptingPlacingOrder = true;

      try {
        // place order
        const res = await this.$axios({
          mode: "cors",
          method: "post",
          url: `/qa/v2/api/order`,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
          data: this.orderDetails,
        });

        // enable place order button
        console.log("...order placed...", res);
        this.isAttemptingPlacingOrder = false;

        // reset cart
        this.$store.commit("resetCart");

        // redirect to order detail page
        this.$router.push(`/orders/tracking/${res.data.id}`);
      } catch (error) {
        this.$store.dispatch("toast", {
          title: "Error",
          message: error.response.data.message,
          variant: "danger",
        });
        this.isAttemptingPlacingOrder = false;
      }
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
