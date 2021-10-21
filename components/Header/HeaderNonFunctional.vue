<template>
  <div class="container p-0">
    <header class="d-block d-md-flex">
      <div
        class="
          d-flex
          align-items-center
          justify-content-between
          overflow-hidden
        "
      >
        <NuxtLink class="navbar-brand" to="/">
          <img src="~/assets/images/logo.png" alt="" height="40"
        /></NuxtLink>
        <HeaderToggleNavbar @click="onNavToggle" :class="navMenu" />
      </div>
      <client-only>
        <div class="nav-menu" :class="navMenu">
          <div>
            <HeaderNavbarNavNonFunctional />
          </div>
        </div>
      </client-only>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isNavActive: false,
    };
  },
  watch: {
    $route(to, from) {
      this.isNavActive = false;
    },
  },
  computed: {
    ...mapState(["auth"]),
    ...mapState(["user"]),
    navMenu() {
      return this.isNavActive ? "active" : "";
    },
  },
  methods: {
    onNavToggle() {
      this.isNavActive = !this.isNavActive;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
</style>
