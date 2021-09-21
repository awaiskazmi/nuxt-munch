<template>
	<div class="m-dropdown">
		<div class="m-input prepend">
			<span class="m-btn-icon m-btn-icon-prepend material-icons">search</span>
			<input
				@click="onclick"
				@keyup="onkeypress"
				v-model="location"
				type="text"
				placeholder="Search location"
				class="m-input-field form-control lg"
				ref="autocomplete"
			/>
		</div>
		<div v-show="showPredictions" class="m-dropdown-suggestions">
			<HeaderAutocompleteSuggestion @select="onselect" v-for="p of predictions"
				:key="p.place_id" :id="p.place_id" :label="p.description" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			location: "",
			timer: 0,
			showPredictions: false,
			predictions: [],
		};
	},
	methods: {
		onclick() {
			if (this.predictions) {
				this.showPredictions = true;
			} 
		},
		onselect(label) {
			this.location = label;
			this.showPredictions = false;
      this.$store.commit("setUserLocation", label);
		},
		onkeypress() {
			if (this.location.length < 3) {
				this.showPredictions = false;
				return;
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.getSearchResults(this.location);
			}, 700);
		},
		getSearchResults(query) {
			const service = new google.maps.places.AutocompleteService();
			service.getQueryPredictions({ input: query }, this.getSuggestions);
		},
		getSuggestions(predictions, stats) {
			this.predictions = predictions;
			this.showPredictions = true;
		},
	},
	mounted() {
		// console.log(this.$refs);
		// var defaultBounds = new google.maps.LatLngBounds(
		// 	new google.maps.LatLng(-33.8902, 151.1759),
		// 	new google.maps.LatLng(-33.8474, 151.2631)
		// );
		// var input = this.$refs.autocomplete;
		// var options = {
		// 	bounds: defaultBounds,
		// 	types: ["establishment"],
		// };
		// this.autocomplete = new google.maps.places.Autocomplete(input, options);
	},
};
</script>

<style></style>
