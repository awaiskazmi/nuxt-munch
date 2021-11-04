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
        <b-breadcrumb-item class="cap" active to=""
          >Exclusive</b-breadcrumb-item
        >
      </b-breadcrumb>
    </div>
    <div class="row mt-3 mt-md-5">
      <div class="col-12 mt-3 mt-md-0">
        <p v-if="$fetchState.pending" class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </p>
        <div v-if="!$fetchState.pending">
          <div class="row">
            <div class="col-12">
              <h1 class="h2 font-weight-bold mb-5">Exclusive Munchies 🤫</h1>
            </div>
          </div>
          <div v-if="products.length > 0" class="row">
            <div
              class="col-6 col-md-3 mb-3"
              v-for="(p, index) in products"
              :key="p.id"
            >
              <ProductItem :product="p" :animationDelay="index * 50" />
            </div>
          </div>
          <div v-else class="row">
            <div class="col-12 col-md-6 mx-auto text-center">
              <lottie
                :height="300"
                :options="lottieOptions"
                v-on:animCreated="handleAnimation"
              />
              <h4 class="font-weight-bold">... Well this is awkward</h4>
              <p class="text-muted">
                Browse through other categories as we restock!
              </p>
            </div>
          </div>
          <p v-show="isLoadingMore" class="mt-5 text-center">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </p>
          <div
            v-show="currentPage < totalPages && isLoadingMore == false"
            class="mt-5 text-center"
          >
            <BaseButton
              :disabled="isLoadingMore"
              type="primary"
              isButton
              @click="loadMoreProducts"
              >Load more products</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import nuxtjsStickySidebar from "nuxtjs-sticky-sidebar";
import * as animData from "~/static/lottie/out-of-stock.json";

export default {
  components: {
    "nuxtjs-sticky-sidebar": nuxtjsStickySidebar,
    lottie: lottie,
  },
  data() {
    return {
      anim: null,
      lottieOptions: {
        animationData: animData.default,
      },
      totalPages: -1,
      currentPage: 1,
      isLoadingMore: false,
      products: [],
    };
  },
  computed: {
    ...mapState({
      serviceArea: (state) => state.locationObj.service_area,
    }),
  },
  mounted() {},
  async fetch() {
    // fetch products by category
    const products = await this.$axios.get(
      `/qa/v2/public/hub-product/exclusive?serviceAreaId=${this.serviceArea}&descending=true&statuses=IN_STOCK&statuses=OUT_OF_STOCK`
    );
    this.products = this.$syncProductsWithCart(products.data.data);
    this.totalPages = products.data.totalPages;
  },
  fetchOnServer: false,
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
    async loadMoreProducts() {
      this.isLoadingMore = true;
      this.currentPage++;
      if (this.currentPage <= this.totalPages) {
        const moreProducts = await this.$axios({
          mode: "cors",
          method: "get",
          url: `/qa/v2/public/hub-product/exclusive?serviceAreaId=${this.serviceArea}&descending=true&statuses=IN_STOCK&status=OUT_OF_STOCK&pageNumber=${this.currentPage}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.isLoadingMore = false;
        this.products = this.$syncProductsWithCart([
          ...this.products,
          ...moreProducts.data.data,
        ]);
      }
    },
  },
};
</script>
