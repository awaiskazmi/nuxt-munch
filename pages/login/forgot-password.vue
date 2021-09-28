<template>
  <div class="p-2 p-lg-6 text-center align-self-center flex-grow-1">
    <!-- STEP 1 : Phone Verification -->
    <ForgotPasswordPhone
      v-if="!phoneVerified"
      @phoneVerified="onphoneVerified"
    />
    <!-- STEP 2 : OTP Verification -->
    <ForgotPasswordOTP
      :otp="otp"
      :phone="phone"
      v-if="phoneVerified && !otpVerified"
      @otpVerified="onOtpVerified"
      @editPhone="phoneVerified = false"
    />
    <!-- STEP 3 : Set New Password -->
    <ForgotPasswordSetNew :token="token" v-if="phoneVerified && otpVerified" />
  </div>
</template>

<script>
export default {
  layout: "half-form",
  data() {
    return {
      phone: "",
      otp: "",
      token: "",
      phoneVerified: false,
      otpVerified: false,
    };
  },
  methods: {
    onphoneVerified(data) {
      this.otp = data.code;
      this.phone = data.phone;
      this.phoneVerified = true;
    },
    onOtpVerified(token) {
      this.token = token;
      this.otpVerified = true;
    },
  },
};
</script>

<style scoped></style>
