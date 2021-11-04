<template>
  <div class="p-2 p-lg-6 flex-grow-1">
    <h1>Sign up</h1>
    <p>Let's get you signed up to Munchies!</p>
    <form autocomplete="off" @submit.prevent="handleSubmit" class="mt-5">
      <input type="hidden" autocomplete="off" />
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <label>Name</label>
            <BaseInput
              placeholder="Enter your name"
              variant="md"
              v-model="name"
              required
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
              required
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
              required
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
              required
              :class="passwordError ? 'is-invalid' : ''"
            />
            <small class="form-text text-muted"
              >Password must contain lowercase, uppercase, and special
              characters e.g. ! @ # ? .</small
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
              required
              :class="passwordError ? 'is-invalid' : ''"
            />
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <BaseButton
          :disabled="isAttemptingSignup"
          isButton
          isFormSubmit
          type="primary"
          variant="lg"
          full
          ><b-spinner v-show="isAttemptingSignup" class="mr-1" small></b-spinner
          ><span>Sign up</span></BaseButton
        >
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
import comingSoonVue from "../coming-soon.vue";
export default {
  layout: "half-form",
  data() {
    return {
      name: "Awais Kazmises",
      phone: "3333333333",
      email: "awais.kazmises@munchieshome.com",
      password: "Awais.123",
      repassword: "Awais.123",
      emailError: false,
      phoneError: false,
      passwordError: false,
      formInvalid: false,
      isAttemptingSignup: false,
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
        ref: "auth-verify-phone",
        refQuery: {
          ref: "signup",
        },
      };
    },
    tokenPayload() {
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("username", this.name);
      formData.append("password", this.password);
      formData.append("phone", this.phone);
      return formData;
    },
    refUrl() {
      return this.$route.query.ref;
    },
    refUrlSting() {
      return this.refUrl ? `?ref=${this.refUrl}` : "";
    },
    deviceId() {
      let id = this.$mRandomString(25);
      return id;
    },
  },
  methods: {
    handleSubmit() {
      // Reset all errors
      this.emailError = false;
      this.phoneError = false;
      this.passwordError = false;
      this.formInvalid = false;

      // diasble signup button
      this.isAttemptingSignup = true;

      let payload = new FormData();
      payload.append("email", this.email);
      payload.append("password", this.password);
      payload.append("phone", this.prePhone);
      payload.append("username", this.name);

      let userData = {
        email: this.email,
        name: this.name,
        password: this.password,
        phone: this.prePhone,
        localeCode: "en_us",
        roleConstant: "ROLE_CUSTOMER",
      };

      this.$axios({
        mode: "cors",
        method: "post",
        url: "/api/proceed-signup",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          // device_id: this.deviceId,
          // "Content-Type": "application/json",
        },
      })
        .then(({ data }) => {
          let { code, message, autoLoginToken } = data;

          // SUCCESS
          // auto login user and redirect to phone verification screen
          if (autoLoginToken) {
            this.$loginUser(this.userObject);
          }
          // FAILURE
          if (code == 2077) this.phoneError = true; // invalid number
          if (code == 2106) this.phoneError = true; // number already in use
          if (code == 2254) this.emailError = true; // email already in use
          if (code == 2256) this.passwordError = true; // weak password
          // show error message in toast
          this.$store.dispatch("toast", {
            title: "Error signing up!",
            message: message,
            variant: "danger",
          });
          // enable signup button
          this.isAttemptingSignup = false;
        })
        .catch((err) => this.processError(err));
    },
    processError(error) {
      // console.log("...I RAN...");
      // // process error codes
      // if (error.code == 2077) this.phoneError = true; // invalid number
      // if (error.code == 2106) this.phoneError = true; // number already in use
      // if (error.code == 2254) this.emailError = true; // email already in use
      // if (error.code == 2256) this.passwordError = true; // weak password
      // // show error message in toast
      // this.$store.dispatch("toast", {
      //   title: "Error signing up!",
      //   message: error.message,
      //   variant: "danger",
      // });
      // // enable signup button
      // this.isAttemptingSignup = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>
