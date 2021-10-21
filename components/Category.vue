<template>
  <nuxt-link :to="`/orders/${id}`" :id="id" class="category">
    <div class="img-wrapper img">
      <img
        :src="
          'https://munchies-qa.impact.venturedive.com/v2/public/resources/' +
          imageUrl
        "
        :alt="name"
      />
    </div>
    <h5>{{ name }}</h5>
  </nuxt-link>
</template>

<script>
export default {
  props: ["id", "name", "imageUrl"],
};
</script>

<style lang="sass" scoped>
.category
  margin-right: 1rem

  &:hover
    text-decoration: none

  .img-wrapper
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    height: 0
    width: 100%
    padding-bottom: 100%
    background-color: #eee
    position: relative

    img
      transition: transform 0.2s cubic-bezier(1,0,0,1)
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      height: 75%
      width: 75%
      object-fit: contain
      object-position: center

  h5
    font-size: 1rem
    margin-bottom: 0
    margin-top: 1rem
    color: #000000
</style>
