<template>
  <div @click="onclick" class="m-dropdown-suggestion">
    {{ label }}
  </div>
</template>

<script>
export default {
  props: ["id", "label"],
  data() {
    return {};
  },
  methods: {
    onclick() {
      this.$setLocation(this.label);
      this.$emit("select", this.label);
    },
  },
};
</script>

<style></style>
