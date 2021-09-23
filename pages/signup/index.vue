<template>
  <div class="p-2 p-lg-6 flex-grow-1">
    <h1>Sign up</h1>
    <p>Let's get you signed up to Munchies!</p>
    <form @submit="onsubmit" class="mt-5" autocomplete="off">
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
            <label>Phone Number:</label>
            <input
              type="email"
              class="form-control"
              placeholder="+92 0000000"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Email:</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter password"
            />
          </div>
        </div>
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
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Confirm password:</label>
            <input
              type="phone"
              class="form-control"
              placeholder="Re-enter password"
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
    </form>
    <div>
      <div class="hrh">or Sign up via</div>
    </div>
    <div class="form-group text-center py-3">
      <p>
        Already have an account?
        <NuxtLink class="text-secondary" to="/login">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: "half-form",
  methods: {
    onsubmit(e) {
      e.preventDefault();
      console.log("signing up");
      window.location = "/signup/verify";
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>