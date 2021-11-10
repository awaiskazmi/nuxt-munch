<template>
  <p v-if="$fetchState.pending" class="py-5 text-center">
    <b-spinner variant="primary" label="Spinning"></b-spinner>
  </p>
  <div
    v-else-if="products.length > 0"
    class="container px-0 py-3 py-md-5"
    :key="productsKey"
  >
    <div class="row">
      <div class="col">
        <h2 class="mb-3">Awmnomnom again 🤤</h2>
        <p v-if="subtitle" class="text-muted">
          Order your favourite snacks again!
        </p>
        <div class="row align-items-center">
          <div class="col">
            <div class="swiper swiper-products">
              <div
                :id="`swiper-${id}-prev`"
                class="swiper-button-prev"
                slot="button-prev"
              >
                <span class="material-icons">navigate_before</span>
              </div>
              <div
                :id="`swiper-${id}-next`"
                class="swiper-button-next"
                slot="button-next"
              >
                <span class="material-icons">navigate_next</span>
              </div>
              <div v-swiper:swiperHotDamn="options">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide mb-3"
                    v-for="(p, index) in products"
                    :key="p.productId"
                  >
                    <ProductItem :product="p" :animationDelay="index * 50" />
                  </div>
                  <div
                    v-if="landing"
                    class="swiper-slide align-self-center text-center"
                  >
                    <BaseButton
                      v-if="products.length > 0"
                      :url="landing"
                      icon="navigate_next"
                      type="secondary"
                      rounded
                      >See All</BaseButton
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id", "product", "title", "subtitle", "landing"],
  data() {
    return {
      products: [],
      options: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        loop: false,
        navigation: {
          nextEl: `#swiper-${this.id}-next`,
          prevEl: `#swiper-${this.id}-prev`,
        },
        breakpoints: {
          769: {
            slidesPerView: 2.5,
            slidesPerGroup: 2.5,
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      serviceArea: (state) => state.serviceArea,
      productsKey: (state) => state.products.productsKey,
    }),
  },
  methods: {},
  watch: {
    productsKey(oldVal, newVal) {
      this.products = this.$syncProductsWithCart(this.products);
    },
  },
  async fetch() {
    const res = await this.$axios({
      mode: "cors",
      method: "get",
      url: `/qa/v2/api/hub-product/previous-order-items?serviceAreaId=${this.serviceArea}`,
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      },
    });

    // let orderList = res.data.data,
    //   orderItemLists,
    //   orderItems;
    // // 1. map and only get orderItemList from each order
    // orderItemLists = orderList.map((p) => p.orderItemList);
    // // 2. map and only get products in each order list
    // orderItems = orderItemLists.map((e) => ({
    //   ...e[0],
    //   id: e[0].hubProductId,
    //   category: {
    //     id: e[0].hubProductCategory.id,
    //   },
    //   status: "IN_STOCK",
    // }));
    // orderItems = this.$getUniqueObjects(orderItems);
    // this.products = this.$syncProductsWithCart(orderItems);
    this.products = this.$syncProductsWithCart(res.data.data);
  },
  fetchOnServer: false,
};
</script>

<style scoped>
.products {
  padding-bottom: 2rem;
  overflow: auto;
}
</style>
