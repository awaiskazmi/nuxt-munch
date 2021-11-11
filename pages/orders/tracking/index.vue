<template>
  <div class="container py-3 py-md-5">
    <h1>Track your orders</h1>
    <p v-if="$fetchState.pending" class="p-5 text-center">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </p>
    <div v-else>
      <div v-if="orders.length > 0">
        <div class="row mt-5">
          <div
            v-for="order in orders"
            :key="order.id"
            class="col-12 col-md-4 mb-3 mb-md-4"
          >
            <div class="card shadow-sm">
              <!-- <pre>{{ order }}</pre> -->
              <div class="card-header bg-white">
                <div class="row align-items-center">
                  <div class="col">
                    <h5 class="m-0">Order #{{ order.referenceId }}</h5>
                  </div>
                  <div class="col-auto ml-auto">
                    <BaseButton
                      type="light"
                      variant="sm"
                      :url="`/orders/tracking/${order.id}`"
                      >View details</BaseButton
                    >
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <p class="h5 m-0">Rs. {{ order.orderTotal }}</p>
                  <small class="badge" :class="`badge-${order.statusClass}`">{{
                    order.status
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12 col-md-4 mx-auto">
            <p class="pt-5 text-center">No upcoming orders.</p>
            <BaseButton url="/orders" type="primary" full
              >Place an order</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.state.auth) {
      return redirect("/");
    }
  },
  data() {
    return {
      orders: [],
    };
  },
  async fetch() {
    try {
      // get all orders
      // orderStates=IN_PROGRESS&orderStates=SCHEDULED&orderStates=CANCELED&orderStatus=ADMIN_CANCELLED_ORDER&
      const res = await this.$axios({
        mode: "cors",
        method: "get",
        url: `/qa/v2/api/orders/list?descending=true&orderStates=COMPLETED&orderStates=IN_PROGRESS&orderStates=SCHEDULED&orderStates=CANCELED&orderStates=DISPUTED`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });

      console.log(res.data.data);
      let orders = res.data.data;

      orders = res.data.data.map((order) => ({
        ...order,
        status: this.$orderStatusTypes[order.status].label,
        statusClass: this.$orderStatusTypes[order.status].class,
      }));

      this.orders = orders;
    } catch (error) {
      this.$store.dispatch("toast", {
        title: "Error",
        message: error.response.data.message,
        variant: "danger",
      });
    }
  },
  methods: {
    orderStatus(status) {
      console.log(status);
      return;
      return this.$orderStatusTypes[status];
    },
  },
};
</script>

<style>
</style>