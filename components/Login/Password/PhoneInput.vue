<template>
  <div>
    <label class="d-block text-left" for="">Phone Number</label>
    <input type="text" placeholder="+923211111111" class="form-control" />
    <NuxtLink to="/forgot-password/verify" class="btn btn-primary mt-4"
      >Reset Password</NuxtLink
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>