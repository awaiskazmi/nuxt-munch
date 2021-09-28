<template>
  <div>
    <h1>Number Verification</h1>
    <p>Please enter the 4-digit verification code sent to your number</p>
    <div class="d-inline-flex align-items-center mb-4">
      <span>{{ phone }}</span>
      <button @click="$emit('editPhone')" class="m-btn btn btn-link p-1 ml-1">
        <span class="material-icons">edit</span>
      </button>
    </div>
    <SignupVerifyCodeInput
      @otpVerified="otpVerified"
      :otp="otp"
      :phone="phone"
    />
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
