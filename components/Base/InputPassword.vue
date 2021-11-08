<template>
  <div :class="'m-input ' + classes">
    <input
      autocomplete="off"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :class="'m-input-field form-control ' + variant + ' ' + classList"
      :required="required"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
      @keypress="$emit('keypress', $event)"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
    />
    <span
      @click="onClick"
      class="m-btn m-btn-icon m-btn-icon-append m-btn-toggle material-icons"
    >
      {{ visibilityIcon }}
    </span>
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
    required: Boolean,
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
    visibilityIcon() {
      return this.isVisible ? "visibility" : "visibility_off";
    },
    classes() {
      let classArr = ["append"];
      classArr.push(this.variant);
      return classArr.join(" ");
    },
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style lang="css" scoped></style>
