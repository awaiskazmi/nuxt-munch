<template>
  <div class="m-landing">
    <div id="loading" class="loading" :classes="isLoadedAlready ? 'done' : ''">
      <div class="spinner"></div>
    </div>
    <!-- FIXED ELEMENTS -->
    <div id="fixed-elements">
      <!-- image frames -->
      <div
        style="position:fixed;z-index:1;"
        id="img-frame"
        class="img-frame"
        data-0="background-image:!url('/landing/frames/frame-0.jpg')"
        data-25="background-image:!url('/landing/frames/frame-1.jpg')"
        data-50="background-image:!url('/landing/frames/frame-2.jpg')"
        data-75="background-image:!url('/landing/frames/frame-3.jpg')"
        data-100="background-image:!url('/landing/frames/frame-4.jpg')"
        data-125="background-image:!url('/landing/frames/frame-5.jpg')"
        data-150="background-image:!url('/landing/frames/frame-6.jpg')"
        data-175="background-image:!url('/landing/frames/frame-7.jpg')"
        data-200="background-image:!url('/landing/frames/frame-8.jpg')"
        data-225="background-image:!url('/landing/frames/frame-9.jpg')"
        data-250="background-image:!url('/landing/frames/frame-10.jpg')"
        data-275="background-image:!url('/landing/frames/frame-11.jpg')"
        data-300="background-image:!url('/landing/frames/frame-12.jpg')"
        data-325="background-image:!url('/landing/frames/frame-13.jpg')"
        data-350="background-image:!url('/landing/frames/frame-14.jpg')"
        data-375="background-image:!url('/landing/frames/frame-15.jpg')"
        data-400="background-image:!url('/landing/frames/frame-16.jpg')"
        data-425="background-image:!url('/landing/frames/frame-17.jpg')"
        data-450="background-image:!url('/landing/frames/frame-18.jpg')"
        data-475="background-image:!url('/landing/frames/frame-19.jpg')"
        data-500="background-image:!url('/landing/frames/frame-20.jpg')"
        data-525="background-image:!url('/landing/frames/frame-21.jpg')"
        data-550="background-image:!url('/landing/frames/frame-22.jpg')"
        data-575="background-image:!url('/landing/frames/frame-23.jpg')"
        data-600="background-image:!url('/landing/frames/frame-24.jpg')"
        data-625="background-image:!url('/landing/frames/frame-25.jpg')"
        data-650="background-image:!url('/landing/frames/frame-26.jpg')"
        data-675="background-image:!url('/landing/frames/frame-27.jpg')"
        data-700="background-image:!url('/landing/frames/frame-28.jpg')"
        data-725="background-image:!url('/landing/frames/frame-29.jpg')"
        data-750="background-image:!url('/landing/frames/frame-30.jpg')"
        data-775="background-image:!url('/landing/frames/frame-31.jpg')"
        data-800="background-image:!url('/landing/frames/frame-32.jpg')"
        data-825="background-image:!url('/landing/frames/frame-33.jpg')"
        data-850="background-image:!url('/landing/frames/frame-34.jpg')"
        data-875="background-image:!url('/landing/frames/frame-35.jpg')"
        data-900="background-image:!url('/landing/frames/frame-36.jpg')"
        data-925="background-image:!url('/landing/frames/frame-37.jpg')"
        data-950="background-image:!url('/landing/frames/frame-38.jpg')"
        data-975="background-image:!url('/landing/frames/frame-39.jpg')"
        data-1000="background-image:!url('/landing/frames/frame-40.jpg')"
        data-1025="background-image:!url('/landing/frames/frame-41.jpg')"
        data-1050="background-image:!url('/landing/frames/frame-42.jpg')"
        data-1075="background-image:!url('/landing/frames/frame-43.jpg')"
        data-1100="background-image:!url('/landing/frames/frame-44.jpg')"
        data-1125="background-image:!url('/landing/frames/frame-45.jpg')"
        data-1150="background-image:!url('/landing/frames/frame-46.jpg')"
        data-1175="background-image:!url('/landing/frames/frame-47.jpg')"
        data-1200="background-image:!url('/landing/frames/frame-48.jpg')"
        data-1225="background-image:!url('/landing/frames/frame-49.jpg')"
        data-1250="background-image:!url('/landing/frames/frame-50.jpg')"
        data-1275="background-image:!url('/landing/frames/frame-51.jpg')"
        data-1300="background-image:!url('/landing/frames/frame-52.jpg')"
        data-1325="background-image:!url('/landing/frames/frame-53.jpg')"
        data-1350="background-image:!url('/landing/frames/frame-54.jpg')"
        data-1375="background-image:!url('/landing/frames/frame-55.jpg')"
        data-1400="background-image:!url('/landing/frames/frame-56.jpg')"
        data-1425="background-image:!url('/landing/frames/frame-57.jpg')"
        data-1450="background-image:!url('/landing/frames/frame-58.jpg')"
        data-1475="background-image:!url('/landing/frames/frame-59.jpg')"
        data-1500="background-image:!url('/landing/frames/frame-60.jpg')"
        data-1525="background-image:!url('/landing/frames/frame-61.jpg')"
        data-1550="background-image:!url('/landing/frames/frame-62.jpg')"
        data-1575="background-image:!url('/landing/frames/frame-63.jpg')"
        data-1600="background-image:!url('/landing/frames/frame-64.jpg')"
        data-1625="background-image:!url('/landing/frames/frame-65.jpg')"
        data-1650="background-image:!url('/landing/frames/frame-66.jpg')"
        data-1675="background-image:!url('/landing/frames/frame-67.jpg')"
        data-1700="background-image:!url('/landing/frames/frame-68.jpg')"
        data-1725="background-image:!url('/landing/frames/frame-69.jpg')"
        data-1750="background-image:!url('/landing/frames/frame-70.jpg')"
        data-1775="background-image:!url('/landing/frames/frame-71.jpg')"
        data-1800="background-image:!url('/landing/frames/frame-72.jpg')"
        data-1825="background-image:!url('/landing/frames/frame-73.jpg')"
        data-1850="background-image:!url('/landing/frames/frame-74.jpg')"
        data-1875="background-image:!url('/landing/frames/frame-75.jpg')"
        data-1900="background-image:!url('/landing/frames/frame-76.jpg')"
        data-1925="background-image:!url('/landing/frames/frame-77.jpg')"
        data-1950="background-image:!url('/landing/frames/frame-78.jpg')"
        data-1975="background-image:!url('/landing/frames/frame-79.jpg')"
        data-2000="background-image:!url('/landing/frames/frame-80.jpg')"
        data-2025="background-image:!url('/landing/frames/frame-81.jpg')"
        data-2050="background-image:!url('/landing/frames/frame-82.jpg')"
        data-2075="background-image:!url('/landing/frames/frame-83.jpg')"
        data-2100="background-image:!url('/landing/frames/frame-84.jpg')"
        data-2125="background-image:!url('/landing/frames/frame-85.jpg')"
        data-2150="background-image:!url('/landing/frames/frame-86.jpg')"
        data-2175="background-image:!url('/landing/frames/frame-87.jpg')"
        data-2200="background-image:!url('/landing/frames/frame-88.jpg')"
        data-2225="background-image:!url('/landing/frames/frame-89.jpg')"
        data-2250="background-image:!url('/landing/frames/frame-90.jpg')"
        data-2275="background-image:!url('/landing/frames/frame-91.jpg')"
        data-2300="background-image:!url('/landing/frames/frame-92.jpg')"
        data-2325="background-image:!url('/landing/frames/frame-93.jpg')"
        data-2350="background-image:!url('/landing/frames/frame-94.jpg')"
        data-2375="background-image:!url('/landing/frames/frame-95.jpg')"
        data-2400="background-image:!url('/landing/frames/frame-96.jpg')"
        data-2425="background-image:!url('/landing/frames/frame-97.jpg')"
        data-2450="background-image:!url('/landing/frames/frame-98.jpg')"
        data-2475="background-image:!url('/landing/frames/frame-99.jpg')"
        data-2500="background-image:!url('/landing/frames/frame-100.jpg')"
        data-2525="background-image:!url('/landing/frames/frame-101.jpg')"
        data-2550="background-image:!url('/landing/frames/frame-102.jpg')"
        data-2575="background-image:!url('/landing/frames/frame-103.jpg')"
        data-2600="background-image:!url('/landing/frames/frame-104.jpg')"
        data-2625="background-image:!url('/landing/frames/frame-105.jpg')"
        data-2650="background-image:!url('/landing/frames/frame-106.jpg')"
        data-2675="background-image:!url('/landing/frames/frame-107.jpg')"
        data-2700="background-image:!url('/landing/frames/frame-108.jpg')"
        data-2725="background-image:!url('/landing/frames/frame-109.jpg')"
        data-2750="background-image:!url('/landing/frames/frame-110.jpg')"
        data-2775="background-image:!url('/landing/frames/frame-111.jpg')"
        data-2800="background-image:!url('/landing/frames/frame-112.jpg')"
        data-2825="background-image:!url('/landing/frames/frame-113.jpg')"
        data-2850="background-image:!url('/landing/frames/frame-114.jpg')"
        data-2875="background-image:!url('/landing/frames/frame-115.jpg')"
        data-2900="background-image:!url('/landing/frames/frame-116.jpg')"
        data-2925="background-image:!url('/landing/frames/frame-117.jpg')"
        data-2950="background-image:!url('/landing/frames/frame-118.jpg')"
        data-2975="background-image:!url('/landing/frames/frame-119.jpg')"
        data-3000="background-image:!url('/landing/frames/frame-120.jpg')"
        data-3025="background-image:!url('/landing/frames/frame-121.jpg')"
        data-3050="background-image:!url('/landing/frames/frame-122.jpg')"
        data-3075="background-image:!url('/landing/frames/frame-123.jpg')"
        data-3100="background-image:!url('/landing/frames/frame-124.jpg')"
        data-3125="background-image:!url('/landing/frames/frame-125.jpg')"
        data-3150="background-image:!url('/landing/frames/frame-126.jpg')"
        data-3175="background-image:!url('/landing/frames/frame-127.jpg')"
        data-3200="background-image:!url('/landing/frames/frame-128.jpg')"
        data-3225="background-image:!url('/landing/frames/frame-129.jpg')"
        data-3250="background-image:!url('/landing/frames/frame-130.jpg')"
        data-3275="background-image:!url('/landing/frames/frame-131.jpg')"
        data-3300="background-image:!url('/landing/frames/frame-132.jpg')"
        data-3325="background-image:!url('/landing/frames/frame-133.jpg')"
        data-3350="background-image:!url('/landing/frames/frame-134.jpg')"
        data-3375="background-image:!url('/landing/frames/frame-135.jpg')"
        data-3400="background-image:!url('/landing/frames/frame-136.jpg')"
        data-3425="background-image:!url('/landing/frames/frame-137.jpg')"
        data-3450="background-image:!url('/landing/frames/frame-138.jpg')"
        data-3475="background-image:!url('/landing/frames/frame-139.jpg')"
        data-3500="background-image:!url('/landing/frames/frame-140.jpg')"
        data-3525="background-image:!url('/landing/frames/frame-141.jpg')"
        data-3550="background-image:!url('/landing/frames/frame-142.jpg')"
        data-3575="background-image:!url('/landing/frames/frame-143.jpg')"
        data-3600="background-image:!url('/landing/frames/frame-144.jpg')"
        data-3625="background-image:!url('/landing/frames/frame-145.jpg')"
        data-3650="background-image:!url('/landing/frames/frame-146.jpg')"
        data-3675="background-image:!url('/landing/frames/frame-147.jpg')"
        data-3700="background-image:!url('/landing/frames/frame-148.jpg')"
        data-3725="background-image:!url('/landing/frames/frame-149.jpg')"
        data-3750="background-image:!url('/landing/frames/frame-150.jpg')"
        data-3775="background-image:!url('/landing/frames/frame-151.jpg')"
        data-3800="background-image:!url('/landing/frames/frame-152.jpg')"
        data-3825="background-image:!url('/landing/frames/frame-153.jpg')"
        data-3850="background-image:!url('/landing/frames/frame-154.jpg')"
        data-3875="background-image:!url('/landing/frames/frame-155.jpg')"
        data-3900="background-image:!url('/landing/frames/frame-156.jpg')"
        data-3925="background-image:!url('/landing/frames/frame-157.jpg')"
        data-3950="background-image:!url('/landing/frames/frame-158.jpg')"
        data-3975="background-image:!url('/landing/frames/frame-159.jpg')"
        data-4000="background-image:!url('/landing/frames/frame-160.jpg')"
        data-4025="background-image:!url('/landing/frames/frame-161.jpg')"
        data-4050="background-image:!url('/landing/frames/frame-162.jpg')"
        data-4075="background-image:!url('/landing/frames/frame-163.jpg')"
        data-4100="background-image:!url('/landing/frames/frame-164.jpg')"
        data-4125="background-image:!url('/landing/frames/frame-165.jpg')"
        data-4150="background-image:!url('/landing/frames/frame-166.jpg')"
        data-4175="background-image:!url('/landing/frames/frame-167.jpg')"
        data-4200="background-image:!url('/landing/frames/frame-168.jpg')"
        data-4225="background-image:!url('/landing/frames/frame-169.jpg')"
        data-4250="background-image:!url('/landing/frames/frame-170.jpg')"
        data-4275="background-image:!url('/landing/frames/frame-171.jpg')"
        data-4300="background-image:!url('/landing/frames/frame-172.jpg')"
      ></div>
      <!-- tagline -->
      <div
        style="position:fixed;z-index:2;"
        data-0="opacity:1;top:1rem;"
        data-500="opacity:0;top:-4rem;"
        class="tag-line"
      >
        Nothing serious. Only delicious.
      </div>
      <!-- headline text -->
      <div style="position:fixed;z-index:3;" class="" id="headline-text">
        <p
          class="h1"
          data-anchor-target="#trigger-heading-text-1"
          data-bottom-top="!opacity:0;!margin-top:2rem;"
          data-center-top="!opacity:1;!margin-top:0rem;"
          data-150-top="opacity:1;margin-top:-1rem"
          data-50-top="opacity:0;margin-top:-2rem"
        >
          We know you rather wish <br />you were in the Bahamas, <br />sitting
          by the beach...
        </p>
        <p
          class="h1"
          data-anchor-target="#trigger-heading-text-2"
          data-bottom-top="!opacity:0;!margin-top:2rem;"
          data-center-top="!opacity:1;!margin-top:0rem;"
          data-150-top="opacity:1;margin-top:-1rem"
          data-50-top="opacity:0;margin-top:-2rem"
        >
          Sippin’ on some juice <br />in a fancy glass, but <br />you’re not...
        </p>
        <div
          class=""
          data-anchor-target="#trigger-heading-text-3"
          data-bottom-top="!opacity:0;!margin-top:2rem;"
          data-center-top="!opacity:1;!margin-top:0rem;"
          data-150-top="opacity:1;margin-top:-1rem"
          data-50-top="opacity:1;margin-top:-2rem"
        >
          <p class="h1">
            Maybe not the views, <br />but we CAN provide <br />the juice!
          </p>
          <button class="btn n" v-b-modal.modal-search>Find Munchies</button>
        </div>
      </div>
      <!-- logo -->
      <img
        style="position:fixed;z-index:12;"
        data-anchor-target="#trigger-logo"
        data-top="width:100%;margin-top:35vh;"
        data-top-bottom="width:50%;margin-top:0%;"
        src="~/assets/images/landing/logo.svg"
        class="nav-logo"
      />
    </div>
    <!-- RELATIVE ELEMENTS / TRIGGERS / FOR MOBILE -->
    <div id="skrollr-body">
      <div class="trigger spacer vh" id="trigger-logo"></div>
      <div class="spacer vh"></div>
      <div class="trigger vh" id="trigger-heading-text-1"></div>
      <div class="trigger vh" id="trigger-heading-text-2"></div>
      <div class="trigger vh" id="trigger-heading-text-3"></div>
      <!-- CATEGORY HEADING TRIGGERS -->
      <section
        style="position:relative;z-index:4;"
        class="categories"
        id="categories"
      >
        <h3>
          Our stash is so good, its a<br />crime you're not munching<br />right
          now.
        </h3>
        <div class="heading-trigger-spacer-mobile"></div>
        <div class="heading-triggers" id="heading-triggers">
          <div class="trigger heading-trigger" id="trigger-category-1"></div>
          <div class="trigger heading-trigger" id="trigger-category-2"></div>
          <div class="trigger heading-trigger" id="trigger-category-3"></div>
          <div class="trigger heading-trigger" id="trigger-category-4"></div>
          <div class="trigger heading-trigger" id="trigger-category-5"></div>
          <div class="trigger heading-trigger" id="trigger-category-6"></div>
          <div class="trigger heading-trigger" id="trigger-category-7"></div>
          <div class="trigger heading-trigger" id="trigger-category-8"></div>
        </div>
      </section>
      <!-- HOW HUNGRY? -->
      <section style="position:relative;z-index:8;" id="how-hungry">
        <div id="how-hungry-title-wrapper"></div>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-7 ml-auto">
              <h3>
                Bet you're drooling.<br />Let's sign you up and, psst...<br />Here's
                <span class="red">Rs. 150 off</span> on your <br />first order!
              </h3>
              <div class="row">
                <div class="col-12 col-md-6">
                  <button class="btn full" v-b-toggle.sidebar-location>
                    Get started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- STARVIN MARVIN -->
      <section
        style="position:relative;z-index:8;"
        :style="{ backgroundImage: `url(${babyBg})` }"
        id="starvin"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-10 mx-auto">
              <p>Take the hunger meter quiz</p>
              <h2>
                Starvin’, Marvin? <br />
                There’s only one way <br />
                to find out.
              </h2>
              <div class="row">
                <div class="col-12 col-md-4">
                  <button id="btn-start-game" class="btn full">
                    Let's play!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- FIXED ABOVE FRAME -->
    <div id="fixed-above-frame">
      <!-- category headings -->
      <div
        style="position:fixed;z-index:5;"
        class="headings"
        data-anchor-target=".heading-triggers"
        data-start="position:!fixed;left:4rem; @smoothScroll:!0;"
        data-bottom-top="top:calc(100vh - 0px);"
        data--132-center-top="top:calc(50vh - 132px);"
        data--100p-center-top="top:calc(50vh - 264px); @smoothScroll:!1"
        data--200p-center-top="top:calc(50vh - 396px)"
        data--300p-center-top="top:calc(50vh - 528px)"
        data--400p-center-top="top:calc(50vh - 660px)"
        data--500p-center-top="top:calc(50vh - 792px)"
        data--600p-center-top="top:calc(50vh - 924px)"
        data--700p-center-top="top:calc(50vh - 1056px)"
        data--800p-center-tops="top:calc(50vh - 1188px)"
        data--900p-center-tops="top:calc(50vh - 1320px);position:!absolute;bottom:!0;top:!unset;left:!0"
      >
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--132-center-top="color:!#FF8FDA"
          data--100p-center-top="color:!#FFB8F4"
        >
          ice cream
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--100p-center-top="color:!#FF8FDA"
          data--200p-center-top="color:!#FFB8F4"
        >
          chips
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--200p-center-top="color:!#FF8FDA"
          data--300p-center-top="color:!#FFB8F4"
        >
          beverages
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--300p-center-top="color:!#FF8FDA"
          data--400p-center-top="color:!#FFB8F4"
        >
          chocolates
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--400p-center-top="color:!#FF8FDA"
          data--500p-center-top="color:!#FFB8F4"
        >
          breakfast
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--500p-center-top="color:!#FF8FDA"
          data--600p-center-top="color:!#FFB8F4"
        >
          bakery
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--600p-center-top="color:!#FF8FDA"
          data--700p-center-top="color:!#FFB8F4"
        >
          biscuits
        </h2>
        <h2
          data-anchor-target=".heading-triggers"
          data-start="color:!#FFB8F4"
          data--700p-center-top="color:!#FF8FDA"
          data--800p-center-tops="color:!#FFB8F4"
        >
          candies
        </h2>
      </div>
      <!-- category gradient overlay -->
      <div
        style="position:fixed;z-index:6;"
        id="category-gradient-overlay"
        data-anchor-target="#categories"
        data-bottom-top="opacity:0"
        data-top="opacity:1"
      ></div>
      <!-- category images -->
      <div style="position:fixed;z-index:7;" id="category-images-wrapper">
        <!-- category images -->
        <img
          src="~/assets/images/landing/ice-cream.png"
          class="product-image"
          data-anchor-target="#trigger-category-1"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/chips.png"
          class="product-image"
          data-anchor-target="#trigger-category-2"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/beverages.png"
          class="product-image"
          data-anchor-target="#trigger-category-3"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/chocolate.png"
          class="product-image"
          data-anchor-target="#trigger-category-4"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/breakfast.png"
          class="product-image"
          data-anchor-target="#trigger-category-5"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/bakery.png"
          class="product-image"
          data-anchor-target="#trigger-category-6"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/biscuits.png"
          class="product-image"
          data-anchor-target="#trigger-category-7"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottom="transform:scale(1);opacity:1"
          data--50-center-bottom="transform:scale(0);opacity:0"
        />
        <img
          src="~/assets/images/landing/candies.png"
          class="product-image"
          data-anchor-target="#trigger-category-8"
          data--50-center-top="transform:scale(0);opacity:0"
          data--132-center-top="transform:scale(1);opacity:1"
          data-center-bottoms="transform:scale(1);opacity:1"
          data--50-center-bottoms="transform:scale(0);opacity:0"
        />
      </div>
    </div>
    <!-- FIXED ABOVE CATEGORIES -->
    <div id="fixed-above-categories">
      <!-- to cover categories mobile -->
      <div
        id="to-cover-categories-mobile"
        data-anchor-target="#how-hungry"
        data-bottom-top="top:100vh;"
        data-top="top:0vh;"
        data-400-bottom="top:-100vh"
        data-emit-events
      ></div>
      <h2 style="position:fixed;z-index:9;" id="how-hungry-title">
        <img
          data-anchor-target="#how-hungry"
          data-top="transform:rotateZ(0deg) translate(35%,-15%);"
          data-400-bottom="transform:rotateZ(0deg) translate(-79%,-45%);"
          data-bottom="transform:rotateZ(0deg) translate(-79%,-200%);"
          src="~/assets/images/landing/hungry.svg"
          alt=""
        />
      </h2>
    </div>
    <!-- GAME (active) -->
    <section style="position:fixed;z-index:13;" id="game" class="">
      <div id="game-screen" class="game-screen">
        <div id="meme-gif-wrapper">
          <video :key="activeQuestion" ref="vdo" muted autoplay loop>
            <source
              type="video/mp4"
              :src="`/landing/gifs/${userAgent}/${activeQuestion}.mp4`"
            />
          </video>
        </div>
        <div class="game-questions" :class="transitionClass">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-10 mx-auto">
                <div v-if="!isFinished">
                  <p>{{ preText }}</p>
                  <h3>{{ questions[activeQuestion].statement }}</h3>
                  <div class="q-options">
                    <div class="radio-group">
                      <input
                        ref="radioOne"
                        :id="`q${activeQuestion}-1`"
                        type="radio"
                        :name="`q-${activeQuestion}`"
                      />
                      <label :for="`q${activeQuestion}-1`">{{
                        questions[activeQuestion].options["a"]
                      }}</label>
                    </div>
                    <div class="radio-group">
                      <input
                        ref="radioTwo"
                        :id="`q${activeQuestion}-2`"
                        type="radio"
                        :name="`q-${activeQuestion}`"
                      />
                      <label :for="`q${activeQuestion}-2`">{{
                        questions[activeQuestion].options["b"]
                      }}</label>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p>Suuuuper hungry!</p>
                  <h3>
                    Whoa, seems like <br />you could eat a whole <br />da*n cow!
                  </h3>
                  <BaseButton isButton v-b-toggle.sidebar-location
                    >GIMME MUNCHIES</BaseButton
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="game-screen-footer" v-if="!isFinished">
            <div class="container pt-0">
              <div class="row">
                <div class="col-12 col-md-10 mx-auto">
                  <div class="row align-items-end">
                    <div class="col-12 col-md-auto">
                      <ul class="game-screen-steps">
                        <li
                          v-for="q in questions"
                          :key="q.id"
                          :class="activeQuestion + 1 == q.id ? 'active' : ''"
                        ></li>
                      </ul>
                    </div>
                    <div class="col-12 col-md-4 ml-auto">
                      <button
                        @click="nextQuestion"
                        id="game-next"
                        class="btn full"
                      >
                        {{ btnText }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- FIXED ABOVE ALL -->
    <div class="r">
      <!-- hamburger -->
      <button style="position:fixed;z-index:16;" class="hamburger-icon">
        <div class="hamburger-bar"></div>
      </button>
      <div style="position:fixed;z-index:15;" id="nav-menu">
        <ul>
          <li>
            <nuxt-link to="#" v-b-toggle.sidebar-location>I'm hungry</nuxt-link>
          </li>
          <li><nuxt-link to="/new-landing">Blog</nuxt-link></li>
          <li><nuxt-link to="/new-landing">Contact us</nuxt-link></li>
        </ul>
      </div>
    </div>
    <!-- THINGS TO LAZY LOAD -->
    <div id="lazy-load-stuff" class="n"></div>
  </div>
</template>

<script>
import babyBg from "assets/images/landing/baby.jpg";

export default {
  layout: "landing",
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/landing/css/style.css",
        },
      ],
      script: [
        { src: "/landing/js/skrollr.min.js" },
        { src: "/landing/js/app.js", body: true },
        { src: "/landing/js/hamburger.js", body: true },
        { src: "/landing/js/game.js", body: true },
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
      return this.isFinished ? "Finish" : "Next";
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
  mounted() {
    this.$refs.vdo.play();
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
.game-screen .radio-group input:checked ~ label::before {
  background-image: url("./assets/images/landing/radio-checked.svg");
}
</style>
