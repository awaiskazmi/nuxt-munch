<template>
	<div :class="'m-input ' + classes">
		<span v-if="prepend" class="m-btn-icon m-btn-icon-prepend material-icons">{{
			prepend
		}}</span>
		<input
			:type="type"
			:placeholder="placeholder"
			class="m-input-field form-control"
		/>
		<span v-if="append" class="m-btn-icon m-btn-icon-append material-icons">{{
			append
		}}</span>
	</div>
</template>

<script>
export default {
	props: {
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
	},
	data() {
		return {};
	},
	computed: {
		classes() {
			let classArr = [];
			if (this.prepend) classArr.push("prepend");
			if (this.append) classArr.push("append");
			return classArr.join(" ");
		},
	},
};
</script>

<style lang="css" scoped></style>
