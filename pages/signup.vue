<template>
  <div class="p-5 p-lg-6">
    <h1>Sign up</h1>
    <p>Let's get you signed up to Munchies!</p>
    <form class="mt-5" autocomplete="off">
      <input type="hidden" autocomplete="off" />
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Name:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Email:</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email address"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Password:</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Confirm password:</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter confirm address"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Phone number:</label>
            <input
              type="phone"
              class="form-control"
              placeholder="Enter phone"
            />
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <input
          type="submit"
          value="Sign up"
          class="btn btn-primary btn-block btn-lg"
        />
      </div>
      <div>
        <div class="hrh">or Sign up via</div>
      </div>
      <div class="form-group text-center py-3">
        <p>
          Already have an account?
          <NuxtLink class="text-secondary" to="/login">Sign in</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: "half-form",
};
</script>

<style>
</style>