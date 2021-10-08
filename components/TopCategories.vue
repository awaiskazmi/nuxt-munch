<template>
  <div class="container px-0 py-5">
    <div class="row">
      <div class="col">
        <h2 class="mb-3">Categories</h2>
        <div class="categories">
          <Category
            v-for="(c, index) in categories.categories"
            :key="c.id"
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

<style scoped>
.categories {
  display: flex;
  overflow: auto;
  padding-bottom: 2rem;
}
</style>
