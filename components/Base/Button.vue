<template>
  <button
    v-if="isButton"
    :disabled="disabled"
    :class="'m-btn btn btn-' + classes"
    :type="isFormSubmit ? 'submit' : ''"
    @click="$emit('click')"
  >
    <span v-if="icon" class="m-btn-icon material-icons">{{ icon }}</span>
    <span class="m-btn-label d-flex align-items-center">
      <slot></slot>
    </span>
  </button>
  <NuxtLink
    v-else
    :disabled="disabled"
    :class="'m-btn btn btn-' + classes"
    :to="url"
  >
    <span v-if="icon" class="m-btn-icon material-icons">{{ icon }}</span>
    <span class="m-btn-label">
      <slot></slot>
    </span>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    type: String,
    // https://fonts.google.com/icons?selected=Material+Icons
    icon: String,
    rounded: Boolean,
    full: Boolean,
    url: {
      type: String,
      default: "#",
    },
    isButton: Boolean,
    isFormSubmit: Boolean,
    disabled: Boolean,
    variant: String,
  },
  computed: {
    classes() {
      let classArr = [this.type];
      if (this.variant) classArr.push(`btn-${this.variant}`);
      if (this.rounded) classArr.push("rounded-pill");
      if (this.full) classArr.push("btn-block");
      if (this.type == "cart") {
        if (this.$store.state.products.products.some((p) => p.cartQuantity > 0))
          classArr.push("btn-primary");
        else classArr.push("btn-link");
      }
      return classArr.join(" ");
    },
  },
};
</script>

<style></style>
