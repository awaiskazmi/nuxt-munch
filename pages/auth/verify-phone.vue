<template>
  <div class="p-2 p-lg-6 text-center align-self-center flex-grow-1">
    <!-- STEP 1 : Phone Verification -->
    <AuthPhoneInput
      :title="title"
      :subtitle="subtitle"
      :pageRef="pageRef"
      :phoneValue="refPhone"
      v-if="!phoneVerified"
      @phoneVerified="onphoneVerified"
    />
    <!-- STEP 2 : OTP Verification -->
    <AuthOTPInput
      :otp="otp"
      :phone="phone"
      :pageRef="pageRef"
      :phoneValue="refPhone"
      v-if="phoneVerified && !otpVerified"
      @otpVerified="onOtpVerified"
    />
    <!--
      In STEP 2, it redirects to respective flows.
      In case of forgot password, user is redirected to password reset flow.
      In case of signup, user is redirected to signup phone number flow.
    -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "half-form",
  data() {
    return {
      phone: "",
      otp: "",
      token: "",
      phoneVerified: false,
      otpVerified: false,
      query: this.$route.query,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      user: (state) => state.user,
    }),
    pageRef() {
      return this.query.ref;
    },
    refPhone() {
      return this.auth ? this.user.phone : this.phone;
    },
    title() {
      return this.query.ref == "forgot" ? "Reset password" : "Verify Phone";
    },
    subtitle() {
      return this.query.ref == "forgot"
        ? "Enter your mobile number, and we'll send a code to confirm it."
        : "Click the button below to send a 4 digit OTP to your phone number.";
    },
  },
  methods: {
    onphoneVerified(data) {
      // API data
      this.otp = data.code;
      this.phone = data.phone;
      // component data
      this.phoneVerified = true;
    },
    onOtpVerified(token) {
      // API data
      this.token = token;
      // component datd
      this.otpVerified = true;
    },
  },
};
</script>

<style scoped></style>
