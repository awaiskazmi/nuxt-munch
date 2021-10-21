<template>
  <div>
    <SignupVerifyCodeInput
      @otpVerified="otpVerified"
      :otp="otp"
      :phone="phone"
    />
  </div>
</template>

<script>
export default {
  props: ["otp", "phone"],
};
</script>

<style>
</style>