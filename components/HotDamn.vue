<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col" v-if="serviceArea >= 0">
        <h2 class="mb-4">{{ title }} 🔥</h2>
        <div class="row align-items-center">
          <div class="col">
            <div class="swiper swiper-products">
              <div class="swiper-button-prev" slot="button-prev">
                <span class="material-icons">navigate_before</span>
              </div>
              <div class="swiper-button-next" slot="button-next">
                <span class="material-icons">navigate_next</span>
              </div>
              <div v-swiper:mySwiper="options">
                <div class="swiper-wrapper align-items-center">
                  <div
                    class="swiper-slide mb-3"
                    v-for="p in products"
                    :key="p.id"
                  >
                    <ProductItem
                      :id="p.id"
                      :name="p.name"
                      :weight="p.weight"
                      :originalPrice="p.price"
                      :thumb="p.imageUrl"
                      :product="p.name.replace(/ +/g, '-').toLowerCase()"
                      :category="
                        p.category.name.replace(/ +/g, '-').toLowerCase()
                      "
                      :categoryId="p.category.id"
                      :quantity="p.quantity"
                      freeDelivery
                    />
                  </div>
                  <div class="swiper-slide text-center">
                    <BaseButton
                      url="/trending/"
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
      options: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
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
