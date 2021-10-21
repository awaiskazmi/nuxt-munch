<template>
  <nav>
    <!-- Desktop -->
    <ul class="d-none d-md-flex align-items-center">
      <li><HeaderToggleSearch /></li>
      <li>
        <BaseButton url="/orders" rounded type="link" icon="local_offer"
          >Orders</BaseButton
        >
      </li>
      <li><HeaderToggleProfile /></li>
      <!-- <li>
        <b-dropdown
          right
          id="dropdown-1"
          variant="link m-btn rounded-pill text-dark"
          :text="this.$store.state.currentUser.user.name"
        >
          <HeaderNavLogout class="btn-block justify-content-start" />
        </b-dropdown>
      </li> -->
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
    <div class="d-block d-md-none mt-4">
      <div class="d-flex align-items-center mt-4">
        <span class="icon-user material-icons"> account_circle </span>
        <div class="ml-2">
          <p class="h1 my-0">
            {{ this.$store.state.user.name }}
          </p>
          <NuxtLink class="text-secondary" to="/profile">View profile</NuxtLink>
        </div>
      </div>
      <div class="p-3 mt-3 bg-light">
        <p>Your referral code</p>
        <div
          class="
            d-flex
            align-items-center
            justify-content-between
            bg-white
            border
            p-3
            rounded
          "
        >
          <span class="d-flex align-items-center">
            <button class="btn btn-link p-0 d-flex align-items-center">
              <span class="material-icons text-secondary">content_copy</span>
            </button>
            <span class="h5 my-0 ml-1 font-weight-bold">NJK48K</span>
          </span>
          <NuxtLink to="/" class="text-secondary">Share</NuxtLink>
        </div>
      </div>
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Refer & earn</BaseButton
      >
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Orders</BaseButton
      >
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Favorites</BaseButton
      >
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Promos</BaseButton
      >
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Saved places</BaseButton
      >
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Payment</BaseButton
      >
      <BaseButton
        type="link"
        url="/login"
        class="m-btn-align-left mt-2"
        icon="local_offer"
        >Feedback</BaseButton
      >
      <HeaderNavLogout />
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
      let added = this.added.map((p) => p.quantity);
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
