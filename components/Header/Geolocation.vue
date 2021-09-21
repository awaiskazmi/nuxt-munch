<template>
	<BaseButton
		@click="getGeoLocation"
		isButton
		type="outline-secondary"
		full
		icon="my_location"
		>Use Current Location</BaseButton
	>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		getGeoLocation() {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position.coords.latitude);
					console.log(position.coords.longitude);
				},
				(error) => {
					console.log(error.message);
				}
			);
		},
	},
};
</script>

<style lang="css" scoped></style>
