<template>
  <header class="bg-white">
    <div class="header container d-block d-md-flex">
      <div class="d-flex align-items-center overflow-hidden">
        <NuxtLink class="navbar-brand" to="/">
          <img src="~/assets/images/logo.png" alt="" height="40"
        /></NuxtLink>
        <HeaderToggleLocation />
        <HeaderToggleNavbar @click="onNavToggle" :class="navMenu" />
      </div>
      <div class="pt-3 pb-2 d-block d-md-none">
        <BaseInput
          v-b-modal.modal-search
          prepend="search"
          placeholder="I'm craving for"
          :value="search"
        />
      </div>
      <client-only>
        <div class="nav-menu" :class="navMenu">
          <div v-if="!auth">
            <HeaderNavbarNavNotLoggedIn />
          </div>
          <div v-else>
            <HeaderNavbarNavLoggedIn />
          </div>
        </div>
      </client-only>
    </div>
    <client-only>
      <!-- modals -->
      <!-- <HeaderModalSuggestion /> -->
      <HeaderModalLocation />
      <HeaderModalSearch />
      <div v-if="auth">
        <HeaderModalProfile />
      </div>
      <!-- prompts -->
      <HeaderPromptLocation />
    </client-only>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
    ...mapState(["currentUser"]),
    ...mapGetters({
      getSearchQuery: "getglobalSearchQuery",
    }),
    search: {
      get() {
        return this.getSearchQuery;
      },
      set(query) {
        this.$store.commit("setglobalSearchQuery", query);
        return query;
      },
    },
    navMenu() {
      return this.isNavActive ? "active" : "";
    },
    // auth() {
    //   return this.$store.state.auth;
    // },
    // user() {
    //   return this.$store.state.currentUser.user;
    // }
  },
  methods: {
    onNavToggle() {
      this.isNavActive = !this.isNavActive;
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
.header
  align-items: center
  justify-content: space-between
  padding: 0.5rem 1rem

  @media (max-width: 768px)
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
</style>
