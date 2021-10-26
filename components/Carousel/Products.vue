<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col">
        <h2 class="mb-4">{{ title }}</h2>
        <div class="row align-items-center">
          <div class="col">
            <p v-if="$fetchState.pending" class="text-center">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </p>
            <div v-else class="swiper swiper-products">
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
                  <div class="swiper-slide align-self-center text-center">
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
        <!-- <div class="products">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id", "product", "title", "landing"],
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
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
      },
    };
  },
  methods: {},
  computed: {
    ...mapState({
      serviceArea: (state) => state.serviceArea,
    }),
  },
  async fetch() {
    const res = await this.$axios.get(
      `/qa/v2/public/hub-product/${this.product}?serviceAreaId=${this.serviceArea}&descending=true&statuses=IN_STOCK&status=OUT_OF_STOCK&pageNumber=1&pageSize=20`
    );
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
