<template>
  <div class="container py-3 py-md-5">
    <div class="row">
      <div class="col-12 col-md-4 mx-auto text-center">
        <img src="@/assets/images/coming-soon.svg" alt="" class="img-fluid" />
        <h1 class="h5 font-weight-bold my-4">Munchies is coming soon</h1>
        <p class="text-muted mb-4">
          We haven’t set up in {{ $route.query.area }} yet.. :'( We hope to
          operate there soon.
        </p>
        <p>
          <BaseButton isButton full type="primary" v-b-toggle.sidebar-location
            >Explore another location</BaseButton
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>