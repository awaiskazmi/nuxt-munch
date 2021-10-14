<template>
  <div class="container py-md-5">
    <div class="d-none d-md-block">
      <b-breadcrumb>
        <b-breadcrumb-item to="/">
          <span class="d-flex align-items-center">
            <small class="material-icons icon-home mr-1">home</small>
            Home
          </span>
        </b-breadcrumb-item>
        <b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
        <b-breadcrumb-item to="/checkout" active>Checkout</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <h1>Checkout</h1>
    <div class="row mt-5">
      <div class="col-12 col-md-6">
        <!-- address details -->
        <div class="row">
          <div class="col-auto">
            <h4>Deliver to</h4>
          </div>
          <div class="col-auto ml-auto">
            <BaseButton type="outline-secondary" variant="sm"
              >Change address</BaseButton
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
                  {{ area }}
                </h6>
                <p class="text-muted m-0">
                  <small>Click on plus to add address details</small>
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
        <!-- order details -->
        <div class="row">
          <div class="col-auto">
            <h4>Order details</h4>
          </div>
          <div class="col-auto ml-auto">
            <BaseButton type="outline-secondary" variant="sm"
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
                <h6 class="font-weight-bold">{{ items }} items</h6>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- promo code -->
        <div class="row">
          <div class="col-auto">
            <h4>Promo code</h4>
          </div>
          <div class="col-auto ml-auto">
            <BaseButton type="outline-secondary" variant="sm"
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
                <h6 class="text-muted">Add promo code</h6>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- when -->
        <div class="row">
          <div class="col-auto">
            <h4>When</h4>
          </div>
          <div class="col-auto ml-auto">
            <BaseButton type="outline-secondary" variant="sm"
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
                <h6 class="text-muted">Add promo code</h6>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- payment method -->
        <div class="row">
          <div class="col-auto">
            <h4>Payment Method</h4>
          </div>
          <div class="col-auto ml-auto">
            <BaseButton type="outline-secondary" variant="sm"
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
                <h6 class="text-muted">Add promo code</h6>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- payment method -->
        <div class="row">
          <div class="col-auto">
            <h4>Order for someone else</h4>
          </div>
          <div class="col-auto ml-auto">
            <BaseButton type="outline-secondary" variant="sm"
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
                <h6 class="text-muted">Add promo code</h6>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- payment method -->
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
        <div class="row mt-4">
          <div class="col">
            <BaseButton type="primary" full>Place Order - Rs. 460</BaseButton>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div
          class="bg-light p-5 d-flex align-items-center justify-content-center h-100"
        >
          Google map here
        </div>
      </div>
    </div>
    <!-- Address sidebar -->
    <b-sidebar
      width="460px"
      id="sidebar-address"
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
          <div class="py-6 px-4">
            <p class="my-4 h2 font-weight-bold">Add address details</p>
            <p>Please enter location details and label them</p>
            <p class="mt-3">
              <small><strong>Location details</strong></small>
            </p>
            <BaseInput
              placeholder="House no. / Flat no. / Floor / Building name"
              variant="md"
            />
            <p class="mt-3">
              <small><strong>Label</strong></small>
            </p>
            <div class="labels">
              <BaseButton
                type="outline-secondary"
                variant="sm"
                rounded
                icon="home"
                >Home</BaseButton
              >
              <BaseButton
                type="outline-secondary"
                variant="sm"
                rounded
                icon="work"
                >Work</BaseButton
              >
              <BaseButton type="outline-secondary" variant="sm" rounded
                >Other</BaseButton
              >
            </div>
          </div>
          <div class="px-4 pb-4">
            <BaseButton isButton type="secondary" full
              >Save address details</BaseButton
            >
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      area: state => state.location
    }),
    ...mapGetters({
      // getAddedProducts: "getAddedProducts",
    }),
    items: {
      get() {
        // return this.getAddedProducts();
      }
    }
  }
};
</script>

<style scoped lang="sass">
h6
	margin: 0
.suggestion
	padding: 1rem
	border-radius: 8px

	&:not(:last-child)::after
		content: ''
		display: none
		height: 1px
		width: 100%
		margin: 1rem 0
		background-color: #E0E0E0
</style>
