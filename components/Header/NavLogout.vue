<template>
  <BaseButton
    isButton
    full
    class="m-btn-align-left mt-2"
    icon="exit_to_app"
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
      this.$store.commit("setUserObject", {});
      window.location.replace("/orders");
    },
  },
};
</script>

<style></style>
