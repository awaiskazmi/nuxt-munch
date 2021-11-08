<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col">
        <h2 class="mb-3">Dropping names</h2>
        <p class="text-muted">Browse through your favourite brands!</p>
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
                    class="swiper-slide"
                    v-for="(brand, index) in brands"
                    :key="brand.id"
                  >
                    <nuxt-link :to="`/orders/brand/${brand.id}`" class="brand">
                      <div class="img-wrapper img">
                        <img
                          :src="$config.resourceUrl + brand.imageUrl"
                          :alt="brand.name"
                        />
                      </div>
                    </nuxt-link>
                  </div>
                  <div
                    class="swiper-slide align-self-center text-center d-none"
                  >
                    <BaseButton
                      url="/orders/brands/"
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
  props: ["id"],
  data() {
    return {
      brands: [],
      options: {
        slidesPerView: 8,
        slidesPerGroup: 8,
        loop: false,
        navigation: {
          nextEl: `#swiper-${this.id}-next`,
          prevEl: `#swiper-${this.id}-prev`,
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
  methods: {},
  computed: {
    ...mapState({
      serviceArea: (state) => state.serviceArea,
    }),
  },
  async fetch() {
    const res = await this.$axios.get(
      `/qa/v1/public/brands?sortProperties=sequenceNumber&userVisibility=true`
    );
    this.brands = res.data.data;
  },
  fetchOnServer: false,
};
</script>

<style lang="sass" scoped>
.brand
  display: block
  margin-right: 1rem
  color: #000

  &:hover
    text-decoration: none

  .img-wrapper
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    height: 0
    width: 100%
    padding-bottom: 100%
    background-color: #eee
    position: relative

    img
      transition: transform 0.2s cubic-bezier(1,0,0,1)
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      height: 75%
      width: 75%
      object-fit: contain
      object-position: center

  h5
    font-size: 1rem
    margin-bottom: 0
    margin-top: 1rem
    color: #000000
</style>
