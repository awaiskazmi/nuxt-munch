<template>
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <h1 class="display-4">{{ category.name }}</h1>
        <nuxt-link to="/orders" class="d-inline-block mt-6"
          >Back to Orders</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {},
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      `/qa/v2/public/hub-product-category/${this.$route.params.id}`
    );
    this.category = res.data;
  },
};
</script>

<style>
</style>