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
      <div class="col-3 d-none d-md-block">
        <nuxtjs-sticky-sidebar :topSpacing="30">
          <h6>Categories</h6>
          <div v-for="c in categories" :key="c.id">
            <NuxtLink
              :to="{
                name: `orders-category`,
                params: {
                  category: c.name,
                  categoryId: c.id,
                },
              }"
            >
              {{ c.name }}
            </NuxtLink>
          </div>
        </nuxtjs-sticky-sidebar>
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
import { mapState } from "vuex";
import nuxtjsStickySidebar from "nuxtjs-sticky-sidebar";

export default {
  components: {
    "nuxtjs-sticky-sidebar": nuxtjsStickySidebar,
  },
  data() {
    return {
      category: this.$route.params.category,
      categoryId: this.$route.params.categoryId,
      products: [],
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },
  async fetch() {
    const res = await this.$axios.get(
      `https://munchies-qa.impact.venturedive.com/v2/public/hub-product/all?hubProductCategoryIds=${this.categoryId}`
    );
    this.products = this.$syncProductsWithCart(res.data.data);
  },
};
</script>

<style></style>
