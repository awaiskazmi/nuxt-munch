<template>
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <h2 class="font-weight-bold">Categories</h2>
        <div class="categories">
          <Category
            v-for="c in categories.categories"
            :key="c.id"
            :id="c.id"
            :name="c.name"
            :imageUrl="c.imageUrl"
          />
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
    };
  },
  methods: {},
  computed: {
    ...mapState(["categories"]),
  },
  // async fetch() {
  //   const res = await this.$axios.get("/v2/public/hub-product-category/all");
  //   this.categories = res.data.data;
  // },
};
</script>

<style lang="sass">
.categories
  display: grid
  gap: 30px
  grid-template-columns: repeat( 4, 1fr)
</style>