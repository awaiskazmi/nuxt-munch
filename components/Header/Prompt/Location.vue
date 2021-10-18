<template>
  <div>
    <b-modal
      id="prompt-location"
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
              <h5 class="font-weight-bold">New address, new stash!</h5>
              <p class="text-muted mb-0">
                Your new address may have some other delicious munchies. Make
                your stash again!
              </p>
            </div>
            <div class="col-12 col-md-3 mt-3 mt-md-0">
              <BaseButton
                isButton
                @click="onClick"
                full
                type="outline-secondary"
                >OKAY</BaseButton
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
      this.$bvModal.hide("prompt-location");
    },
    location(value) {
      this.$bvModal.show("prompt-location");
    },
  },
  methods: {
    onClick() {
      window.location.replace("/");
    },
  },
};
</script>

<style lang="css">
#prompt-location {
  padding: 0 !important;
  overflow: hidden;
}
</style>