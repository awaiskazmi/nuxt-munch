<template>
  <header>
    <div class="d-flex align-items-center">
      <NuxtLink class="navbar-brand" to="/">
        <img src="~/assets/images/logo.png" alt="" height="40"
      /></NuxtLink>
      <Button rounded type="location" icon="place">Add Location</Button>
      <NavToggle />
    </div>
    <div>
      <client-only>
        <nav>
          <ul class="align-items-center">
            <li>
              <NuxtLink to="/profile">{{ user.name }}</NuxtLink>
            </li>
            <li v-if="!auth">
              <Button url="/signup" rounded type="link" icon="search"
                >Search</Button
              >
            </li>
            <li v-if="!auth">
              <Button url="/signup" rounded type="link" icon="local_offer"
                >Promos</Button
              >
            </li>
            <li v-if="!auth">
              <Button url="/signup" rounded type="link" icon="account_circle"
                >Sign in</Button
              >
            </li>
            <li v-if="auth">
              <NavLogout />
            </li>
            <li>
              <Button
                url="/orders/view-cart"
                rounded
                icon="shopping_cart"
                type="cart"
                >Cart . {{ this.$store.state.cart }} items</Button
              >
            </li>
          </ul>
        </nav>
      </client-only>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    auth() {
      return this.$store.state.auth;
    },
    user() {
      return this.$store.state.currentUser.user;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
nav {
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    list-style-type: none;

    li {
      margin-left: 1rem;
    }
  }
}
</style>
