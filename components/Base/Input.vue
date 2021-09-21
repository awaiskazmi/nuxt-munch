<template>
	<div :class="'m-input ' + classes">
		<span v-if="prepend" class="m-btn-icon m-btn-icon-prepend material-icons">{{
			prepend
		}}</span>
		<input
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:class="'m-input-field form-control ' + variant"
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
		variant: String,
	},
	data() {
		return {};
	},
	computed: {
		classes() {
			let classArr = [];
			classArr.push(this.variant);
			if (this.prepend) classArr.push("prepend");
			if (this.append) classArr.push("append");
			return classArr.join(" ");
		},
	},
};
</script>

<style lang="css" scoped></style>
