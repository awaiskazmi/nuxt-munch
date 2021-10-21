<template>
  <div>
    <b-sidebar
      width="460px"
      id="sidebar-location"
      bg-variant="white"
      no-header
      backdrop
      shadow
      :no-close-on-esc="Object.keys(location).length === 0"
      :no-close-on-backdrop="Object.keys(location).length === 0"
    >
      <template #default="{ hide }">
        <div class="py-6 px-4">
          <BaseButton
            isButton
            type="m-btn-action m-sidebar-close"
            @click="Object.keys(location).length === 0 ? '' : hide()"
          >
            <span class="material-icons">close</span>
          </BaseButton>
          <p class="my-4 h2 font-weight-bold">Delivery Location</p>
          <!-- <BaseInput placeholder="Search Location" prepend="search" /> -->
          <HeaderAutocomplete @onselect="hide" />
          <p class="mt-3">
            <small><strong>Or you can also</strong></small>
          </p>
          <HeaderGeolocation />
          <!-- <p class="h3 font-weight-bold mt-4">Popular Locations</p> -->
        </div>
      </template>
    </b-sidebar>
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
};
</script>

<style></style>
