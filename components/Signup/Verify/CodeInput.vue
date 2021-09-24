<template>
  <div>
    <div class="input-grid">
      <input
        v-model="input1"
        id="1"
        @focus="onfocus"
        @click="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
        :class="invalid"
      />
      <input
        v-model="input2"
        id="2"
        @focus="onfocus"
        @click="onclick"
        @dblclick="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
        :class="invalid"
      />
      <input
        v-model="input3"
        id="3"
        @focus="onfocus"
        @click="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
        :class="invalid"
      />
      <input
        v-model="input4"
        id="4"
        @focus="onfocus"
        @click="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
        :class="invalid"
      />
    </div>
    <div v-if="otpInvalid" class="d-block invalid-feedback text-left">
      OTP does not match
    </div>
    <div class="row mt-4">
      <div class="col">
        <button class="btn btn-outline-primary btn-block">Resend Code</button>
      </div>
      <div class="col">
        <button @click="onverify" class="btn btn-primary btn-block">
          Verify
        </button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <button class="btn btn-link">
          Resend code in
          <span class="text-dark">00:54</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["otp", "phone"],
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      otpInvalid: false,
    };
  },
  computed: {
    userInput() {
      return `${this.input1}${this.input2}${this.input3}${this.input4}`;
    },
    invalid() {
      return this.otpInvalid ? "border-primary" : "";
    },
  },
  methods: {
    onfocus() {
      this.otpInvalid = false;
    },
    onclick(e) {
      e.target.select();
    },
    onkeyup(e) {
      let id = parseInt(e.target.id);
      let target = id + 1 > 4 ? 4 : id + 1;
      if (e.target.value.length >= 1) {
        document.getElementById(target).focus();
        return;
      }
    },
    async onverify() {
      if (this.userInput != this.otp) {
        this.otpInvalid = true;
      } else {
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await this.$axios.put(
            "/qa/v1/public/verificationCode/checking-code/VERIFICATION_TYPE_FORGOT",
            {
              code: this.userInput,
              phoneNumber: this.phone,
              roleConstant: "ROLE_CUSTOMER",
            },
            config
          );
          if (res.status == 200) {
            this.$emit("otpVerified", res.data.data.token);
          }
        } catch (err) {
          this.phoneInvalid = true;
          console.log(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.input-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.form-control {
  text-align: center;
}
</style>
