<template>
  <div class="container py-3 py-md-5">
    <div class="px-md-5" v-if="$fetchState.pending">
      <p class="text-center">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </p>
    </div>
    <div v-else>
      <div class="d-none d-md-block">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">
            <span class="d-flex align-items-center">
              <small class="material-icons icon-home mr-1">home</small>
              Home
            </span>
          </b-breadcrumb-item>
          <b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
          <b-breadcrumb-item
            :to="`/orders/${product.category.id}`"
            class="cap"
            >{{ product.category.name }}</b-breadcrumb-item
          >
          <b-breadcrumb-item class="cap" active>{{
            product.name
          }}</b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <div class="row no-gutters align-items-center">
        <div class="col-12 col-md">
          <div class="img-wrapper mb-3 mb-md-0">
            <img :src="src" alt="product.name" />
          </div>
        </div>
        <div class="col-12 col-md">
          <div class="px-md-5">
            <h1 class="name">{{ product.name }}</h1>
            <p class="weight">{{ product.weight }}</p>
            <p class="desc">{{ product.productDescription }}</p>
            <div class="row align-items-center justify-content-between">
              <div class="col-auto col-md-12">
                <p class="price m-0">Rs. {{ product.price }}</p>
              </div>
              <div class="col-auto col-md-12 mt-md-5">
                <ProductControls label="Add" :product="product" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-none">
        <h1>Hello, params {{ this.$route.params }}</h1>
        <pre>{{ product }}</pre>
      </div>
      <div class="row">
        <div class="col">
          <TopCategories />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  computed: {
    src() {
      return this.product.imageUrl && this.product.imageUrl.length > 0
        ? "https://munchies-qa.impact.venturedive.com/v2/public/resources/" +
            this.product.imageUrl
        : "https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif";
    },
  },
  async fetch() {
    const res = await this.$axios.get(
      `/qa/v2/public/hub-product/${this.$route.params.product}`
    );
    this.product = this.$syncProductWithCart(res.data);
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
.icon-home
  font-size: 16px

.img-wrapper
  position: relative
  height: 0
  width: 530px
  max-width: 100%
  padding-bottom: 94.5%
  border: 1px solid #dedede

  img
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 100%
    object-fit: contain

.name
  font-size: 34px
.weight
  font-size: 20px
  color: #757575
  font-weight: bold
.price
  font-weight: 700
  font-size: 34px

@media (max-width: 768px)
  .img-wrapper
    padding-bottom: 63%
  .name
    font-size: 20px
    letter-spacing: -1px
  .weight
    font-size: 14px
    font-weight: 500
  .price
    font-weight: 500
    font-size: 20px
</style>
