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
import { mapActions } from "vuex";

export default {
	data() {
		return {};
	},
	methods: {
		...mapActions(["getServiceArea"]),
		getGeoLocation() {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let latLng = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					localStorage.setItem("m_latlng", JSON.stringify(latLng));
					this.$reverseGeoCode(latLng);
					this.$root.$emit("bv::toggle::collapse", "sidebar-location");
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
