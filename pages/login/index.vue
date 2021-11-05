<template>
  <div class="p-2 p-lg-6 align-self-center flex-grow-1">
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
          v-model="password"
          type="password"
          variant="md"
          required
          placeholder="Enter password"
        />
      </div>
      <div class="form-group text-right">
        <NuxtLink class="text-dark" to="/auth/verify-phone?ref=forgot"
          >Forgot password?</NuxtLink
        >
      </div>
      <div class="form-group">
        <BaseButton
          :disabled="isAttemptingLogin"
          isButton
          isFormSubmit
          type="primary"
          variant="lg"
          full
          ><b-spinner v-show="isAttemptingLogin" class="mr-1" small></b-spinner
          ><span>Sign in</span></BaseButton
        >
      </div>
      <div>
        <div class="hrh my-4">or sign in via</div>
      </div>
      <div class="form-group text-center">
        <p>
          Don't have an account?
          <NuxtLink :to="`/signup${refUrlSting}`">Sign up</NuxtLink>
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
      isAttemptingLogin: false,
    };
  },
  computed: {
    userObject() {
      return {
        email: this.email,
        password: this.password,
        ref: this.refUrl,
      };
    },
    refUrl() {
      return this.$route.query.ref;
    },
    refUrlSting() {
      return this.refUrl ? `?ref=${this.refUrl}` : "";
    },
  },
  methods: {
    handleSubmit() {
      this.isAttemptingLogin = true;
      this.$loginUser(this.userObject);
      setTimeout(() => {
        this.isAttemptingLogin = false;
      }, 2000);
    },
  },
};
</script>
