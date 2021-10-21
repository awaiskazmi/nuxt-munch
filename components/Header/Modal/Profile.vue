<template>
  <b-sidebar
    width="460px"
    id="sidebar-profile"
    bg-variant="white"
    right
    no-header
    backdrop
    shadow
  >
    <template #default="{ hide }">
      <div class="py-6 px-4">
        <BaseButton isButton type="m-btn-action m-sidebar-close" @click="hide">
          <span class="material-icons">close</span>
        </BaseButton>
        <div class="mt-4">
          <div class="d-flex align-items-center mt-4">
            <span class="icon-user material-icons"> account_circle </span>
            <div class="ml-2">
              <p class="h1 my-0">
                {{ username }}
              </p>
              <NuxtLink class="text-secondary d-none" to="/profile"
                >View profile</NuxtLink
              >
            </div>
          </div>
          <div class="p-3 mt-3 bg-light d-none">
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
                <button
                  class="
                    btn btn-link
                    text-secondary
                    p-0
                    d-flex
                    align-items-center
                  "
                >
                  <span class="material-icons">content_copy</span>
                </button>
                <span class="h5 my-0 ml-1 font-weight-bold">NJK48K</span>
              </span>
              <NuxtLink to="/" class="text-secondary">Share</NuxtLink>
            </div>
          </div>
          <div class="d-none">
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Refer & earn</BaseButton
            >
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Orders</BaseButton
            >
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Favorites</BaseButton
            >
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Promos</BaseButton
            >
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Saved places</BaseButton
            >
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Payment</BaseButton
            >
            <BaseButton
              full
              type="link"
              url="/login"
              class="m-btn-align-left mt-2"
              icon="local_offer"
              >Feedback</BaseButton
            >
          </div>
          <BaseButton
            full
            type="link"
            url="/orders/tracking"
            class="m-btn-align-left mt-2"
            icon="local_offer"
            >My Orders</BaseButton
          >
          <BaseButton
            v-if="!user.phoneVerified"
            full
            type="link"
            url="/signup/verify?ref=verify"
            class="m-btn-align-left mt-2"
            icon="phone"
            >Verify Phone</BaseButton
          >
          <HeaderNavLogout />
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    username() {
      return this.$store.state.user.name;
    },
  },
};
</script>

<style scoped>
.h1 {
  font-size: 34px;
}
.icon-user {
  font-size: 70px;
}
</style>
