<template>
  <b-modal id="modal-search" size="xxl">
    <!-- Header -->
    <template #modal-header="{ close }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-auto d-none d-md-flex">
            <img
              @click="close()"
              src="~/assets/images/logo.png"
              alt="Munchies"
              height="40"
              class="cursor-pointer"
            />
          </div>
          <div class="col-auto ml-auto">
            <BaseButton isButton type="m-btn-action" @click="close()">
              <span class="material-icons">close</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
    <!-- Body -->
    <template #default="{ hide }">
      <div class="container mt-5">
        <div class="row">
          <div class="col">
            <p class="h1 font-weight-bold mb-3">Search</p>
            <BaseInput
              prepend="search"
              variant="lg"
              placeholder="I'm craving for"
            />
          </div>
        </div>
      </div>
    </template>
    <!-- Footer -->
    <template #modal-footer>
      <BaseButton
        v-b-toggle.sidebar-suggestion
        isButton
        rounded
        type="warning"
        icon="add"
        >Suggest Products</BaseButton
      >
    </template>
  </b-modal>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style></style>
