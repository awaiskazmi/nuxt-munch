<template>
  <div>
    <h1>Number Verification</h1>
    <p>Please enter the 4-digit verification code sent to your number</p>
    <div class="d-inline-flex align-items-center mb-4">
      <span>{{ phone }}</span>
      <NuxtLink to="/forgot-password" class="material-icons">edit</NuxtLink>
    </div>
    <SignupVerifyCodeInput
      @otpVerified="otpVerified"
      :otp="otp"
      :phone="phone"
    />
    <NuxtLink to="/forgot-password/new">Set New Password</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: "half-form",
  props: ["otp", "phone"],
  methods: {
    otpVerified(token) {
      this.$emit("otpVerified", token);
    },
  },
};
</script>

<style></style>
