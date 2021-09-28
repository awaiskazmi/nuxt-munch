<template>
  <BaseButton isButton v-b-toggle.sidebar-profile rounded type="link">{{
    this.$store.state.currentUser.user.name
  }}</BaseButton>
</template>

<script>
export default {};
</script>

<style></style>
