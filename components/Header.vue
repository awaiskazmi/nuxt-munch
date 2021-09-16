<template>
  <header>
    <NuxtLink class="navbar-brand" to="/">
      <img src="~/assets/images/logo.png" alt=""
    /></NuxtLink>
    <client-only>
      <nav>
        <ul class="align-items-center">
          <li>
            <NuxtLink to="/profile">{{ user.name }}</NuxtLink>
          </li>
          <li v-if="!auth">
            <NuxtLink class="btn btn-outline-primary" to="/login"
              >Sign in</NuxtLink
            >
          </li>
          <li v-if="!auth">
            <NuxtLink class="btn btn-primary" to="/signup">Sign up</NuxtLink>
          </li>
          <li v-if="auth">
            <NavLogout />
          </li>
        </ul>
      </nav>
    </client-only>
  </header>
</template>

<script>
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
