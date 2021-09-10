<template>
  <div class="p-5 p-lg-6">
    <h1>Sign in</h1>
    <p>Welcome back! Time to munch on some snacks.</p>
    <form @submit.prevent="handleSubmit" class="mt-5" autocomplete="off">
      <input type="hidden" autocomplete="off" />
      <div class="form-group">
        <label>Email:</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          placeholder="Enter email address"
        />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter password"
        />
      </div>
      <div class="form-group text-right">
        <NuxtLink class="text-secondary" to="/forgot-password"
          >Forgot password?</NuxtLink
        >
      </div>
      <div class="form-group">
        <input
          type="submit"
          value="Sign in"
          class="btn btn-primary btn-block btn-lg"
        />
      </div>
      <div>
        <div class="hrh">or Sign in via</div>
      </div>
      <div class="form-group text-center py-3">
        <p>
          Don't have an account?
          <NuxtLink class="text-secondary" to="/signup">Sign up</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: "half-form",
  data() {
    return {
      email: "",
      password: "",
      grant_type: "password",
    };
  },
  computed: {
    tokenPayload() {
      let payload = {
        email: this.email,
        password: this.password,
        grant_type: this.grant_type,
      };
      return JSON.stringify(payload);
    },
  },
  methods: {
    handleSubmit() {
      this.$axios
        .post(
          "/oauth/token?deviceToken=WEB&" + this.tokenPayload,
          this.tokenPayload,
          {
            headers: {
              Authorization: "Basic " + this.tokenPayload,
            },
          }
        )
        .then((res) => console.log(res));
      console.log("form submission", this.tokenPayload);
    },
  },
};
</script>

<style>
</style>