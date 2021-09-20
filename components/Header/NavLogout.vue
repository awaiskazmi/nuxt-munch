<template>
  <BaseButton @click="onClick(event)" rounded type="primary">Logout</BaseButton>
</template>

<script>
export default {
  methods: {
    onClick(event) {
      console.log("...logging out...", event);
      localStorage.removeItem("m_token");
      localStorage.removeItem("m_user");
      this.$store.commit("setCurrentUser", {});
      window.location.replace("/");
    }
  }
};
</script>

<style></style>
