<template>
  <div class="container py-3 py-md-5">
    <h1>Track your orders</h1>
    <p v-if="$fetchState.pending" class="p-5 text-center">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </p>
    <div v-if="!$fetchState.pending">
      <div v-if="orders.length > 0">
        <div class="row mt-5">
          <div
            v-for="order in orders"
            :key="order.id"
            class="col-12 col-md-4 mb-3"
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
                      type="primary"
                      variant="sm"
                      :url="`/orders/tracking/${order.id}`"
                      >Track order</BaseButton
                    >
                  </div>
                </div>
              </div>
              <div class="card-body">Rs. {{ order.orderTotal }}</div>
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
  data() {
    return {
      orders: [],
    };
  },
  async fetch() {
    try {
      // get all orders
      const res = await this.$axios({
        mode: "cors",
        method: "get",
        url: `/qa/v2/api/orders/list?orderStates=IN_PROGRESS&orderStates=SCHEDULED&orderStates=CANCELED`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });

      console.log("...orders list...", res);
      this.orders = res.data.data;
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