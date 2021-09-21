<template>
  <footer class="py-4">
    <div class="container">
      <div class="row">
        <div class="col">
          <p>
            <img src="~/assets/images/logo.png" />
          </p>
        </div>
      </div>
      <div class="row pt-4">
        <div class="col-12 col-lg-4 mr-lg-5 pr-5">
          <p class="pb-4 pb-lg-0">
            Munchies, the only snack delivery app in Pakistan. Get your favorite
            snacks delivered to your doorstep within minutes.
          </p>
          <p class="mt-4 mb-5 mb-md-0 d-flex">
            <NuxtLink to="/">
              <img
                src="~/assets/images/badge-google.png"
                alt="Download Munchies App on Google Play Store"
              />
            </NuxtLink>
            <NuxtLink to="/">
              <img
                class="ml-3"
                src="~/assets/images/badge-apple.png"
                alt="Download Munchies App on Apple Store"
              />
            </NuxtLink>
          </p>
        </div>
        <div class="col-6 col-lg">
          <h5>Munchies</h5>
          <ul class="list-unstyled">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="#">Snacks</NuxtLink></li>
            <li><NuxtLink to="#">Promos</NuxtLink></li>
            <li><NuxtLink to="#">Favourites</NuxtLink></li>
          </ul>
        </div>
        <div class="col-6 col-lg">
          <h5>Company</h5>
          <ul class="list-unstyled">
            <li><NuxtLink to="/">About us</NuxtLink></li>
            <li><NuxtLink to="#">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="#">Terms and Conditions</NuxtLink></li>
          </ul>
        </div>
        <div class="col-6 col-lg">
          <h5>Product</h5>
          <ul class="list-unstyled">
            <li><NuxtLink to="/">Our Partners</NuxtLink></li>
            <li><NuxtLink to="#">Customer Policy</NuxtLink></li>
            <li><NuxtLink to="#">Referral Policy</NuxtLink></li>
          </ul>
        </div>
        <div class="col-6 col-lg">
          <h5>Support</h5>
          <ul class="list-unstyled">
            <li>
              <a href="mailto:contact@munchies.com">contact@munchies.com</a>
            </li>
            <li><a href="tel:021111111222">021-111-111222</a></li>
          </ul>
        </div>
      </div>
      <div class="row pt-5 d-none d-md-flex">
        <div class="col-lg-4 mr-lg-5 pr-5"></div>
        <div class="col">
          <p class="mb-4">
            <span class="h5">Areas Serving</span>
            <small class="ml-1">Karachi</small>
          </p>
          <div class="row no-gutters">
            <div class="col">
              <ul class="list-unstyled">
                <li><NuxtLink to="/">PECHS</NuxtLink></li>
                <li><NuxtLink to="#">DHA</NuxtLink></li>
                <li><NuxtLink to="#">Clifton</NuxtLink></li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li><NuxtLink to="/">Nazimabad</NuxtLink></li>
                <li><NuxtLink to="#">Gulshan e Iqbal</NuxtLink></li>
                <li><NuxtLink to="#">Gulistan e Jauhar</NuxtLink></li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li><NuxtLink to="/">North Nazimabad</NuxtLink></li>
                <li><NuxtLink to="#">Saddar</NuxtLink></li>
                <li><NuxtLink to="#">Garden</NuxtLink></li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li><NuxtLink to="/">Soldier Bazar</NuxtLink></li>
                <li><NuxtLink to="#">Federal B Area</NuxtLink></li>
                <li><NuxtLink to="#">North Karachi</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row py-md-4 align-items-center">
        <div class="col-auto">
          <p class="m-0 copyrights">
            &copy; Copyright 2021 — MUNCHIES — All rights reserved
          </p>
        </div>
        <div class="col-auto ml-auto">
          <NuxtLink to="/" class="m-0"
            ><img src="~/assets/images/icon-facebook.svg" height="24"
          /></NuxtLink>
          <NuxtLink to="/" class="m-0">
            <img src="~/assets/images/icon-instagram.svg" height="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
footer
  background: url('~/assets/images/footer-bg.svg') top right/contain no-repeat
small
  font-size: 12px
  color: #808080
a
  display: inline-block
  color: #808080
  margin-bottom: 1rem
</style>
