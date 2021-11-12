<template>
  <div class="controls" :class="label ? 'controls-label' : ''">
    <!-- if quantity == 0 -->
    <button
      @click="
        updateQuantity('add');
        $emit('click');
      "
      v-if="product.cartQuantity == 0"
      class="btn-add"
    >
      <span v-if="label">{{ label }}</span>
      <span v-else class="material-icons">add</span>
    </button>
    <!-- if quantity > 0 -->
    <div v-else class="btns">
      <button @click="updateQuantity('sub')">
        <span v-if="product.cartQuantity == 1" class="material-icons"
          >delete</span
        >
        <span v-else class="material-icons">remove</span>
      </button>
      <span>{{ product.cartQuantity }}</span>
      <button @click="updateQuantity('add')">
        <span class="material-icons">add</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    product: Object,
  },
  data() {
    return {};
  },
  methods: {
    updateQuantity(operator) {
      if (operator == "add") {
        this.product.cartQuantity += 1;
      } else {
        this.product.cartQuantity -= 1;
      }
      // removed from cart
      if (this.product.cartQuantity == 0) {
        this.$store.commit("removeProductFromCart", this.product.productId);
      } else {
        this.$store.commit("setProductQuantity", { ...this.product }); // {...} SPREAD OPERATOR VERY IMPORTANT!
      }
      this.$cartLocalStorage();
    },
  },
};
</script>

<style lang="sass" scoped>
.btns
  width: 118px
  height: 32px
  border-radius: 100px
  border: 1px solid #F95050
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)
  overflow: hidden
  background-color: #F95050
  color: #fff
  display: flex
  align-items: center
  justify-content: space-between

  button
    background: none
    appearance: none
    display: inline-flex
    align-items: center
    justify-content: center
    border: none
    color: #fff
    padding: .5rem

    .material-icons
      font-size: 1em

.btn-add
  height: 32px
  width: 32px
  border-radius: 100px
  border: none
  background: none
  color: #F95050
  border: 1px solid #F95050
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)
  display: inline-flex
  align-items: center
  justify-content: center
  cursor: pointer
  transition: transform 0.2s ease

  &:hover
    background-color: #F95050
    color: #fff
    transform: rotate(90deg)

.controls-label .btn-add
  width: auto
  min-width: 118px
  padding: 0 2rem

  &:hover
    transform: none
</style>
