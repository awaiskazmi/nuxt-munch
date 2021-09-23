<template>
  <div class="p-2 p-lg-6 align-self-center flex-grow-1">
    <h1>Enter new password</h1>
    <p>Let's setup your new password</p>
    <div class="form-group">
      <label for="">Password</label>
      <BaseInputPassword
        type="password"
        placeholder="Enter password"
        variant="lg"
      />
    </div>
    <div class="form-group">
      <label for="">Confirm Password</label>
      <BaseInputPassword
        type="password"
        placeholder="Re-enter password"
        variant="lg"
      />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block">Set Password</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "half-form",
};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>