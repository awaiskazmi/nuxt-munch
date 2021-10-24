<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <label class="d-block text-left" for="">Phone Number</label>
    <BaseInput
      @focus="onfocus"
      placeholder="3001111222"
      variant="md"
      :prependText="pageRef == 'forgot' ? '+92' : ''"
      v-model="phone"
      maxLength="10"
      :class="invalid"
      :readonly="readonly"
    />
    <div class="invalid-feedback text-left">Phone number doesn't exist</div>
    <Button @click="onclick" class="btn btn-primary mt-4">Send OTP</Button>
  </div>
</template>

<script>
export default {
  props: ["title", "subtitle", "pageRef", "phoneValue"],
  data() {
    return {
      phone: this.phoneValue,
      readonly: this.pageRef == "forgot" ? false : true,
      phoneInvalid: false,
    };
  },
  computed: {
    invalid() {
      return this.phoneInvalid ? "is-invalid" : "";
    },
    prePhone() {
      return this.pageRef == "forgot" ? `+92${this.phone}` : this.phone;
    },
    verificationType() {
      return this.$verificationTypes[this.pageRef];
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
          `/qa/v1/public/verificationCode/${this.verificationType}`,
          {
            phoneNumber: this.prePhone,
            roleConstant: "ROLE_CUSTOMER",
          },
          config
        );
        if (res.status == 200) {
          let verifiedData = {
            phone: this.prePhone,
            code: res.data.data.code,
          };
          this.$emit("phoneVerified", verifiedData);
        }
      } catch (err) {
        this.phoneInvalid = true;
        console.log(err.response.data);
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
