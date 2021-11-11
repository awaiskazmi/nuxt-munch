<template>
  <div class="container px-0 py-3 py-md-5">
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
            <div class="swiper-wrapper">
              <div class="swiper-slide mb-3">
                <Category
                  isDiscounts
                  :imageUrl="require('~/assets/images/logo-circle.svg')"
                  id="discounts"
                  name="Discounts"
                />
              </div>
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
        slidesPerGroup: 8,
        slidesPerView: 8,
        spaceBetween: 24,
        loop: false,
        navigation: {
          nextEl: "#swiper-categories-next",
          prevEl: "#swiper-categories-prev",
        },
        breakpoints: {
          769: {
            slidesPerView: 3.5,
            slidesPerGroup: 3.5,
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      location: (state) => state.locationObj,
      hubId: (state) => state.hubId,
    }),
  },
  // async fetch() {
  //   const res = await this.$axios.get(
  //     `/qa/v2/public/hub-product-category/all?descending=false&hubTypes=INTERNAL&role=ROLE_CUSTOMER&serviceAreaId=${this.location.service_area}&sortProperties=productCategory.sequenceNumber&status=ACTIVE`
  //   );
  //   this.categories = res.data.data;
  // },
  // fetchOnServer: false,
};
</script>

<style scoped></style>
