<template>
	<div @click="onclick" class="m-dropdown-suggestion">
		{{ label }}
	</div>
</template>

<script>
export default {
	props: ["id", "label"],
	data() {
		return {};
	},
	methods: {
		onclick() {
			localStorage.setItem("m_location_name", this.label);
			localStorage.setItem("m_location_id", this.id);
			this.$store.commit("setUserLocation", this.label);
			this.$emit("select", this.label);
		},
	},
};
</script>

<style></style>
