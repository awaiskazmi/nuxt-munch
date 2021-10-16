<template>
  <!-- path: `/orders/${category}/${name}`, -->
  <!-- @click="
      $router.push({
        name: `orders-category-product`,
        params: { id: id, product: product, category: category },
      })
    " -->
  <NuxtLink
    :to="{
      name: `orders-category-product`,
      params: {
        id: id,
        product: product,
        category: category,
        categoryId: categoryId,
      },
    }"
    class="product pointer"
  >
    <div class="product-wrapper">
      <span v-if="off" class="off">{{ off }} off</span>
      <span v-if="freeDelivery" class="free-delivery">Free Delivery</span>
      <div class="qty">
        {{ quantity }}
      </div>
      <img class="thumb" :src="productImage" />
    </div>
    <div class="price" v-if="salePrice">
      <span class="sale">Rs. {{ salePrice }}</span>
      <span
        ><s>Rs. {{ originalPrice }}</s></span
      >
    </div>
    <div class="price" v-else>
      <span class="sale">Rs. {{ originalPrice }}</span>
    </div>
    <p class="m-0 name">{{ name }}</p>
    <p class="m-0 weight">{{ weight }}</p>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: Number,
    off: String,
    name: String,
    thumb: String,
    weight: String,
    product: String,
    quantity: Number,
    category: String,
    categoryId: Number,
    salePrice: String,
    originalPrice: Number,
    freeDelivery: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    productImage() {
      return this.thumb
        ? "https://munchies-qa.impact.venturedive.com/v2/public/resources/" +
            this.thumb
        : "https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif";
    },
  },
};
</script>

<style lang="sass" scoped>
.product
  color: #000
  text-decoration: none
.product-wrapper
  position: relative
  height: 0
  padding-bottom: 75%

.off, .free-delivery, .controls, .thumb
  position: absolute

.off, .free-delivery
  height: 18px
  background-color: #FDD835
  color: #000
  font-weight: 700
  font-size: 12px
  padding: 0 8px
  z-index: 1

.off
  border-radius: 4px 9px 9px 0
  top: 0
  left: 0

.free-delivery
  border-radius: 0 9px 9px 4px
  bottom: 0
  left: 0

.thumb
  top: 0
  left: 0
  height: 100%
  width: 100%
  object-fit: contain
  object-position: center

.price
  margin-top: 28px

  .sale
    font-size: 20px
    font-weight: 700
  .original
    font-size: 1rem
    font-weight: 600
    color: #F95050

.name
  font-weight: 600

.weight
  color: #7F7F7F

.qty
  position: absolute
  top: 0
  right: 0
  padding: .25rem .75rem
  border: 1px solid #ddd
  border-radius: 8px
  z-index: 2
</style>
