<template>
  <div class="m-radio">
    <input
      type="radio"
      :id="`${name}-${id}`"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', value)"
    />
    <label :for="`${name}-${id}`">
      <span v-if="icon" class="material-icons">{{ icon }}</span
      >{{ label }}</label
    >
  </div>
</template>

<script>
export default {
  props: ["label", "value", "name", "id", "icon", "checked"],
};
</script>

<style></style>
