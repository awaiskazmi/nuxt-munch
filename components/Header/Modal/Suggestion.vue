<template>
  <div>
    <b-sidebar
      z-index="9999"
      width="460px"
      id="sidebar-suggestion"
      bg-variant="white"
      no-header
      right
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <BaseButton isButton type="m-btn-action m-sidebar-close" @click="hide">
          <span class="material-icons">close</span>
        </BaseButton>
        <div class="d-flex flex-column justify-content-between h-100">
          <div>
            <img
              src="~/assets/images/form-bg.png"
              height="120"
              class="sidebar-header-img"
            />
            <div class="p-4">
              <p class="mb-4 mt-0 h2 font-weight-bold">Suggest product</p>
              <p>Let us know what to add to Munchies</p>
              <div class="form-group mt-5">
                <label class="m-input-label">Product Name</label>
                <BaseInput
                  v-model="product"
                  variant="md"
                  placeholder="Enter product name"
                />
              </div>
              <div class="form-group">
                <label class="m-input-label">Weight</label>
                <BaseInput
                  v-model="weight"
                  variant="md"
                  placeholder="Enter product weight"
                />
              </div>
              <div class="form-group">
                <label class="m-input-label">Flavour</label>
                <BaseInput
                  v-model="flavour"
                  variant="md"
                  placeholder="Enter product flavour"
                />
              </div>
            </div>
          </div>
          <div class="px-4 pb-4">
            <BaseButton isButton type="primary" full>Suggest</BaseButton>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: "",
      weight: "",
      flavour: "",
    };
  },
};
</script>

<style></style>
