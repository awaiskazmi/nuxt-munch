<template>
  <div class="m-checkbox">
    <input :id="id" type="checkbox" />
    <label @change="$emit('change')" :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ["id", "label"],
};
</script>

<style>
</style>