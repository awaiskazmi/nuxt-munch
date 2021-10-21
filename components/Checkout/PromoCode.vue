<template>
  <div :id="id" class="mb-4">
    <b-card
      header-bg-variant="white"
      footer-bg-variant="white"
      :title="title"
      header-tag="header"
      footer-tag="footer"
    >
      <template #header>
        <div class="d-flex align-items-center justify-content-between">
          <h6 class="d-flex align-items-center mb-0">
            <span v-if="applied" class="material-icons text-success mr-1"
              >check_circle</span
            ><span>{{ code }}</span>
          </h6>
          <span>Expires: {{ expires }}</span>
        </div>
      </template>
      <b-card-text>{{ description }}</b-card-text>
      <template #footer>
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted">Terms and conditions apply</small>
          <BaseButton
            v-if="!applied"
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
  props: ["id", "code", "description", "start", "end", "status", "title"],
  data() {
    return {
      applied: false,
    };
  },
  computed: {
    expires() {
      let end = new Date(this.end);
      return `${end.getDay()}-${end.getMonth()}-${end.getFullYear()}`;
    },
  },
  methods: {
    onPromoSelect() {
      this.applied = true;
      this.$emit("select", this.code);
    },
  },
};
</script>

<style lang="sass" scoped>
.promo
</style>
