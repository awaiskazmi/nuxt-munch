<template>
  <NuxtLink :class="'m-btn btn btn-' + classes" :to="url">
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
      default: "#"
    }
  },
  computed: {
    classes() {
      let classArr = [this.type];
      if (this.rounded) classArr.push("rounded-pill");
      if (this.full) classArr.push("btn-block");
      if (this.type == "cart") {
        if (this.$store.state.cart > 0) classArr.push("btn-primary");
        else classArr.push("btn-link");
      }
      return classArr.join(" ");
    }
  }
};
</script>

<style></style>
