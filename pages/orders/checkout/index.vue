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
    <div class="row align-items-center mt-5">
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
            <BaseButton type="link" variant="sm">View details</BaseButton>
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
            <BaseButton type="link" variant="sm">View details</BaseButton>
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
      </div>
      <div class="col-12 col-md-6">
        <div class="bg-light p-5">Google map here</div>
      </div>
    </div>
    <!-- Address sidebar -->
    <b-sidebar id="sidebar-address" title="Sidebar" right shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
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
      area: (state) => state.location,
    }),
    ...mapGetters({
      // getAddedProducts: "getAddedProducts",
    }),
    items: {
      get() {
        // return this.getAddedProducts();
      },
    },
  },
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
