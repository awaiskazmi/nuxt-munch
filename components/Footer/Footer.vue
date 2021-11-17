<template>
  <footer class="pt-5 pb-4">
    <div class="container">
      <div class="row">
        <div class="col">
          <p>
            <img class="footer-brand" src="~/assets/images/logo.svg" />
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
            <a
              target="_blank"
              href="https://munchiespak.page.link/appdownloads"
            >
              <img
                class="app-badge"
                src="~/assets/images/badge-google.png"
                alt="Download Munchies App on Google Play Store"
              />
            </a>
            <a
              target="_blank"
              href="https://munchiespak.page.link/appdownloads"
            >
              <img
                class="ml-3 app-badge"
                src="~/assets/images/badge-apple.png"
                alt="Download Munchies App on Apple Store"
              />
            </a>
          </p>
        </div>
        <div class="col-6 col-lg">
          <h5>Munchies</h5>
          <ul class="list-unstyled">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/orders">Snacks</NuxtLink></li>
            <!-- <li><NuxtLink to="#">Promos</NuxtLink></li> -->
            <li><NuxtLink to="/trending">Favourites</NuxtLink></li>
          </ul>
        </div>
        <div class="col-6 col-lg">
          <h5>Company</h5>
          <ul class="list-unstyled">
            <!-- <li><NuxtLink to="/">About us</NuxtLink></li> -->
            <li><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></li>
            <li>
              <NuxtLink to="/terms-and-conditions"
                >Terms and Conditions</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="col-6 col-lg">
          <h5>Product</h5>
          <ul class="list-unstyled">
            <!-- <li><NuxtLink to="/">Our Partners</NuxtLink></li> -->
            <li>
              <NuxtLink to="/customer-privacy-policy">Customer Policy</NuxtLink>
            </li>
            <li><NuxtLink to="/referral-policy">Referral Policy</NuxtLink></li>
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
                <li><span class="btn btn-link">PECHS</span></li>
                <li>
                  <span class="btn btn-link">DHA</span>
                </li>
                <li>
                  <span class="btn btn-link">Clifton</span>
                </li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li>
                  <span class="btn btn-link">Nazimabad</span>
                </li>
                <li>
                  <span class="btn btn-link">Gulshan e Iqbal</span>
                </li>
                <li>
                  <span class="btn btn-link">Gulistan e Jauhar</span>
                </li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li>
                  <span class="btn btn-link">North Nazimabad</span>
                </li>
                <li>
                  <span class="btn btn-link">Saddar</span>
                </li>
                <li>
                  <span class="btn btn-link">Garden</span>
                </li>
              </ul>
            </div>
            <div class="col">
              <ul class="list-unstyled">
                <li>
                  <span class="btn btn-link">Soldier Bazar</span>
                </li>
                <li>
                  <span class="btn btn-link">Federal B Area</span>
                </li>
                <li>
                  <span class="btn btn-link">North Karachi</span>
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
        <div class="col-auto ml-auto pl-0">
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
  background: #fff url('~/assets/images/footer-m.svg')
  background-position: right -100px top 100px
  background-size: contain
  background-repeat: no-repeat

  &.landing-footer
    background: #f5f5f5 url('~/assets/images/footer-m.svg')
    background-position: right -100px top 100px
    background-size: contain
    background-repeat: no-repeat

    & *
      font-family: "Greycliff", sans-serif !important
      color: #808080

  @media (max-width: 768px)
    background-position: right -100px bottom -20px !important

small
  font-size: 12px
  color: #808080
a,
.btn-link
  text-decoration: none
  display: inline-block
  color: #808080
  padding: 0
  margin-bottom: 1rem

.btn-link
  cursor: default !important
</style>
