<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col" v-if="serviceArea >= 0">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="d-inline-block mb-3">{{ title }} 🔥</h2>
          <span
            class="material-icons"
            v-b-tooltip.hover.left="'Hold Shift and scroll to scroll sideways!'"
            >info</span
          >
        </div>
        <div class="products">
          <div class="mt-4 row flex-nowrap">
            <div class="col-5 col-md-3 mb-3" v-for="p in products" :key="p.id">
              <ProductItem
                :id="p.id"
                :name="p.name"
                :weight="p.weight"
                :originalPrice="p.price"
                :thumb="p.imageUrl"
                :product="p.name.replace(/ +/g, '-').toLowerCase()"
                :category="p.category.name.replace(/ +/g, '-').toLowerCase()"
                :quantity="p.quantity"
                freeDelivery
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col" v-else>
        <p>Please select a location first.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["title"],
  data() {
    return {
      // products: [],
    };
  },
  methods: {},
  computed: {
    ...mapState({
      // products: (state) => state.products.products.filter((e) => e.tag == ""),
      products: (state) => state.products.products,
    }),
    serviceArea() {
      return this.$store.state.serviceArea;
    },
  },
  // async fetch() {
  //   const res = await this.$axios.get(
  //     `/qa/v2/public/hub-product/hot-damn?serviceAreaId=${this.serviceArea}&statuses=IN_STOCK`
  //   );
  //   this.products = res.data.data;
  // },
};
</script>

<style scoped>
.products {
  padding-bottom: 2rem;
  overflow: auto;
}
</style>
