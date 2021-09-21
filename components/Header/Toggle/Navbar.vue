<template>
  <button
    v-b-toggle.collapse-1
    class="d-flex d-md-none nav-toggler flex-shrink-0"
  >
    <div class="bars"></div>
  </button>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>
