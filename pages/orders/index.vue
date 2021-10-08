<template>
  <div class="container py-5">
    <h1>Orders</h1>
    <div class="bg-light p-5 my-3">
      <h5>Carousel here</h5>
    </div>
    <!-- <TopCategories /> -->
    <h2>Exclusive 🌟</h2>
    <!-- <pre>{{ exclusive }}</pre> -->
    <div class="mt-4 row flex-nowrap">
      <div class="col-5 col-md-3 mb-3" v-for="p in exclusive" :key="p.id">
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
    <HotDamn title="Hot Damn" />
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
