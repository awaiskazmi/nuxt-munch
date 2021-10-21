<template>
  <div class="p-2 p-lg-6 flex-grow-1">
    <h1>Sign up</h1>
    <p>Let's get you signed up to Munchies!</p>
    <form @submit.prevent="handleSubmit" class="mt-5" autocomplete="off">
      <input type="hidden" autocomplete="off" />
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Name</label>
            <BaseInput
              placeholder="Enter your name"
              variant="md"
              v-model="name"
            />
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Phone Number</label>
            <BaseInput
              prependText="+92"
              placeholder="1111111"
              variant="md"
              v-model="phone"
              maxLength="10"
              :class="phoneError ? 'is-invalid' : ''"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label>Email</label>
            <BaseInput
              placeholder="Enter your email"
              variant="md"
              type="email"
              v-model="email"
              :class="emailError ? 'is-invalid' : ''"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Password</label>
            <BaseInputPassword
              type="password"
              placeholder="Enter password"
              variant="md"
              v-model="password"
              :class="passwordError ? 'is-invalid' : ''"
            />
            <small class="form-text text-muted"
              >Lowercase, uppercase, and special characters e.g. ! @ # ?
              .</small
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label>Confirm password</label>
            <BaseInputPassword
              type="password"
              placeholder="Enter password"
              variant="md"
              v-model="repassword"
              :class="passwordError ? 'is-invalid' : ''"
            />
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <input
          type="submit"
          value="Sign up"
          class="btn btn-primary btn-block btn-lg"
        />
      </div>
      <div v-if="formInvalid" class="form-group my-4">
        <b-alert
          @dismissed="formInvalid = false"
          show
          dismissible
          variant="danger"
          >{{ errorMsg }}</b-alert
        >
      </div>
    </form>
    <div>
      <div class="hrh my-4">or sign up via</div>
    </div>
    <div class="form-group text-center">
      <p>
        Already have an account?
        <NuxtLink :to="`/login${refUrlSting}`">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: "half-form",
  data() {
    return {
      name: "Syed Asif",
      phone: "3349367227",
      email: "awais.kazmi+58@gmail.com",
      password: "Asif.123",
      repassword: "Asif.123",
      emailError: false,
      phoneError: false,
      passwordError: false,
      formInvalid: false,
      errorMsg: "",
    };
  },
  computed: {
    prePhone() {
      return `+92${this.phone}`;
    },
    userObject() {
      return {
        email: this.email,
        password: this.password,
      };
    },
    tokenPayload() {
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("phone", this.phone);
      formData.append("username", this.name);
      return formData;
    },
    refUrl() {
      return this.$route.query.ref;
    },
    refUrlSting() {
      return this.refUrl ? `?ref=${this.refUrl}` : "";
    },
  },
  methods: {
    handleSubmit() {
      // Reset all errors
      this.emailError = false;
      this.phoneError = false;
      this.passwordError = false;
      this.formInvalid = false;

      this.$axios({
        mode: "cors",
        method: "post",
        url: "/api/proceed-signup",
        data: this.tokenPayload,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(({ data }) => {
          console.log(data);
          let { code, message, autoLoginToken } = data;

          // FAILURE

          // Invalid Phone / Already Used
          if (code === 2106) {
            this.errorMsg = message;
            this.formInvalid = true;
            this.phoneError = true;
          }
          // Invalid Email / Already Used
          if (code === 2254) {
            this.errorMsg = message;
            this.formInvalid = true;
            this.emailError = true;
          }
          // Weak Password
          if (code === 2256) {
            this.errorMsg = message;
            this.formInvalid = true;
            this.passwordError = true;
          }

          // SUCCESS
          if (autoLoginToken) {
            this.sendOTP();
            this.$store.commit("setVerificationData", this.prePhone);
            this.$router.push("/signup/verify");
            // this.$loginUser(this.userObject);
          }
        })
        .catch((err) => console.log(err));
    },
    async sendOTP() {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const res = await this.$axios.post(
        "/qa/v1/public/verificationCode/VERIFICATION_TYPE_SIGNUP",
        {
          phoneNumber: this.prePhone,
          roleConstant: "ROLE_CUSTOMER",
        },
        config
      );
      console.log(res);
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>