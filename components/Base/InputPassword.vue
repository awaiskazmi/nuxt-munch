<template>
  <div :class="'m-input ' + classes">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :class="'m-input-field form-control ' + variant + ' ' + classList"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <button
      @click.prevent="onclick"
      class="m-btn m-btn-icon m-btn-icon-append m-btn-toggle material-icons"
    >
      {{ visibility }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    placeholder: {
      type: String,
      default: "",
    },
    variant: String,
    classList: String,
    value: String,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    type() {
      return this.isVisible ? "text" : "password";
    },
    visibility() {
      return this.isVisible ? "visibility" : "visibility_off";
    },
    classes() {
      let classArr = ["append"];
      classArr.push(this.variant);
      return classArr.join(" ");
    },
  },
  methods: {
    onclick() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style lang="css" scoped></style>
