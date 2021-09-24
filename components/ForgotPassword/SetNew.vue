<template>
  <div>
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
  props: ["token"],
  data() {
    return {
      password: "",
      repassword: "",
      passwordInvalid: false,
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
        console.log("working");
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
            token: this.token,
          },
          config
        );
        if (res.status == 200) {
          console.log(res.data);
          window.location.replace("/login");
        }
      } catch (err) {
        this.passwordInvalid = true;
        console.log(err);
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
