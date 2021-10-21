<template>
  <div class="p-2 p-lg-6 text-center align-self-center">
    <h1>Number Verification</h1>
    <p class="m-0">
      Please enter the 4-digit verification code sent to your number
    </p>
    <p>You need to verify your phone number to place an order.</p>
    <SignupOTP />
    <SignupVerifyCodeInput />
  </div>
</template>

<script>
export default {
  layout: "half-form",
};
</script>

<style>
</style>