<template>
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <h1>Profile</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.state.auth) {
      return redirect("/");
    }
  },
};
</script>

<style></style>
