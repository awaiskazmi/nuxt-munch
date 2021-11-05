<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col">
        <p v-if="$fetchState.pending" class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </p>
        <div v-if="products.length > 0" class="row align-items-center">
          <div class="col-12">
            <h2 class="mb-4">{{ title }}</h2>
            <p>Oomph up your cart with complementary snacks!</p>
          </div>
          <div class="col">
            <div>
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
                      :key="p.id"
                    >
                      <ProductItem :product="p" :animationDelay="index * 50" />
                    </div>
                    <div
                      v-if="landing"
                      class="swiper-slide align-self-center text-center"
                    >
                      <BaseButton
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
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id", "product", "title", "productId"],
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
  methods: {},
  computed: {
    ...mapState({
      serviceArea: (state) => state.serviceArea,
      hubId: (state) => state.hubId,
    }),
  },
  async fetch() {
    const res = await this.$axios({
      mode: "cors",
      method: "post",
      url: `/munchies/productRecommendation`,
      headers: {
        // device_id: this.$mRandomString(50),
      },
      data: {
        prod_id: this.productId,
        hub_id: this.hubId,
      },
    });
    console.log("=== RECOMMENDATIONS ===", res);
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
