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
        <pre>{{ selected }}</pre>
      </b-card-text>
      <template #footer>
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted">Terms and conditions apply</small>
          <BaseButton
            :disabled="verifyingPromo || applied"
            isButton
            @click="onPromoSelect"
            type="outline-primary px-5"
            ><b-spinner v-show="verifyingPromo" class="mr-1" small></b-spinner
            ><span>{{ !applied ? "Apply" : "Applied" }}</span></BaseButton
          >
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["promocode", "invoice", "selected"],
  data() {
    return {
      verifyingPromo: false,
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
    async onPromoSelect() {
      this.verifyingPromo = true;

      let invoice = { ...this.invoice, promoCode: this.promocode.code };

      try {
        const invoiceResponse = await this.$axios({
          mode: "cors",
          method: "post",
          url: `/qa/v2/api/order/invoice`,
          data: invoice,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
        this.verifyingPromo = false;
        this.applied = true;
      } catch (err) {
        this.$store.dispatch("toast", {
          title: `Error ${err.response.data.code}`,
          message: err.response.data.message,
          variant: "danger",
        });
        this.verifyingPromo = false;
        this.applied = false;
      }

      return;
    },
  },
};
</script>

<style lang="sass" scoped>
.promo
</style>
