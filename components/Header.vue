<template>
  <header>
    <NuxtLink class="navbar-brand" to="/">
      <img src="~/assets/images/logo.png" alt=""
    /></NuxtLink>
    <nav>
      <ul>
        <li>
          <NuxtLink class="btn btn-outline-primary" to="/login"
            >Sign in</NuxtLink
          >
        </li>
        <li>
          <NuxtLink class="btn btn-primary" to="/signup">Sign up</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
nav {
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    list-style-type: none;

    li {
      margin-left: 1rem;
    }
  }
}
</style>