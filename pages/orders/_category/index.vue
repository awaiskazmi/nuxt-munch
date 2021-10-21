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
        <!-- <b-breadcrumb-item to="/categories">Categories</b-breadcrumb-item> -->
        <b-breadcrumb-item
          class="cap"
          active
          :to="`/orders/${this.$route.params.category}`"
          >{{ category }}</b-breadcrumb-item
        >
      </b-breadcrumb>
    </div>
    <CarouselYummies />
    <div class="row mt-5">
      <div class="col-3 d-none d-md-block">
        <nuxtjs-sticky-sidebar :topSpacing="30">
          <h6>Categories</h6>
          {{ category }}
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
        <!-- <h2 class="cap">{{ category.name }}</h2> -->
        <p v-if="$fetchState.pending" class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </p>
        <div class="row">
          <div
            class="col-6 col-md-4 mb-3"
            v-for="(p, index) in products"
            :key="p.id"
          >
            <ProductItem :product="p" :animationDelay="index * 50" />
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
      categoryId: this.$route.params.category,
      products: [],
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
    category() {
      return this.categories.find((c) => {
        console.log(c.id == this.categoryId);
      });
    },
  },
  async fetch() {
    const products = await this.$axios.get(
      `/qa/v2/public/hub-product/all?productCategoryIds=${this.categoryId}`
    );
    this.products = this.$syncProductsWithCart(products.data.data);
  },
  fetchOnServer: false,
};
</script>

<style></style>
