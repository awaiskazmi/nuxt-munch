<template>
  <div>
    <h1>Reset password</h1>
    <p>Enter your mobile number, and we'll send a code to confirm it.</p>
    <label class="d-block text-left" for="">Phone Number</label>
    <BaseInput
      @focus="onfocus"
      placeholder="3001111222"
      variant="md"
      prependText="+92"
      v-model="phone"
      maxLength="10"
      :class="invalid"
    />
    <div class="invalid-feedback text-left">Phone number doesn't exist</div>
    <Button @click="onclick" class="btn btn-primary mt-4"
      >Reset Password</Button
    >
    <div class="mt-5">
      <NuxtLink class="text-muted d-inline-flex align-items-center" to="/login">
        <span class="material-icons mr-1">arrow_back</span>
        <small>Back to login</small></NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      phoneInvalid: false,
    };
  },
  computed: {
    invalid() {
      return this.phoneInvalid ? "is-invalid" : "";
    },
  },
  methods: {
    onfocus() {
      this.phoneInvalid = false;
    },
    async onclick() {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await this.$axios.post(
          "/qa/v1/public/verificationCode/VERIFICATION_TYPE_FORGOT",
          {
            phoneNumber: `+92${this.phone}`,
            roleConstant: "ROLE_CUSTOMER",
          },
          config
        );
        if (res.status == 200) {
          let verifiedData = {
            phone: `+92${this.phone}`,
            code: res.data.data.code,
          };
          this.$emit("phoneVerified", verifiedData);
        }
      } catch (err) {
        this.phoneInvalid = true;
        console.log(err);
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
