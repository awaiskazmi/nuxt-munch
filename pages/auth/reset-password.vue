<template>
  <div class="p-2 p-lg-6 text-center align-self-center flex-grow-1">
    <h1>Enter new password</h1>
    <p>Let's setup your new password</p>
    <div class="form-group">
      <label for="" class="d-block text-left">Password</label>
      <BaseInputPassword
        v-model="password"
        type="password"
        placeholder="Enter password"
        variant="lg"
      />
      <small class="form-text text-left text-muted"
        >Password must contain lowercase, uppercase, and special characters e.g.
        ! @ # ? .</small
      >
    </div>
    <div class="form-group">
      <label for="" class="d-block text-left">Confirm Password</label>
      <BaseInputPassword
        v-model="repassword"
        type="password"
        placeholder="Re-enter password"
        variant="lg"
        :classList="invalid"
      />
      <div v-if="passwordInvalid" class="d-block text-left invalid-feedback">
        Passwords do not match
      </div>
    </div>
    <div class="form-group">
      <button @click="setPassword" class="btn btn-primary btn-block">
        Set Password
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "half-form",
  data() {
    return {
      password: "",
      repassword: "",
      passwordInvalid: false,
      query: this.$route.query,
    };
  },
  computed: {
    invalid() {
      return this.passwordInvalid ? "border-primary" : "";
    },
  },
  methods: {
    async setPassword() {
      if (this.password != this.repassword) {
        this.passwordInvalid = true;
      }
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await this.$axios.put(
          "/qa/v1/public/users/reset-password",
          {
            password: this.password,
            token: this.query.token,
          },
          config
        );
        if (res.status == 200) {
          console.log("...PASSWORD CHANEGD", res.data);
          this.$router.push("/login");
        }
      } catch (err) {
        this.passwordInvalid = true;
        console.log(err.response.body);
      }
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>
