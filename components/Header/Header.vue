<template>
  <div>
    <header class="d-block d-md-flex">
      <div class="d-flex align-items-center overflow-hidden">
        <NuxtLink class="navbar-brand" to="/">
          <img src="~/assets/images/logo.png" alt="" height="40"
        /></NuxtLink>
        <HeaderToggleLocation />
        <HeaderToggleNavbar />
      </div>
      <b-collapse visible id="collapse-1" class="">
        <client-only>
          <nav>
            <ul class="d-block d-md-flex align-items-center">
              <li>
                <NuxtLink to="/profile">{{ currentUser.user.name }}</NuxtLink>
              </li>
              <li><HeaderToggleSearch /></li>
              <li v-if="!auth">
                <BaseButton url="/signup" rounded type="link" icon="local_offer"
                  >Promos</BaseButton
                >
              </li>
              <li v-if="!auth">
                <BaseButton
                  url="/signup"
                  rounded
                  type="link"
                  icon="account_circle"
                  >Sign in</BaseButton
                >
              </li>
              <li v-if="auth">
                <HeaderNavLogout />
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
          </nav>
        </client-only>
      </b-collapse>
    </header>
    <HeaderModals>
      <HeaderModalLocation />
      <HeaderModalSearch />
      <!-- <HeaderModalProfile /> -->
    </HeaderModals>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["auth"]),
    ...mapState(["currentUser"]),
    // auth() {
    //   return this.$store.state.auth;
    // },
    // user() {
    //   return this.$store.state.currentUser.user;
    // }
  },
};
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
nav {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      margin-left: 1rem;
    }
  }
}
</style>
