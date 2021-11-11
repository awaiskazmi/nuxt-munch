<template>
  <header class="bg-white">
    <!-- floating cart button for mobile view -->
    <div
      v-if="cartShow"
      class="floating-cart d-block d-md-none"
      :class="cartCount == 0 ? 'hidden' : ''"
    >
      <BaseButton
        url="/orders/view-cart"
        rounded
        icon="shopping_cart"
        type="cart"
        >Cart . {{ cartCount }} items</BaseButton
      >
    </div>
    <div class="header container d-block d-md-flex">
      <div class="d-flex align-items-center overflow-hidden">
        <NuxtLink class="navbar-brand" to="/orders">
          <img src="~/assets/images/logo.svg" alt="" height="40"
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
      added: "getAddedProducts",
      getSearchQuery: "getglobalSearchQuery",
    }),
    routeName() {
      return this.$route.name;
    },
    cartCount() {
      let added = this.added.map((p) => p.cartQuantity);
      return added.reduce((prev, next) => prev + next, 0);
    },
    cartShow() {
      if (this.$hideFloatingCartRoutes.indexOf(this.routeName) > -1)
        return false;
      else return true;
    },
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
  mounted() {
    // if coming from landing page on mobile
    document.body.style.overflow = "unset";
    document.documentElement.style.overflow = "unset";
  },
};
</script>

<style lang="sass" scoped>
.header
  align-items: center
  justify-content: space-between
  padding: 0.5rem 1rem

  @media (max-width: 768px)
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

.floating-cart
  position: fixed
  bottom: 1.5rem
  right: 1rem
  z-index: 1051
  transition: all 0.4s ease

  &.hidden
    opacity: 0
    pointer-events: none
    transform: translateY(10px)

  a, button
    transition: all 0.4s ease
    box-shadow: 3px 7px 12px rgba(0,0,0,0.2)

    &:hover
      transform: translateY(-4px)
      box-shadow: 3px 9px 15px rgba(0,0,0,0.17)
</style>
