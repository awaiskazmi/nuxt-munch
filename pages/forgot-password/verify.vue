<template>
  <div class="p-2 p-lg-6 text-center align-self-center">
    <h1>Number Verification</h1>
    <p>Please enter the 4-digit verification code sent to your number</p>
    <SignupVerifyEditPhone />
    <SignupVerifyCodeInput />
    <NuxtLink to="/forgot-password/new">Set New Password</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: "half-form",
};
</script>

<style>
</style>