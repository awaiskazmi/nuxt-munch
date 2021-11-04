<template>
  <div>
    <h1>Number Verification</h1>
    <p>
      Please enter the 4-digit verification code sent to your number &mdash;
    </p>
    <div class="d-inline-flex align-items-center mb-4">
      <p>{{ phoneValue }}</p>
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
import { mapState } from "vuex";
export default {
  layout: "half-form",
  props: ["otp", "phone", "pageRef", "phoneValue"],
  data() {
    return {
      redirect: this.$verificationEndpoints[this.pageRef], // named route
      redirectQuery: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
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

      // if not forgot password
      if (this.pageRef != "forgot") {
        // update local state
        this.$store.commit("setUserObject", {
          ...this.user,
          phoneVerified: true,
        });

        // update local storage
        localStorage.setItem(
          "m_user",
          JSON.stringify({
            ...this.user,
            phoneVerified: true,
          })
        );

        // show toast
        this.$store.dispatch("toast", {
          title: "Hurray!",
          message:
            "Your phone number has been verified. You can now place orders and enjoy your munchies.",
          variant: "success",
          position: "bottom-full",
        });
      }

      // redirect to path
      this.$router.push({ name: this.redirect, query: this.redirectQuery });
    },
  },
};
</script>

<style></style>
