<template>
  <div :id="promocode.id" class="mb-4">
    <b-card
      header-bg-variant="white"
      footer-bg-variant="white"
      :title="promocode.title"
      header-tag="header"
      footer-tag="footer"
    >
      <template #header>
        <div class="d-flex align-items-center justify-content-between">
          <h6 class="d-flex align-items-center mb-0">
            <span v-if="applied" class="material-icons text-success mr-1"
              >check_circle</span
            ><span>{{ promocode.code }}</span>
          </h6>
          <span>Expires: {{ expires }}</span>
        </div>
      </template>
      <b-card-text>
        {{ promocode.description }}
        <pre>{{ promocode }}</pre>
      </b-card-text>
      <template #footer>
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted">Terms and conditions apply</small>
          <BaseButton
            :disabled="applied"
            isButton
            @click="onPromoSelect"
            type="outline-primary px-5"
            >Apply</BaseButton
          >
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["promocode"],
  data() {
    return {
      applied: false,
    };
  },
  computed: {
    expires() {
      let end = new Date(this.promocode.expiredOn);
      return `${end.getDate()}-${end.getMonth()}-${end.getFullYear()}`;
    },
  },
  methods: {
    onPromoSelect() {
      this.applied = true;
      this.$emit("select", this.promocode);
    },
  },
};
</script>

<style lang="sass" scoped>
.promo
</style>
