<template>
  <div class="m-landing">
    <div id="fixed">
      <!-- Loading -->
      <div
        id="loading"
        class="loading"
        :classes="isLoadedAlready ? 'done' : ''"
      >
        <img
          class="loading-gif"
          src="~/assets/images/landing/loader.gif"
          alt="Munchies loading..."
        />
      </div>
      <!-- hamburger -->
      <button style="position: fixed; z-index: 16" class="hamburger-icon">
        <div class="hamburger-bar"></div>
      </button>
      <div style="position: fixed; z-index: 15" id="nav-menu">
        <ul>
          <li>
            <button v-b-toggle.sidebar-location>I'm hungry</button>
          </li>
          <li class="d-none">
            <a target="_blank" href="https://blog.munchieshome.com/">Blog</a>
          </li>
        </ul>
      </div>
      <img src="/landing/frames/frame-0.jpg" alt="" class="img-canvas" />
      <img src="~/assets/images/landing/logo.svg" class="nav-logo" alt="" />
      <h3 class="hero-text" id="hero-text">
        Nothing serious. <br />
        Only delicious.
      </h3>
      <p class="title title-one">
        We know you rather wish <br />
        you were in the Bahamas, <br />sitting by the beach...
      </p>
      <p class="title title-two">
        Sippin' on some juice <br />in a fancy glass, but <br />you're not...
      </p>
      <p class="title title-three">
        Maybe not the views, <br />but we CAN provide <br />the juice!
      </p>
    </div>
    <div id="scroll">
      <!-- scroll indicator -->
      <div
        style="position: fixed; z-index: 3"
        class="scroll-indicator"
        id="scroll-indicator"
      >
        <svg
          width="30"
          height="64"
          viewBox="0 0 40 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="38"
            height="62"
            rx="19"
            stroke="white"
            stroke-width="2"
          />
          <circle class="scroll-dot" cx="20" cy="14" r="4" fill="white" />
        </svg>
        <p class="m-0 text-white"><span>Keep scrolling</span></p>
      </div>
      <div data-trigger="logo"></div>
      <div data-trigger=""></div>
      <div data-trigger="title-one"></div>
      <div data-trigger="title-two"></div>
      <div data-trigger="title-three"></div>
      <div id="categories" class="">
        <h3>
          Our stash is so good, it's a <br />crime you're not munching
          <br />right now.
        </h3>
        <div id="category-names">
          <h2>ice cream</h2>
          <h2>chips</h2>
          <h2>beverages</h2>
          <h2>chocolates</h2>
          <h2>breakfast</h2>
          <h2>bakery</h2>
          <h2>biscuits</h2>
          <h2>candies</h2>
          <img
            id="cat-ice-cream"
            src="~/assets/images/landing/ice-cream.png"
            alt=""
          />
          <img id="cat-chips" src="~/assets/images/landing/chips.png" alt="" />
          <img
            id="cat-beverages"
            src="~/assets/images/landing/beverages.png"
            alt=""
          />
          <img
            id="cat-chocolates"
            src="~/assets/images/landing/chocolate.png"
            alt=""
          />
          <img
            id="cat-breakfast"
            src="~/assets/images/landing/breakfast.png"
            alt=""
          />
          <img
            id="cat-bakery"
            src="~/assets/images/landing/bakery.png"
            alt=""
          />
          <img
            id="cat-biscuits"
            src="~/assets/images/landing/biscuits.png"
            alt=""
          />
          <img
            id="cat-candies"
            src="~/assets/images/landing/candies.png"
            alt=""
          />
        </div>
      </div>
      <div id="how-hungry">
        <img
          id="how-hungry-text"
          src="~/assets/images/landing/hungry.svg"
          alt=""
        />
      </div>
      <div id="drooling" class="">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-8 ml-auto">
              <h3 class="">
                Bet you're drooling. <br class="d-none d-md-block" />Let's get
                you some Munchies. <br class="d-none d-md-block" />Here's
                <span class="red font-weight-bold">Rs. 150 off</span> on your
                <br class="d-none d-md-block" />first order!
              </h3>
              <div class="row">
                <div class="col-12 col-md-6">
                  <button class="munch-btn full" v-b-toggle.sidebar-location>
                    Order Munchies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer class="landing-footer" />
    </div>
  </div>
</template>

<script>
import babyBg from "assets/images/landing/baby.jpg";

export default {
  middleware({ store, redirect }) {
    if (store.state.auth) {
      return redirect("/orders");
    }
  },
  layout: "landing",
  head() {
    return {
      link: [
        // {
        //   rel: "stylesheet",
        //   href: "/landing/css/style.css",
        // },
      ],
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenLite.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TimelineLite.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/plugins/ScrollToPlugin.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/plugins/BezierPlugin.min.js",
        },
        { src: "/landing/js/scroll-magic.js", body: true },
        // { src: "/landing/js/app.js", body: true },
        { src: "/landing/js/hamburger.js", body: true },
        // { src: "/landing/js/game.js", body: true },
      ],
    };
  },
  data() {
    return {
      babyBg: babyBg,
      activeQuestion: 0,
      questions: [
        {
          id: 1,
          statement: "Which snack do you resonate most with?",
          options: {
            a: "CHIPS- I’m salty like that!",
            b: "DESSERTS! We could all do with some sweetness",
          },
        },
        {
          id: 2,
          statement: "Would you steal a snack from a kid when you’re hungry?",
          options: {
            a: "umm.. No, that’s mean.",
            b: "GIVE ME THAT!",
          },
        },
        {
          id: 3,
          statement: "I like big ________ and I cannot lie!",
          options: {
            a: "MUUUUNCHIESSSS",
            b: "HUUUGGSSS",
          },
        },
        {
          id: 4,
          statement: "On weekends you might find me...",
          options: {
            a: "Cruisin’ around the city",
            b: "Lounging with a Magnum in hand, duh?",
          },
        },
        {
          id: 5,
          statement: "Your thoughts on fries dipped in ice-cream...",
          options: {
            a: "Blasphemous",
            b: "IDGA*, just give it to me!",
          },
        },
      ],
      changingQuestion: false,
    };
  },
  computed: {
    isLoadedAlready() {
      if (process.client) {
        return document.body.classList.contains("landing-loaded");
      }
    },
    isFinished() {
      return this.activeQuestion == this.questions.length;
    },
    preText() {
      return !this.isFinished
        ? "Fill in the circle to answer the question"
        : "Suuuuper hungry!";
    },
    btnText() {
      return this.activeQuestion == this.questions.length - 1
        ? "Finish"
        : "Next";
    },
    transitionClass() {
      return this.changingQuestion ? "transition" : "";
    },
    windowWidth() {
      if (process.client) {
        return window.innerWidth;
      }
    },
    userAgent() {
      return this.windowWidth > 768 ? "web" : "mobile";
    },
  },
  methods: {
    nextQuestion() {
      if (this.isFinished) {
        return;
      }
      this.changingQuestion = true;
      setTimeout(() => {
        this.activeQuestion++;
        this.$refs.radioOne.checked = false;
        this.$refs.radioTwo.checked = false;
        this.changingQuestion = false;
        this.$refs.vdo.play();
      }, 750);
    },
  },
};
</script>

<style lang="css">
.game-screen .radio-group input:checked + label::before {
  background-image: url("~assets/images/landing/radio-checked.svg");
}
</style>
