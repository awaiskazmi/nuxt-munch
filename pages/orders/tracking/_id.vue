<template>
  <div class="container py-3 py-md-5">
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col">
            <h1 class="m-0">Order #{{ $route.params.id }}</h1>
          </div>
          <div class="col-auto ml-auto d-none d-md-block">
            <img src="@/assets/images/order-tracking.svg" alt="Track Order" />
          </div>
        </div>
      </div>
    </div>
    <p v-if="$fetchState.pending" class="p-5 text-center">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </p>
    <div v-if="!$fetchState.pending" class="card shadow-sm">
      <div class="card-body">
        <h5 class="font-weight-bold mb-4">Order Details</h5>
        <p class="m-0"><small class="text-muted">Status</small></p>
        <p class="m-0">{{ order.status }}</p>
        <hr />
        <p class="m-0"><small class="text-muted">Total</small></p>
        <p class="m-0">Rs. {{ order.orderTotal }}</p>
        <hr />
        <p class="m-0"><small class="text-muted">Items</small></p>
        <div v-for="item in order.orderItemList" :key="item.productId">
          {{ item.productName }} x {{ item.updatedQuantity }} (Rs.
          {{ item.price }})
        </div>
        <hr />
        <p class="m-0"><small class="text-muted">Deliver to</small></p>
        <div>{{ order.contactPersonName }}</div>
        <div>{{ order.contactPersonPhone }}</div>
        <div>{{ order.address.locationName }}, {{ order.address.poi }}</div>
      </div>
    </div>
    <p class="py-3 px-1">
      <nuxt-link
        to="/orders/tracking"
        class="d-flex align-items-center text-dark text-decoration-none"
        ><span class="material-icons mr-1">arrow_back</span>
        <u>Back to orders</u></nuxt-link
      >
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware({ store, redirect }) {
    if (!store.state.auth) {
      return redirect("/");
    }
  },
  data() {
    return {
      order: {
        status: "",
        address: {
          locationName: "",
          poi: "",
        },
        contactPersonName: "",
        contactPersonPhone: "",
        orderItemList: {
          updatedQuantity: "",
          price: "",
          productName: "",
          productId: "",
          imageUrl: "",
        },
      },
    };
  },
  computed: {
    ...mapState({
      total: (state) => state.order.total,
      products: (state) => state.products.products,
      location: (state) => state.locationObj,
    }),
  },
  async fetch() {
    try {
      // get all orders
      const res = await this.$axios({
        mode: "cors",
        method: "get",
        url: `/qa/v2/api/orders/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });

      console.log("...orders detail...", res);
      this.order = res.data;
    } catch (error) {
      this.$store.dispatch("toast", {
        title: "Error",
        message: error.response.data.message,
        variant: "danger",
      });
    }
  },
};
</script>

<style>
</style>