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
      <HeaderPromptChangeLocation />
      <HeaderPromptNoLocation />
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
    ...mapState(["user"]),
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
