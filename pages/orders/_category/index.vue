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
        <b-breadcrumb-item class="cap" active to="">{{
          category.name
        }}</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <CarouselYummies />
    <div class="row mt-5">
      <div class="col-3 d-none d-md-block">
        <nuxtjs-sticky-sidebar :topSpacing="30">
          <h6>Categories</h6>
          <div v-for="c in categories" :key="c.id">
            <NuxtLink :to="`/orders/${c.id}`">
              {{ c.name }}
            </NuxtLink>
          </div>
        </nuxtjs-sticky-sidebar>
      </div>
      <div class="col">
        <h2 class="cap">{{ category.name }}</h2>
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
      category: {},
      categoryId: this.$route.params.category,
      products: [],
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      serviceArea: (state) => state.locationObj.service_area,
    }),
  },
  async fetch() {
    // fetch products by category
    const products = await this.$axios.get(
      `/qa/v2/public/hub-product/all?hubProductCategoryIds=${this.categoryId}&descending=false&hubTypes=INTERNAL&productDiscountStatus=BOTH&serviceAreaId=${this.serviceArea}&sortProperties=products.sequenceNumber&role=ROLE_CUSTOMER&hubProductCategoryStatus=ACTIVE&statuses=IN_STOCK&statuses=OUT_OF_STOCK`
    );
    this.products = this.$syncProductsWithCart(products.data.data);
    // fetch category
    const category = await this.$axios.get(
      `/qa/v2/public/hub-product-category/${this.categoryId}`
    );
    this.category = category.data;
  },
  fetchOnServer: false,
};
</script>

<style></style>
