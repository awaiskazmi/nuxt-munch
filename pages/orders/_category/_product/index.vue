<template>
  <div class="container py-3 py-md-5">
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
          class="cap"
          @clicker="
            $router.push({
              name: `orders-category`,
              params: {
                id: $route.params.id,
                category: $route.params.category,
              },
            })
          "
          :to="{
            name: `orders-category`,
            params: {
              id: $route.params.id,
              category: $route.params.category,
              categoryId: $route.params.categoryId,
            },
          }"
          >{{
            this.$route.params.category.replace(/-+/g, " ")
          }}</b-breadcrumb-item
        >
        <b-breadcrumb-item class="cap" active>{{
          this.$route.params.product.replace(/-+/g, " ")
        }}</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="row no-gutters align-items-center">
      <div class="col-12 col-md">
        <div class="img-wrapper mb-3 mb-md-0">
          <img :src="src" :alt="product.name" />
        </div>
      </div>
      <div class="col-12 col-md">
        <div class="px-md-5">
          <h1 class="name">{{ product.name }}</h1>
          <!-- <h3>{{ $route.params.id }}</h3> -->
          <p class="weight">{{ product.weight }}</p>
          <p class="desc">{{ product.productDescription }}</p>
          <div class="row align-items-center justify-content-between">
            <div class="col-auto col-md-12">
              <p class="price m-0">Rs. {{ product.price }}</p>
            </div>
            <div class="col-auto col-md-12 mt-md-5">
              <button
                v-if="quantity == 0"
                @click="updateCart('add')"
                class="btn rounded-pill btn-outline-primary px-5"
              >
                Add
              </button>
              <div class="d-flex align-items-center" v-else>
                <button
                  class="btn btn-outline-primary btn-icon"
                  @click="updateCart('sub')"
                >
                  -
                </button>
                <span class="h4 my-0 mx-3">{{ quantity }}</span>
                <button
                  class="btn btn-outline-primary btn-icon"
                  @click="updateCart('add')"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
    </div>
    <div class="row">
      <div class="col">
        <TopCategories />
      </div>
    </div>
    <div class="d-none">
      <h1>Hello, product {{ this.$route.params.product }}</h1>
      <h1>Hello, category {{ this.$route.params.category }}</h1>
      <pre>{{ product }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      // product: {},
      // imgSrc: "",
      // quantity: 0,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      getQuantity: "getProductQuantityById",
    }),
    id() {
      return this.$route.params.id;
    },
    product() {
      return this.products.find((e) => e.id === this.id);
    },
    quantity: {
      get() {
        return this.getQuantity(this.id);
      },
      set(qty) {
        let payload = {
          id: this.id,
          quantity: qty,
        };
        this.$store.commit("setProductQuantity", payload);
        return qty;
      },
    },
    src() {
      return (
        "https://munchies-qa.impact.venturedive.com/v2/public/resources/" +
        this.product.imageUrl
      );
      // return this.imgSrc.length > 0
      //   ? "https://munchies-qa.impact.venturedive.com/v2/public/resources/" +
      //       this.imgSrc
      //   : "https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif";
    },
  },
  // async fetch() {
  //   let res = await this.$axios.get(
  //     `/qa/v2/public/hub-product/${this.$route.params.id}`
  //   );
  //   let { data: product } = res; // reads: get data as product (alias)
  //   this.product = product;
  //   this.imgSrc = product.imageUrl;
  // },
  methods: {
    updateCart(operator) {
      operator == "add" ? (this.quantity += 1) : (this.quantity -= 1);
      let payload = {
        id: this.id,
        quantity: this.quantity,
      };
      this.$store.dispatch("setProductQuantityAction", payload);
      return;
      // removed from cart
      // if (this.quantity == 0) {
      //   this.$store.commit("removeProductFromCart", this.$route.params.id);
      // } else {
      //   let payload = { ...this.product, quantity: this.quantity };
      //   this.$store.commit("addProductToCart", payload);
      // }
    },
  },
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
