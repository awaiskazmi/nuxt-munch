<template>
  <BaseButton
    isButton
    full
    class="m-btn-align-left mt-2"
    icon="local_offer"
    @click="onClick"
    type="link"
    >Sign out</BaseButton
  >
</template>

<script>
export default {
  methods: {
    onClick() {
      console.log("...logging out...", event);
      localStorage.removeItem("m_token");
      localStorage.removeItem("m_user");
      this.$store.commit("setCurrentUser", {});
      window.location.replace("/");
    },
  },
};
</script>

<style></style>
