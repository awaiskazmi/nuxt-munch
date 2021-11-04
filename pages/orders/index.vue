<template>
  <div class="container py-5">
    <div class="px-3">
      <CarouselYummies />
    </div>
    <TopCategories />
    <CarouselProducts
      title="Hot Damn 🔥"
      subtitle="Browse through the hottest selling snacks!"
      id="hot-damn"
      product="hot-damn"
      landing="/trending/"
    />
    <CarouselProducts
      title="Exclusive Munchies 🤫"
      subtitle="Psst... Snacks you can only find on Munchies!"
      id="exclusive"
      product="exclusive"
      landing="/exclusive/"
    />
    <CarouselProducts
      title="New in the game 🌟"
      subtitle="Check out these newly added snacks!"
      id="new-in-the-game"
      product="new-in-the-game"
      landing="/new-in-the-game/"
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
