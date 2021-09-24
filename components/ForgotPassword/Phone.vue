<template>
  <div>
    <h1>Reset password</h1>
    <p>Enter your mobile number, and we'll send a code to confirm it.</p>
    <label class="d-block text-left" for="">Phone Number</label>
    <input
      @focus="onfocus"
      v-model="phone"
      type="text"
      placeholder="Example +923211111111"
      class="form-control"
      :class="invalid"
    />
    <div class="invalid-feedback text-left">Phone number doesn't exist</div>
    <Button @click="onclick" class="btn btn-primary mt-4"
      >Reset Password</Button
    >
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
            phoneNumber: this.phone,
            roleConstant: "ROLE_CUSTOMER",
          },
          config
        );
        if (res.status == 200) {
          let verifiedData = {
            phone: this.phone,
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
