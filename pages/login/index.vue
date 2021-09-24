<template>
  <div class="p-2 p-lg-6 flex-grow-1">
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
        <BaseInputPassword
          type="password"
          placeholder="Enter password"
          variant="lg"
          v-model="password"
        />
      </div>
      <div class="form-group text-right">
        <NuxtLink class="text-secondary" to="/login/forgot-password"
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
    tokenPayload() {
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      return formData;
    },
  },
  methods: {
    handleSubmit() {
      this.$axios({
        mode: "cors",
        method: "post",
        url: "/api/proceed-login",
        data: this.tokenPayload,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.data.access_token) {
          localStorage.setItem("m_token", res.data.access_token);
          localStorage.setItem("m_user", JSON.stringify(res.data));
          this.$store.commit("setCurrentUser", res.data);
          this.$store.commit("setAuth", true);
          this.$store.commit("setAuthToken", res.data.access_token);
          window.location.replace("/");
        }
      });
    },
  },
};
</script>
