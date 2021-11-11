<template>
  <p v-if="$fetchState.pending" class="text-center">
    <b-spinner variant="primary" label="Spinning"></b-spinner>
  </p>
  <div v-else class="swiper swiper-yummies">
    <div id="swiper-yummies-prev" class="swiper-button-prev" slot="button-prev">
      <span class="material-icons">navigate_before</span>
    </div>
    <div id="swiper-yummies-next" class="swiper-button-next" slot="button-next">
      <span class="material-icons">navigate_next</span>
    </div>
    <div v-swiper:swiperYummies="options">
      <div class="swiper-wrapper align-items-center">
        <div
          v-for="p in products"
          :key="p.id"
          class="swiper-slide yummy overflow-hidden"
        >
          <!-- <ProductItem :product="p" :animationDelay="index * 50" /> -->
          <img
            :src="$config.resourceUrl + p.imageUrl"
            alt=""
            class="img-fluid"
          />
          <!-- <nuxt-link :to="p.link"></nuxt-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      options: {
        spaceBetween: 24,
        slidesPerView: 2,
        slidesPerGroup: 2,
        loop: false,
        navigation: {
          nextEl: "#swiper-yummies-next",
          prevEl: "#swiper-yummies-prev",
        },
        breakpoints: {
          769: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        },
      },
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      `/qa/v1/public/featuredProducts/?bannerType=HOME_SCREEN`
    );
    this.products = this.$syncProductsWithCart(res.data.data);
  },
  fetchOnServer: false,
};
</script>

<style lang="css" scoped>
.yummy {
  position: relative;
  border-radius: 8px;
  background-color: #f4c7c8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;
}
.yummy a {
  color: #000;
  text-decoration: underline;
  font-size: 14px;
}
.yummy a:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.yummy:hover {
  /* transform: scale(0.97); */
}
</style>
