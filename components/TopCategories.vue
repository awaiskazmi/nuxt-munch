<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col">
        <h2 class="mb-3">Categories</h2>
        <!-- <p v-if="$fetchState.pending" class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </p> -->
        <div class="swiper swiper-categories">
          <div
            id="swiper-categories-prev"
            class="swiper-button-prev"
            slot="button-prev"
          >
            <span class="material-icons">navigate_before</span>
          </div>
          <div
            id="swiper-categories-next"
            class="swiper-button-next"
            slot="button-next"
          >
            <span class="material-icons">navigate_next</span>
          </div>
          <div v-swiper:swiperCategories="options">
            <div class="swiper-wrapper align-items-center">
              <div
                class="swiper-slide mb-3"
                v-for="(c, index) in categories"
                :key="c.id"
              >
                <Category
                  :id="c.id"
                  :name="c.name"
                  :imageUrl="c.imageUrl"
                  data-aos="flip-downs"
                  :data-aos-delays="index * 10"
                />
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
  data() {
    return {
      // categories: [],
      options: {
        // slidesPerView: "auto",
        slidesPerView: 8,
        spaceBetween: 24,
        loop: false,
        navigation: {
          nextEl: "#swiper-categories-next",
          prevEl: "#swiper-categories-prev",
        },
        breakpoints: {
          769: {
            // slidesPerView: 'auto',
            // slidesPerGroup: 2,
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },
  // async fetch() {
  //   const res = await this.$axios.get("/qa/v2/public/hub-product-category/all");
  //   this.categories = res.data.data;
  // },
};
</script>

<style scoped></style>
