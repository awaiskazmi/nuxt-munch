<template>
  <div class="p-2 p-lg-6 text-center align-self-center mx-auto">
    <h1>Phone Number Verification</h1>
    <div v-if="ref == 'verify'">
      <p class="">
        Click on 'Send OTP' to send a 4-digit OTP to the number below.
      </p>
      <BaseInput
        readonly
        :value="user.phone"
        placeholder="Phone number"
        prepend="phone"
      />
      <div class="mt-3">
        <BaseButton @click="onclick" isButton full type="primary"
          >Send OTP</BaseButton
        >
      </div>
    </div>
    <div v-if="ref == 'signup'">
      <p class="m-0">
        Please enter the 4-digit verification code sent to your number
      </p>
      <p>You need to verify your phone number to place an order.</p>
      <SignupOTP />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  layout: "half-form",
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    ...mapGetters({
      sendOTP: "sendOTP",
    }),
    ref() {
      return this.$route.query.ref;
    },
  },
  methods: {
    onclick() {
      let payload = {
        phone: this.user.phone,
        verificationType: "signup",
      };
      this.$store.dispatch("sendOTP", payload);
    },
  },
};
</script>

<style></style>
