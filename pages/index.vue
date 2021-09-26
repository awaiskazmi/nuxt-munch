<template>
  <div>
    <section id="hero" class="bg-warning pb-5">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 data-aos="flip-up">{{ title }}</h1>
            <p>{{ subtitle }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter location"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">Let's Go</button>
              </div>
            </div>
            <p>Checkout where we currently deliver</p>
          </div>
        </div>
      </div>
    </section>
    <TopCategories />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      subtitle: "",
    };
  },
  async fetch() {
    const sheetData = await this.$axios.$get(
      `/sheet/values/B1:B2?key=${this.$config.googleSheetKey}`
    );
    this.title = sheetData.values[0][0];
    this.subtitle = sheetData.values[1][0];
  },
};
</script>

<style lang="scss" scoped>
#hero {
  padding-top: 4rem;
  min-height: 360px;
  background: url("@/assets/images/header-img.png") center/cover no-repeat;

  @media (max-width: 991.5px) {
    background-image: none;
  }
}
</style>
