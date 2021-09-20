<template>
  <footer class="py-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <p>
            <img src="~/assets/images/logo.png" />
          </p>
        </div>
      </div>
      <div class="row pt-4 pt-lg-5">
        <div class="col-12 col-lg mr-lg-5 pr-5">
          <p class="pb-4 pb-lg-0">
            Munchies, the only snack delivery app in Pakistan. Get your favorite
            snacks delivered to your doorstep within minutes.
          </p>
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
        <div class="col-6 col-lg mt-4 mt-lg-0">
          <h5>Contact</h5>
          <ul class="list-unstyled">
            <li>
              <a href="mailto:contact@munchies.com">contact@munchies.com</a>
            </li>
            <li><a href="tel:021111111222">021-111-111222</a></li>
          </ul>
        </div>
      </div>
    </div>
    <hr />
    <p class="text-center">&copy; Copyrights 2021 - All rights reserved</p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h5 {
  margin-bottom: 1.5rem;
}
ul li {
  margin-top: 1rem;
}
p,
a {
  color: #808080;
}
</style>