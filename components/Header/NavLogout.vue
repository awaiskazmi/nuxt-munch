<template>
  <BaseButton isButton @click="onClick" rounded type="primary"
    >Logout</BaseButton
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
