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
        maxlength="1"
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
        maxlength="1"
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
        maxlength="1"
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
        maxlength="1"
        :class="invalid"
      />
    </div>
    <div v-if="otpInvalid" class="d-block invalid-feedback text-left">
      OTP does not match
    </div>
    <div class="row mt-4">
      <div class="col">
        <button
          :disabled="interval > 0"
          @click="resendOtp"
          class="btn btn-outline-primary btn-block"
        >
          Resend code
        </button>
      </div>
      <div class="col">
        <button @click="onverify" class="btn btn-primary btn-block">
          Verify
        </button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <p v-show="interval > 0">
          Resend code in
          <span class="text-primary">00:{{ intervalString }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["otp", "phone", "verification"],
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      otpInvalid: false,
      enteredOtp: this.otp,
      interval: 3,
    };
  },
  computed: {
    userInput() {
      return `${this.input1}${this.input2}${this.input3}${this.input4}`;
    },
    invalid() {
      return this.otpInvalid ? "border-primary" : "";
    },
    intervalString() {
      return this.interval >= 10 ? this.interval : "0" + this.interval;
    },
  },
  mounted() {
    setInterval(() => {
      this.interval -= 1;
    }, 1000);
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
      if (e.target.value.length == 1) {
        document.getElementById(target).focus();
        document.getElementById(target).select();
        return;
      }
    },
    async resendOtp() {
      this.interval = 3;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await this.$axios.post(
          `/qa/v1/public/verificationCode/${this.verification}`,
          {
            phoneNumber: this.phone,
            roleConstant: "ROLE_CUSTOMER",
          },
          config
        );
        if (res.status == 200) {
          console.log("...code resent...");
          this.enteredOtp = res.data.data.code;
        }
      } catch (err) {
        console.log(err.response.data);
        this.$store.dispatch("toast", {
          title: "Limit exceeded!",
          message: err.response.data.message,
          variant: "danger",
        });
      }
    },
    async onverify() {
      if (this.userInput != this.enteredOtp) {
        this.otpInvalid = true;
      } else {
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        try {
          console.log(this.otp, this.userInput, this.phone);
          const res = await this.$axios.put(
            `/qa/v1/public/verificationCode/checking-code/${this.verification}`,
            {
              code: this.enteredOtp,
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
          this.$store.dispatch("toast", {
            title: "Error!",
            message: err.response.body.message,
            variant: "danger",
          });
          console.log(err.response);
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
