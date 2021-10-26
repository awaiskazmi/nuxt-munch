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
          categoryName
        }}</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <CarouselYummies />
    <div class="row mt-3 mt-md-5">
      <div class="col-12 col-md-3">
        <nuxtjs-sticky-sidebar :topSpacing="30">
          <h5 class="font-weight-bold mb-3">Categories</h5>
          <div class="sidebar-categories">
            <div v-for="c in categories" :key="c.id">
              <NuxtLink class="sidebar-category" :to="`/orders/${c.id}`">
                <div class="sidebar-category-thumb">
                  <img
                    :src="$config.resourceUrl + c.imageUrl"
                    class="img-fluid"
                  />
                </div>
                {{ c.name }}
              </NuxtLink>
            </div>
          </div>
        </nuxtjs-sticky-sidebar>
      </div>
      <div class="col mt-3 mt-md-0">
        <h2 class="cap">{{ categoryName }}</h2>
        <p v-if="$fetchState.pending" class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </p>
        <div v-if="products.length > 0" class="row">
          <div
            class="col-6 col-md-4 mb-3"
            v-for="(p, index) in products"
            :key="p.id"
          >
            <ProductItem :product="p" :animationDelay="index * 50" />
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
      categoryName: "",
      categoryId: this.$route.params.category,
      totalPages: -1,
      currentPage: 1,
      isLoadingMore: false,
      products: [],
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      serviceArea: (state) => state.locationObj.service_area,
    }),
    category() {
      return this.categories.find((p) => p.id === this.categoryId);
    },
  },
  async fetch() {
    // fetch products by category
    const products = await this.$axios.get(
      `/qa/v2/public/hub-product/all?hubProductCategoryIds=${this.categoryId}&descending=false&hubTypes=INTERNAL&productDiscountStatus=BOTH&serviceAreaId=${this.serviceArea}&sortProperties=products.sequenceNumber&role=ROLE_CUSTOMER&hubProductCategoryStatus=ACTIVE&statuses=IN_STOCK&statuses=OUT_OF_STOCK`
    );
    console.log("...PRODUCTS...", products);
    this.products = this.$syncProductsWithCart(products.data.data);
    this.totalPages = products.data.totalPages;
    // fetch category
    // const category = await this.$axios.get(
    //   `/qa/v2/public/hub-product-category/${this.categoryId}`
    // );
    // this.category = category.data;
  },
  fetchOnServer: false,
  methods: {
    async loadMoreProducts() {
      this.isLoadingMore = true;
      this.currentPage++;
      if (this.currentPage <= this.totalPages) {
        const moreProducts = await this.$axios({
          mode: "cors",
          method: "get",
          url: `/qa/v2/public/hub-product/all?hubProductCategoryIds=${this.categoryId}&descending=false&hubTypes=INTERNAL&productDiscountStatus=BOTH&serviceAreaId=${this.serviceArea}&sortProperties=products.sequenceNumber&role=ROLE_CUSTOMER&hubProductCategoryStatus=ACTIVE&statuses=IN_STOCK&statuses=OUT_OF_STOCK&pageNumber=${this.currentPage}`,
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

<style scoped>
.sidebar-category {
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 1rem;
  padding: 8px;
  overflow: hidden;
  color: #000;
  text-decoration: none;
  flex-shrink: 0;
  white-space: nowrap;
}
.sidebar-category-thumb {
  width: 40px;
  height: 40px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  margin-right: 1rem;
}
.sidebar-category:hover,
.nuxt-link-exact-active {
  background-color: #eee;
}
@media (max-width: 768px) {
  .sidebar-categories {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
  }
  .sidebar-category-thumb {
    display: none;
  }
  .sidebar-category {
    height: 32px;
    padding: 0 1rem;
    border-radius: 100px;
    border: 1px solid #315780;
    color: #315780;
    margin-right: 4px;
  }
  .nuxt-link-exact-active {
    background-color: #315780;
    color: #fff;
  }
}
</style>
