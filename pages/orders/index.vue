<template>
  <div class="container py-5">
    <div class="px-3">
      <CarouselYummies />
    </div>
    <TopCategories />
    <CarouselProducts
      title="Hot Damn 🔥"
      id="hot-damn"
      product="hot-damn"
      landing="/trending/"
    />
    <CarouselProducts
      title="Exclusive Munchies 🤫"
      id="exclusive"
      product="exclusive"
    />
    <CarouselProducts
      title="New in the game 🌟"
      id="new-in-the-game"
      product="new-in-the-game"
    />
    <CarouselBrands id="brands" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    exclusive() {
      return this.products.filter((p) => p.tag == "EXCLUSIVE");
    },
  },
};
</script>

<style></style>
