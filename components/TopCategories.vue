<template>
  <div class="container py-5 d-none">
    <div class="row">
      <div class="col">
        <h2>Categories</h2>
        <div class="categories">
          <Category
            v-for="(c, index) in categories.categories"
            :key="c.id"
            :id="c.id"
            :name="c.name"
            :imageUrl="c.imageUrl"
            data-aos="flip-down"
            :data-aos-delay="index * 50"
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
  grid-template-columns: repeat(4, 1fr)

  @media(max-width: 768px)
    gap: 15px
    grid-template-columns: repeat(2, 1fr)
</style>
