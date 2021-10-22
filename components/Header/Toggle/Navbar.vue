<template>
  <button
    @click="$emit('click')"
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

<style lang="sass" scoped>
button
  margin-left: 10px;
  @media (max-width: 768px)
    margin-left: auto
</style>
