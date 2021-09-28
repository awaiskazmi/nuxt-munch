<template>
  <div :class="'m-input ' + classes">
    <span v-if="prepend" class="m-btn-icon m-btn-icon-prepend material-icons">{{
      prepend
    }}</span>
    <span v-if="prependText" class="m-btn-icon m-btn-icon-prepend-text">{{
      prependText
    }}</span>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :class="'m-input-field form-control ' + variant"
      :readonly="readonly"
      :required="required"
      :value="value"
      :maxlength="maxLength"
      :minlength="minLength"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
      @keyup="$emit('keyup')"
      @keydown="$emit('keydown')"
      @krypress="$emit('krypress')"
    />
    <span v-if="append" class="m-btn-icon m-btn-icon-append material-icons">{{
      append
    }}</span>
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
    type: {
      type: String,
      default: "text",
    },
    prepend: String,
    append: String,
    prependText: String,
    variant: {
      type: String,
      default: "md",
    },
    readonly: Boolean,
    required: Boolean,
    maxLength: String,
    minLength: String,
    value: String,
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      let classArr = [];
      classArr.push(this.variant);
      if (this.prepend) classArr.push("prepend");
      if (this.prependText) classArr.push("prepend-text");
      if (this.append) classArr.push("append");
      return classArr.join(" ");
    },
  },
};
</script>

<style lang="css" scoped></style>
