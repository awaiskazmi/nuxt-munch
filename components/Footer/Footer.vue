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
                <li><button class="btn btn-link">PECHS</button></li>
                <li>
                  <button class="btn btn-link">DHA</button>
                </li>
                <li>
                  <button class="btn btn-link">Clifton</button>
                </li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li>
                  <button class="btn btn-link">Nazimabad</button>
                </li>
                <li>
                  <button class="btn btn-link">Gulshan e Iqbal</button>
                </li>
                <li>
                  <button class="btn btn-link">Gulistan e Jauhar</button>
                </li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li>
                  <button class="btn btn-link">North Nazimabad</button>
                </li>
                <li>
                  <button class="btn btn-link">Saddar</button>
                </li>
                <li>
                  <button class="btn btn-link">Garden</button>
                </li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li>
                  <button class="btn btn-link">Soldier Bazar</button>
                </li>
                <li>
                  <button class="btn btn-link">Federal B Area</button>
                </li>
                <li>
                  <button class="btn btn-link">North Karachi</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row py-md-4 align-items-center">
        <div class="col-auto">
          <p class="m-0 copyrights">
            &copy; Copyright {{ year }} — MUNCHIES — All rights reserved
          </p>
        </div>
        <div class="col-auto ml-auto">
          <NuxtLink to="/" class="social-icon m-0"
            ><img src="~/assets/images/icon-facebook.svg" height="24"
          /></NuxtLink>
          <NuxtLink to="/" class="social-icon my-0 ml-2">
            <img src="~/assets/images/icon-instagram.svg" height="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped lang="sass">
footer
  background: url('~/assets/images/footer-bg.svg') top right/contain no-repeat

  @media (max-width: 768px)
    background-position: top center
    background-size: cover
small
  font-size: 12px
  color: #808080
a,
.btn-link
  display: inline-block
  color: #808080
  padding: 0
  margin-bottom: 1rem
</style>
