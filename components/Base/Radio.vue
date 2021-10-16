<template>
  <div class="m-radio">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      @change="$emit('change', value)"
    />
    <label :for="id">
      <span v-if="icon" class="material-icons">{{ icon }}</span
      >{{ label }}</label
    >
  </div>
</template>

<script>
export default {
  props: ["label", "value", "name", "id", "icon"],
};
</script>

<style></style>
