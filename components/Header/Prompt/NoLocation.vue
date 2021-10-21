<template>
  <div>
    <b-modal
      id="prompt-no-location"
      size="prompt"
      body-class="prompt"
      no-close-on-backdrop
      hide-header
      hide-footer
    >
      <template #default="{ hide }">
        <div class="container py-4">
          <div class="row align-items-center">
            <div class="col">
              <h5 class="font-weight-bold">
                Add your delivery address to proceed
              </h5>
              <p class="text-muted mb-0">
                Well to display assortments better, we need your delivery
                location.
              </p>
            </div>
            <div class="col-12 col-md-3 mt-3 mt-md-0">
              <BaseButton
                isButton
                @click="onClick"
                full
                type="outline-secondary"
                >SET DELIVERY LOCATION</BaseButton
              >
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      location: (state) => state.locationObj,
    }),
  },
  watch: {
    $route(to, from) {
      this.$bvModal.hide("prompt-no-location");
    },
  },
  mounted() {
    if (Object.keys(this.location).length === 0) {
      this.$bvModal.show("prompt-no-location");
    }
  },
  methods: {
    onClick() {
      this.$bvModal.hide("prompt-no-location");
      this.$root.$emit("bv::toggle::collapse", "sidebar-location");
    },
  },
};
</script>

<style lang="css">
#prompt-no-location {
  padding: 0 !important;
  overflow: hidden;
}
</style>
