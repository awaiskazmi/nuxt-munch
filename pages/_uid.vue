<template> </template>

<script>
export default {
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID(
      "document.id",
      "YU29vBAAACgA1qjs"
    );

    if (document) {
      console.log(document);
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>

<style lang="css" scoped></style>
