<template>
  <div>
    <h1>Number Verification</h1>
    <p>
      Please enter the 4-digit verification code sent to your number &mdash;
    </p>
    <div class="d-inline-flex align-items-center mb-4">
      <span>{{ phoneValue }}</span>
    </div>
    <SignupVerifyCodeInput
      @otpVerified="otpVerified"
      :otp="otp"
      :phone="phone"
      :verification="verification"
    />
  </div>
</template>

<script>
export default {
  layout: "half-form",
  props: ["otp", "phone", "pageRef", "phoneValue"],
  data() {
    return {
      redirect: this.pageRef == "forgot" ? "auth-reset-password" : this.pageRef,
      redirectQuery: "",
    };
  },
  computed: {
    verification() {
      return this.$verificationTypes[this.pageRef];
    },
  },
  methods: {
    otpVerified(token) {
      this.redirectQuery = {
        token: token,
        verification: this.verification,
      };
      this.$router.push({ name: this.redirect, query: this.redirectQuery });
    },
  },
};
</script>

<style></style>
