<template>
  <nuxt-link :to="'/category/' + id" class="category">
    <div class="img-wrapper img">
      <img
        :src="
          'https://munchies-qa.impact.venturedive.com/v2/public/resources/' +
          imageUrl
        "
        :alt="name"
      />
    </div>
    <h3>{{ name }}</h3>
  </nuxt-link>
</template>

<script>
export default {
  props: ["id", "name", "imageUrl"],
};
</script>

<style lang="sass">
.category
  display: block
  background-color: #fff
  padding: 16px
  border-radius: 4px
  border: 1px solid #ddd
  text-align: center
  color: #111
  transition: transform 0.2s cubic-bezier(1,0,0,1)

  &:hover
    text-decoration: none
    transform: scale(1.05)

  .img-wrapper
    height: 72px
    width: 72px
    margin: 0 auto
    padding: 10px
    border-radius: 100px
    background-color: rgba(255,0,0,0.1)

  img
    max-width: 100%

  h3
    font-size: 18px
    margin-bottom: 0
    margin-top: 1rem
</style>