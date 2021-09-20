<template>
  <BaseButton v-b-toggle.sidebar-1 rounded type="location" icon="place">{{
    locationLabel
  }}</BaseButton>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["location"]),
    locationLabel() {
      return this.location ? this.location : "Add location";
    }
  }
};
</script>

<style scoped>
a {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 40px;
}
</style>
