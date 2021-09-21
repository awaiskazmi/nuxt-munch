<template>
  <div>
    <b-sidebar
      width="460px"
      id="sidebar-1"
      bg-variant="white"
      no-header
      backdrop
      shadow
    >
      <div class="py-6 px-4">
        <p class="my-4 h2 font-weight-bold">Delivery Location</p>
        <!-- <BaseInput placeholder="Search Location" prepend="search" /> -->
        <HeaderAutocomplete />
        <p class="mt-3">
          <small><strong>Or you can also</strong></small>
        </p>
        <HeaderGeolocation />
        <p class="h3 font-weight-bold mt-4">Popular Locations</p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
