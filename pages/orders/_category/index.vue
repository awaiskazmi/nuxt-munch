<template>
  <div class="container py-3 py-md-5">
    <div class="d-none d-md-block">
      <b-breadcrumb>
        <b-breadcrumb-item to="/">
          <span class="d-flex align-items-center">
            <small class="material-icons icon-home mr-1">home</small>
            Home
          </span>
        </b-breadcrumb-item>
        <b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
        <b-breadcrumb-item to="/categories">Categories</b-breadcrumb-item>
        <b-breadcrumb-item
          class="cap"
          active
          :to="{
            name: `orders-category`,
            params: {
              id: $route.params.id,
              category: $route.params.category,
            },
          }"
          >{{
            this.$route.params.category.replace(/-+/g, " ")
          }}</b-breadcrumb-item
        >
      </b-breadcrumb>
    </div>
    <CarouselYummies />
    <div class="row mt-5">
      <div class="col-3 d-none d-md-flex">
        <h6>Categories</h6>
      </div>
      <div class="col">
        <h2 class="cap">{{ category }}</h2>
        <div class="row">
          <div class="col-6 col-md-4 mb-3" v-for="p in products" :key="p.id">
            <ProductItem
              :id="p.id"
              :name="p.name"
              :weight="p.weight"
              :originalPrice="p.price"
              :thumb="p.imageUrl"
              :product="p.name.replace(/ +/g, '-').toLowerCase()"
              :category="p.category.name.replace(/ +/g, '-').toLowerCase()"
              :categoryId="p.category.id"
              :quantity="p.quantity"
              freeDelivery
            />
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
      category: this.$route.params.category,
      categoryId: this.$route.params.categoryId,
      products: [],
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      `https://munchies-qa.impact.venturedive.com/v2/public/hub-product/all?hubProductCategoryIds=${this.categoryId}`
    );
    this.products = res.data.data;
    console.log(res.data.data);
  },
};
</script>

<style></style>
