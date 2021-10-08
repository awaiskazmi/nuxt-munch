<template>
  <b-modal id="modal-search" size="xxl">
    <!-- Header -->
    <template #modal-header="{ close }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-auto d-none d-md-flex">
            <img
              @click="close"
              src="~/assets/images/logo.png"
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
            <pre>{{ serviceArea }}</pre>
            <BaseInput
              prepend="search"
              variant="lg"
              placeholder="I'm craving for"
              v-model="search"
              @keyup="onkeyup"
            />
          </div>
        </div>
        <!-- SEARCH RESULTS -->
        <div class="row mt-5" v-if="products.length > 0">
          <div class="col-12">
            <h4 class="font-weight-bold">Search Results</h4>
            <div class="mt-4 row">
              <div
                class="col-6 col-md-3 mb-3"
                v-for="p in products"
                :key="p.id"
              >
                <ProductItem
                  :name="p.name"
                  :weight="p.weight"
                  :originalPrice="p.price"
                  :thumb="p.imageUrl"
                  freeDelivery
                />
              </div>
            </div>
          </div>
        </div>
        <!-- IF NO SERACH RESULTS -->
        <div v-else>
          <div class="row mt-5">
            <div class="col">
              <p class="h5" v-if="searchResults">No results found</p>
            </div>
          </div>
          <!-- RECENT SEARCHES -->
          <div class="row mt-5">
            <div class="col-12">
              <h4 class="font-weight-bold">Recent Searches</h4>
              <div class="mt-4 d-flex flex-wrap">
                <ProductRecent label="cornetto classic" />
                <ProductRecent label="feast" />
                <ProductRecent label="lays masala" />
              </div>
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
        class="fab"
        >Suggest Products</BaseButton
      >
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      timer: 0,
      products: [],
    };
  },
  computed: {
    serviceArea() {
      return this.$store.state.serviceArea;
    },
    ...mapGetters({
      getSearchQuery: "getglobalSearchQuery",
    }),
    searchResults() {
      return this.search.length == 0 ? false : true;
    },
    search: {
      get() {
        return this.getSearchQuery;
      },
      set(query) {
        this.$store.commit("setglobalSearchQuery", query);
        return query;
      },
    },
  },
  mounted() {},
  methods: {
    onkeyup() {
      if (this.search.length < 3) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getSearchResults(this.search);
      }, 100);
    },
    async getSearchResults(query) {
      let res = await this.$axios.get(
        `/qa/v2/public/hub-product/all?hubTypes=INTERNAL&keyword=${this.search}&role=ROLE_CUSTOMER&serviceAreaId=${this.serviceArea}&statuses=IN_STOCK&statuses=OUT_OF_STOCK`
      );
      this.products = res.data.data;
    },
  },
};
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 8px;
  right: 8px;
}
</style>
