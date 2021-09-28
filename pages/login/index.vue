<template>
  <div class="p-2 p-lg-6 flex-grow-1">
    <h1>Sign in</h1>
    <p>Welcome back! Time to munch on some snacks.</p>
    <form @submit.prevent="handleSubmit" class="mt-5" autocomplete="off">
      <input type="hidden" autocomplete="off" />
      <div class="form-group">
        <label>Email</label>
        <BaseInput
          v-model="email"
          type="email"
          required
          placeholder="Enter email address"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <BaseInputPassword
          type="password"
          placeholder="Enter password"
          variant="md"
          v-model="password"
        />
      </div>
      <div class="form-group text-right">
        <NuxtLink class="text-dark" to="/login/forgot-password"
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
        <div class="hrh my-4">or sign in via</div>
      </div>
      <div class="form-group text-center">
        <p>
          Don't have an account?
          <NuxtLink to="/signup">Sign up</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.state.auth) {
      return redirect("/");
    }
  },
  layout: "half-form",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    userObject() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    handleSubmit() {
      this.$loginUser(this.userObject);
    },
  },
};
</script>
