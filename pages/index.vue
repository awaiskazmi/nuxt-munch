<template>
  <div>
    <section id="hero" class="bg-warning pb-5">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 data-aos="flip-up">Feeling peckish? Snack time!</h1>
            <!-- code output study -->
            <div class="d-nones">
              <!-- <pre>{{ location }}</pre> -->
              <!-- <pre>{{ cart }}</pre> -->
            </div>
            <p>We will deliver your snacks within minutes</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search for a product"
                :value="query"
                v-b-modal.modal-search
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
    <div class="container py-5 d-none">
      <h2>User Data</h2>
      <pre>{{ user }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
      subtitle: "",
      story: "",
      promo: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.currentUser.user,
      query: (state) => state.globalSearchQuery,
      location: (state) => state.locationObj,
      cart: (state) => state.products.products,
    }),
  },
  async fetch() {
    // GOOGLE SHEETS
    const sheetData = await this.$axios.$get(
      `/sheet/values/B1:B2?key=${this.$config.googleSheetKey}`
    );
    this.title = sheetData.values[0][0];
    this.subtitle = sheetData.values[1][0];

    // MOCKAPI
    // const mockData = await this.$axios.$get("/mock/HomePage");
    // this.title = mockData[0].title;
    // this.subtitle = mockData[0].subtitle;

    // STORKBLOK
    // https://api.storyblok.com/v2/cdn/stories/landing-page?version=draft&token=P8nNGIoRuwsHVDbGhLcwGwtt&cv=1632767213
    // const story = await fetch(
    //   "https://api.storyblok.com/v2/cdn/stories/orders-page?cv=1632809121&token=P8nNGIoRuwsHVDbGhLcwGwtt&version=published"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.story = data.story.content;
    //     this.promo = data.story.content.promo;
    //     this.title = data.story.content.title;
    //     this.subtitle = data.story.content.subtitle;
    //   });
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
