<template>
  <main>
    <Header />
    <div class="container-fluid">
      <div id="layout" class="row">
        <div class="col-6 p-0 img-bg d-none d-lg-flex"></div>
        <div class="col-12 col-lg-6">
          <nuxt />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["background"],
};
</script>

<style scoped>
#layout {
  min-height: calc(100vh - 66px);
}
.img-bg {
  background: url("../assets/images/form-bg.png") center/cover no-repeat;
}
</style>