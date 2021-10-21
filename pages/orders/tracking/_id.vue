<template>
  <div class="container py-3 py-md-5">
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col">
            <h1>Let's track Order #{{ $route.params.id }}</h1>
          </div>
          <div class="col-auto ml-auto">
            <img src="@/assets/images/order-tracking.svg" alt="Track Order" />
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="font-weight-bold mb-4">Order Details</h5>
        <p class="m-0"><small class="text-muted">Total</small></p>
        <p class="m-0">Rs. {{ total }}</p>
        <hr />
        <p class="m-0"><small class="text-muted">Items</small></p>
        <pre>{{ products }}</pre>
        <hr />
        <p class="m-0"><small class="text-muted">Deliver to</small></p>
        <pre>{{ location }}</pre>
      </div>
    </div>
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
  computed: {
    ...mapState({
      total: (state) => state.order.total,
      products: (state) => state.products.products,
      location: (state) => state.locationObj,
    }),
  },
};
</script>

<style>
</style>