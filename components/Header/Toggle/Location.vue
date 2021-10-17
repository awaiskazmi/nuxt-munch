<template>
  <BaseButton
    isButton
    v-b-toggle.sidebar-location
    rounded
    type="location"
    icon="place"
    :title="locationLabel"
    >{{ locationLabel }}</BaseButton
  >
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["location"]),
    locationLabel() {
      return this.location ? this.location : "Add location";
    },
  },
};
</script>

<style lang="sass" scoped>
a,
button
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 40px;

  @media(max-width: 768px)
    margin-left: 0
</style>
