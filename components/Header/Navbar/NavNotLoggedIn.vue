<template>
  <nav class="d-flex flex-grow-1">
    <!-- Desktop -->
    <ul class="d-none d-md-flex align-items-center">
      <li>
        <!-- <NuxtLink to="/profile">{{ currentUser.user.name }}</NuxtLink> -->
      </li>
      <li><HeaderToggleSearch /></li>
      <li>
        <BaseButton url="/orders" rounded type="link" icon="local_offer"
          >Orders</BaseButton
        >
      </li>
      <li>
        <BaseButton url="/login" rounded type="link" icon="account_circle"
          >Sign in</BaseButton
        >
      </li>
      <li>
        <BaseButton
          url="/orders/view-cart"
          rounded
          icon="shopping_cart"
          type="cart"
          >Cart . {{ cartCount }} items</BaseButton
        >
      </li>
    </ul>
    <!-- Mobile -->
    <div
      class="
        d-flex
        flex-column
        justify-content-between
        d-md-none
        mt-4
        flex-grow-1
      "
    >
      <div>
        <div class="d-flex align-items-center mt-4">
          <span class="icon-user material-icons"> account_circle </span>
          <p class="h1 my-0 ml-2">Hello, Muncher!</p>
        </div>
        <div class="d-flex align-items-center p-3 mt-3 bg-light rounded">
          <img src="~/assets/images/logo-circle.svg" alt="Promos" height="32" />
          <div class="ml-3">
            <p class="h6 font-weight-bold m-0">Rs. 150 off your first order.</p>
            <p class="p m-0">Sign up and order now!</p>
          </div>
        </div>
        <BaseButton
          type="link"
          url="/login"
          class="m-btn-align-left mt-2 d-none"
          icon="local_offer"
          >Promos</BaseButton
        >
      </div>
      <BaseButton url="/signup" full class="mb-2" type="primary"
        >Create account or sign in</BaseButton
      >
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      added: "getAddedProducts",
    }),
    cartCount() {
      let added = this.added.map((p) => p.cartQuantity);
      return added.reduce((prev, next) => prev + next, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-user {
  font-size: 40px;
}
.h1 {
  font-size: 28px;
  font-weight: 500;
}
nav {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      margin-left: 1rem;

      @media (max-width: 768px) {
        margin-left: 0;
      }
    }
  }
}
</style>
