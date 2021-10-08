<template>
  <nuxt-link
    :to="'/orders/' + name.replace(/ +/g, '-').toLowerCase()"
    class="category"
  >
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
    img
      transform: scale(1.05)

  .img-wrapper
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    height: 120px
    width: 120px
    padding: 18px
    background-color: #E3F5FB

  img
    transition: transform 0.2s cubic-bezier(1,0,0,1)
    max-width: 100%

  h5
    font-size: 1rem
    margin-bottom: 0
    margin-top: 1rem
    color: #000000

  @media(max-width: 768px)
    .img-wrapper
      height: 72px
      width: 72px
      padding: 11px
</style>
