<template>
  <div>
    <!-- HERO -->
    <section id="hero" class="bg-warning pb-6">
      <div class="container">
        <div class="row mt-md-4">
          <div class="col">
            <h1 data-aos="flip-up">Feeling peckish? Snack time!</h1>
            <!-- code output study -->
            <div class="d-nones">
              <!-- <pre>{{ location }}</pre> -->
              <!-- <pre>{{ user }}</pre> -->
              <!-- <pre>{{ cart }}</pre> -->
            </div>
            <p class="h6">We will deliver your snacks within minutes</p>
          </div>
        </div>
        <div class="row mt-3 mt-md-4">
          <div class="col-12 col-lg-6">
            <div class="row">
              <div class="col-12 col-md-8">
                <BaseButton
                  variant="lg"
                  isButton
                  type="primary"
                  v-b-modal.modal-search
                  >Search for a Product</BaseButton
                >
                <input
                  type="text"
                  class="form-control d-none"
                  placeholder="Search for a product"
                  :value="query"
                  v-b-modal.modal-search
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- STEPS -->
    <section id="steps">
      <div class="container py-5">
        <div class="row">
          <div class="col text-center">
            <h2>Three simple steps</h2>
            <p>Munchies is super easy to use! Just follow these three steps</p>
            <div class="divider-small text-primary mb-5"></div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="swiper swiper-three-steps">
              <div v-swiper:swiperThreeSteps="optionsThreeSteps">
                <div class="swiper-wrapper mb-5 mb-md-0">
                  <div
                    class="swiper-slide text-center"
                    v-for="s in slidesThreeSteps"
                    :key="s.id"
                  >
                    <img
                      :src="require(`@/assets/images/${s.imgUrl}`)"
                      height="200"
                      :alt="s.title"
                    />
                    <h5 class="font-weight-bold">{{ s.title }}</h5>
                    <p class="text-muted">{{ s.sub }}</p>
                  </div>
                </div>
                <div
                  id="swiper-three-steps-pagination"
                  class="swiper-pagination"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- CATEGORIES -->
    <section id="categories">
      <div class="container py-5">
        <div class="row">
          <div class="col text-center">
            <h2>What can you find on munchies?</h2>
            <p>Munchies offers a variety of snacks to choose room!</p>
            <div class="divider-small text-primary mb-5"></div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="swiper swiper-categories">
              <div v-swiper:swiperCategories="optionsCategories">
                <div class="swiper-wrapper mb-5 mb-md-0">
                  <div
                    class="swiper-slide text-center"
                    v-for="(c, index) in categories"
                    :key="c.id"
                  >
                    <Category
                      :id="c.id"
                      :name="c.name"
                      :imageUrl="c.imageUrl"
                      data-aos="flip-downs"
                      :data-aos-delays="index * 10"
                    />
                  </div>
                </div>
                <div
                  id="swiper-categories-pagination"
                  class="swiper-pagination"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- PROMO -->
    <section id="promo">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-6 text-white pt-5 pt-md-0">
            <h3 class="font-weight-bold">
              Turn your weekend snackier!<br />Get 30% off on all crisps
            </h3>
            <div class="p-4 d-inline-flex my-3 align-items-center promo-box">
              <span class="font-weight-bold mr-2">Use Promo:</span>
              <span class="m-0 h4 font-weight-bold text-uppercase"
                >weekendmunch</span
              >
            </div>
            <p class="mt-3 mb-5 mb-md-0">
              Offer valid from Friday 27th till Sunday 29th
            </p>
          </div>
          <div class="col-12 col-md-6 pb-4 pb-md-0">
            <img
              src="@/assets/images/home-promo-lays.png"
              alt="Promo"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- PARTNERS -->
    <section id="partners">
      <div class="container py-5">
        <div class="row">
          <div class="col text-center">
            <h2>Meet our Partners</h2>
            <p>Munchies has partnered with many of your favorite brands</p>
            <div class="divider-small text-primary mb-5"></div>
          </div>
        </div>
        <div class="partners-grid">
          <div class="p-3 text-center border" v-for="(n, index) in 6" :key="n">
            <img
              :src="require(`@/assets/images/partners/logo-${n}.png`)"
              :alt="n"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- USPs -->
    <section id="usps">
      <div class="container py-5">
        <div class="row">
          <div class="col">
            <div class="swiper swiper-usps">
              <div v-swiper:swiperUsps="optionsUsps">
                <div class="swiper-wrapper mb-5 mb-md-0">
                  <div
                    class="swiper-slide text-center"
                    v-for="s in slidesUsps"
                    :key="s.id"
                  >
                    <img
                      :src="require(`@/assets/images/home/usp/${s.imgUrl}`)"
                      height="200"
                      :alt="s.title"
                    />
                    <h5 class="font-weight-bold">{{ s.title }}</h5>
                    <p class="text-muted">{{ s.sub }}</p>
                  </div>
                </div>
                <div
                  id="swiper-usps-pagination"
                  class="swiper-pagination"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- DOWNLOAD APP -->
    <section id="download">
      <div class="container py-5">
        <div class="row text-center">
          <div class="col-12 col-md-4">
            <img
              class="mobile-mockup mb-3 mb-md-0"
              src="@/assets/images/mobile-mockup.png"
              alt="App Preview"
            />
          </div>
          <div
            class="col-12 col-md-8 d-flex flex-column justify-content-around"
          >
            <div>
              <h3 class="font-weight-bold mb-4">Download Munchies App</h3>
              <p class="mb-5">
                Order snacks anywhere, anytime with munchies app! Download the
                app <br class="d-none d-md-block" />to get exclusive deals
              </p>
              <div class="d-flex justify-content-center">
                <nuxt-link class="mx-2" to="/">
                  <img
                    src="@/assets/images/badge-google.png"
                    alt="Download Munchies App on Google Play Store"
                  />
                </nuxt-link>
                <nuxt-link class="mx-2" to="/">
                  <img
                    src="@/assets/images/badge-apple.png"
                    alt="Download Munchies App on Apple App Store"
                  />
                </nuxt-link>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-12 col-md">
                <p class="h2 text-primary m-0 m-md-2">50,000 +</p>
                <p class="text-muted my-0">APP DOWNLOADS</p>
              </div>
              <div class="col-12 col-md mt-4 mt-md-0">
                <p class="h2 text-primary m-0 m-md-2">
                  4.3 <span class="material-icons">star</span>
                </p>
                <p class="text-muted my-0">OVERALL RATING</p>
              </div>
              <div class="col-12 col-md mt-4 mt-md-0">
                <p class="h2 text-primary m-0 m-md-2">10,000 +</p>
                <p class="text-muted my-0">CUSTOMERS SERVED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- TESTIMONIALS -->
    <section id="testimonials">
      <div class="container py-5">
        <div class="row">
          <div class="col text-center">
            <h2>What our customers say</h2>
            <p>We value our amazing customers and their feedback</p>
            <div class="divider-small text-primary mb-5"></div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="swiper swiper-testimonials">
              <div v-swiper:swiperTestimonials="optionsTestimonials">
                <div class="swiper-wrapper mb-5 mb-md-0">
                  <div
                    class="swiper-slide text-center"
                    v-for="s in slidesTestimonials"
                    :key="s.id"
                  >
                    <div class="card card-body p-4 shadow-sm">
                      <img
                        class="testimonials-thumb my-3"
                        :src="
                          require(`@/assets/images/testimonials/${s.imgUrl}`)
                        "
                        height="50"
                        :alt="s.title"
                      />
                      <h5 class="font-weight-bold">{{ s.title }}</h5>
                      <p class="text-muted">{{ s.date }}</p>
                      <p class="mt-2">{{ s.sub }}</p>
                      <div class="mt-3 stars">
                        <span
                          v-for="n in 5"
                          class="material-icons"
                          :class="n <= s.stars ? 'text-primary' : 'text-muted'"
                          >star</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="swiper-testimonials-pagination"
                  class="swiper-pagination"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- BANNER -->
    <section id="banner">
      <div class="container py-5">
        <div class="row">
          <div class="col-12 col-md-6 mx-auto text-center">
            <img
              src="@/assets/images/home-banner-offer.svg"
              alt="30% off"
              class="img-fluid"
            />
            <div
              class="
                p-3
                bg-secondary
                text-white
                rounded-pill
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <span class="font-weight-bold mr-2">Use Promo:</span>
              <span class="m-0 h4 font-weight-bold text-uppercase"
                >munchtime</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
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
      slidesThreeSteps: [
        {
          id: 1,
          imgUrl: "home-signup.svg",
          title: "1. Sign up to Munchies",
          sub: "Register on munchies today and get exclusive deals!",
        },
        {
          id: 2,
          imgUrl: "home-pick.svg",
          title: "2. Pick your favorite snacks",
          sub: "Choose from a variety of snacks and place an order",
        },
        {
          id: 3,
          imgUrl: "home-enjoy.svg",
          title: "3. Enjoy your snacks!",
          sub: "Answer your door! Munchies buddy is here with your snacks",
        },
      ],
      optionsThreeSteps: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        loop: false,
        breakpoints: {
          769: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            pagination: {
              el: "#swiper-three-steps-pagination",
            },
          },
        },
      },
      slidesUsps: [
        {
          id: 1,
          imgUrl: "rapid.svg",
          title: "Rapid Delivery",
          sub: "Munchies delivers your snacks within 30 minutes right to your door!",
        },
        {
          id: 2,
          imgUrl: "variety.svg",
          title: "Variety of Snacks",
          sub: "Choose from a variety of 100s of yummy snacks",
        },
        {
          id: 3,
          imgUrl: "hours.svg",
          title: "Munch Hours",
          sub: "Munchies delivers all your snacks from 10 am to 10 pm",
        },
      ],
      optionsUsps: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        loop: false,
        breakpoints: {
          769: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            pagination: {
              el: "#swiper-usps-pagination",
            },
          },
        },
      },
      slidesTestimonials: [
        {
          id: 1,
          imgUrl: "asma.png",
          title: "Asma Riaz Malik",
          date: "October 18, 2020",
          sub: "Munchies is a really nice app. The best part about munchies is that we get 50% off on many snacks. I still want them to add more items though.",
          stars: 4,
        },
        {
          id: 2,
          imgUrl: "ibrahim.png",
          title: "Muhammad Ibrahim Ali",
          date: "October 26, 2020",
          sub: "The promos are just amazing! They make me order even when I don’t really need to. The riders are professional and humble too.",
          stars: 5,
        },
        {
          id: 3,
          imgUrl: "maryam.png",
          title: "Maryam Niaz",
          date: "November 02, 2020",
          sub: "I had a very good experience with munchies. The app is easy to use and delivery time is minimum too. My kids love to use this app.",
          stars: 4,
        },
      ],
      optionsTestimonials: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
        loop: false,
        breakpoints: {
          769: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            pagination: {
              el: "#swiper-testimonials-pagination",
            },
          },
        },
      },
      optionsCategories: {
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 24,
        loop: false,
        breakpoints: {
          769: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            pagination: {
              el: "#swiper-categories-pagination",
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      query: (state) => state.globalSearchQuery,
      location: (state) => state.locationObj,
      cart: (state) => state.products.products,
      categories: (state) => state.categories.categories,
    }),
  },
  mounted() {
    console.log("USER", this.user);
    console.log("LOCATION", this.location);
    console.log("CART", this.cart);
    console.log("CATEGORIES", this.categories);
  },
  async fetch() {
    // GOOGLE SHEETS
    // const sheetData = await this.$axios.$get(
    //   `/sheet/values/B1:B2?key=${this.$config.googleSheetKey}`
    // );
    // this.title = sheetData.values[0][0];
    // this.subtitle = sheetData.values[1][0];
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

<style lang="sass" scoped>
#hero
  padding-top: 4rem
  min-height: 360px
  background: url("@/assets/images/header-img.png") center/cover no-repeat
  @media (max-width: 991.5px)
    min-height: unset
    background: none
#usps,
#categories,
#testimonials,
  background-color: #F6FCFF
#promo
  background: #BEF3FF url("@/assets/images/home-promo-bg.svg") center/cover no-repeat
  @media (max-width: 991.5px)
    background-image: url("@/assets/images/home-promo-bg-mobile.svg")
  .promo-box
    background-color: #FF8956
.partners-grid
  display: grid
  grid-template-columns: repeat(6, 1fr)
  grid-gap: 24px
  @media (max-width: 991.5px)
    grid-template-columns: repeat(2, 1fr)
#download
  background: linear-gradient(to bottom, #F06161 60%, #fff 40%)
  color: #fff
  @media (max-width: 991.5px)
    background: linear-gradient(to bottom, #F06161 40%, #fff 40%)
    color: #000
.testimonials-thumb
  display: block
  height: 50px
  width: 50px
  margin-left: auto
  margin-right: auto
  object-fit: cover
  object-position: center
#banner
  background: #F06161 url("@/assets/images/home-banner-bg.png") center/cover no-repeat
  @media (max-width: 991.5px)
    min-height: 680px
    display: flex
    align-items: center
    justify-content: center
    background-image: url("@/assets/images/home-banner-bg-mobile.png")
</style>
