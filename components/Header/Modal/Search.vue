<template>
  <b-modal id="modal-search" size="xxl">
    <!-- Header -->
    <template #modal-header="{ close }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-auto d-none d-md-flex">
            <img
              @click="close"
              src="~/assets/images/logo.svg"
              alt="Munchies"
              height="40"
              class="cursor-pointer"
            />
          </div>
          <div class="col-auto ml-auto">
            <BaseButton isButton type="m-btn-action" @click="close">
              <span class="material-icons">close</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
    <!-- Body -->
    <template #default>
      <div class="container mt-5">
        <div class="row">
          <div class="col">
            <p class="h1 font-weight-bold mb-3">Search</p>
            <div v-if="serviceArea == null">
              <p class="p-5 text-center">Please select a location first.</p>
            </div>
            <div v-else>
              <BaseInput
                class="search-modal-input"
                prepend="search"
                variant="lg"
                placeholder="I'm craving for"
                v-model="search"
                @keyup="onkeyup"
              />
              <div class="categories d-flex flex-wrap mt-3">
                <BaseRadio
                  v-for="c in uCategories"
                  :key="c.id"
                  :data-category="c.id"
                  :id="c.id"
                  :label="c.name"
                  :value="c.id"
                  v-model="filterId"
                  name="filterId"
                  @change="filterProducts(c.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- SEARCH RESULTS -->
        <p v-if="searching" class="text-center py-5">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </p>
        <div class="row mt-5" v-if="products.length > 0" :key="productsKey">
          <div class="col-12">
            <h4 class="font-weight-bold">Search Results</h4>
            <div class="mt-4 row">
              <div
                class="col-6 col-md-3 mb-3"
                v-for="p in filteredProducts"
                :key="p.id"
              >
                <ProductItem :product="p" />
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
        <!-- IF NO SERACH RESULTS -->
        <div
          v-else-if="
            search.length >= 3 && searching == false && products.length == 0
          "
        >
          <div class="row mt-5">
            <div class="col">
              <p class="h5">No results found</p>
            </div>
          </div>
        </div>
        <!-- RECENT SEARCHES -->
        <div class="row mt-5" v-if="recent.length > 0">
          <div class="col-12">
            <h4 class="font-weight-bold">Recent Searches</h4>
            <div class="mt-4 d-flex flex-wrap">
              <ProductRecent
                @click="recentSearch(r)"
                v-for="r in recent"
                :key="r"
                :label="r"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- Footer -->
    <template #modal-footer="{ close }">
      <BaseButton
        v-b-toggle.sidebar-suggestion
        isButton
        rounded
        type="warning shadow"
        icon="add"
        @click="close"
        class="fab d-none"
        >Suggest Products</BaseButton
      >
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      timer: 0,
      products: [],
      categories: [],
      filterId: null,
      searching: false,
      totalPages: -1,
      currentPage: 1,
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState({
      serviceArea: (state) => state.locationObj.service_area,
      recent: (state) => state.recentSearches,
      productsKey: (state) => state.products.productsKey,
      hubId: (state) => state.hubId,
    }),
    ...mapGetters({
      getSearchQuery: "getglobalSearchQuery",
    }),
    filteredProducts() {
      if (this.filterId == null) {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.category.id == this.filterId
        );
      }
    },
    uCategories() {
      return [
        ...new Map(this.categories.map((item) => [item["id"], item])).values(),
      ];
    },
    search: {
      get() {
        return this.getSearchQuery;
      },
      set(query) {
        this.$store.commit("setglobalSearchQuery", query.trim());
        return query.trim();
      },
    },
  },
  watch: {
    $route(to, from) {
      this.$bvModal.hide("modal-search");
    },
    productsKey(oldVal, newVal) {
      this.products = this.$syncProductsWithCart(this.products);
    },
  },
  methods: {
    ...mapActions(["setRecentSearches"]),
    filterProducts(id) {
      this.filterId = id;
    },
    recentSearch(query) {
      this.search = query;
      this.searching = true;
      this.getSearchResults(this.search);
    },
    onkeyup() {
      if (this.search.length < 3) {
        this.products = [];
        this.categories = [];
        this.filterId = null;
        clearTimeout(this.timer);
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.searching = true;
        this.getSearchResults(this.search);
      }, 1000);
    },
    async getSearchResults(query) {
      this.filterId = null;
      let res = await this.$axios.get(
        `/qa/v2/public/hub-product/all?descending=false&keyword=${this.search}&hubTypes=INTERNAL&productDiscountStatus=BOTH&role=ROLE_CUSTOMER&serviceAreaId=${this.serviceArea}&hubIds=${this.hubId}&sortProperties=products.sequenceNumber&hunProductCategoryStatus=ACTIVE&statuses=IN_STOCK&statuses=OUT_OF_STOCK`
      );
      this.categories = res.data.data.map((p) => ({
        id: p.category.id,
        name: p.category.name,
      }));
      this.products = this.$syncProductsWithCart(res.data.data);
      this.totalPages = res.data.totalPages;
      this.$store.dispatch("setRecentSearches", this.search);
      this.searching = false;
    },
    async loadMoreProducts() {
      this.isLoadingMore = true;
      this.currentPage++;
      if (this.currentPage <= this.totalPages) {
        const moreProducts = await this.$axios({
          mode: "cors",
          method: "get",
          url: `/qa/v2/public/hub-product/all?descending=false&keyword=${this.search}&hubTypes=INTERNAL&productDiscountStatus=BOTH&role=ROLE_CUSTOMER&serviceAreaId=${this.serviceArea}&hubIds=${this.hubId}&sortProperties=products.sequenceNumber&hunProductCategoryStatus=ACTIVE&statuses=IN_STOCK&statuses=OUT_OF_STOCK&pageNumber=${this.currentPage}`,
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

<style lang="sass" scoped>
.fab
  position: fixed
  bottom: 8px
  right: 8px

.category
  margin-right: 8px
  padding-left: 16px
  padding-right: 16px
</style>
