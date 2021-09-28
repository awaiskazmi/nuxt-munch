<template>
  <nav>
    <!-- Desktop -->
    <ul class="d-none d-md-flex align-items-center">
      <li>
        <!-- <NuxtLink to="/profile">{{ currentUser.user.name }}</NuxtLink> -->
      </li>
      <li>
        <BaseButton url="/about-us" rounded type="link">About</BaseButton>
      </li>
      <li><HeaderToggleSearch /></li>
      <li>
        <BaseButton url="/orders" rounded type="link" icon="local_offer"
          >Promos</BaseButton
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
          >Cart . {{ this.$store.state.cart }} items</BaseButton
        >
      </li>
    </ul>
    <!-- Mobile -->
    <div class="d-block d-md-none mt-4">
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
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Promos</BaseButton
      >
      <BaseButton class="mt-5 mb-2" type="primary"
        >Create account or sign in</BaseButton
      >
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
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
