<template>
  <div class="m-dropdown">
    <div class="m-input prepend">
      <span class="m-btn-icon m-btn-icon-prepend material-icons">search</span>
      <!-- <input
				@click="onclick"
				@keyup="onkeypress"
				v-model="location"
				type="text"
				placeholder="Search location"
				class="m-input-field form-control lg"
				ref="autocomplete"
			/> -->
      <BaseInput
        @click="onclick"
        @keyup="onkeypress"
        type="text"
        variant="sm"
        prepend="search"
        v-model="location"
        placeholder="Search location"
      />
    </div>
    <!-- <div v-show="showPredictions" class="m-dropdown-suggestions">
			<HeaderAutocompleteSuggestion @select="onselect" v-for="p of predictions"
				:key="p.place_id" :id="p.place_id" :label="p.description" />
			</div>
		</div> -->
    <div v-show="showPredictions" class="mt-4 suggestions">
      <!-- <pre>{{ predictions }}</pre> -->
      <h4 class="font-weight-bold mb-4">Suggestions</h4>
      <div
        class="row no-gutters align-items-center suggestion cursor-pointer"
        v-for="p of predictions"
        :key="p.place_id"
        @click="onselect(p.description)"
      >
        <div class="col-auto mr-3">
          <img src="~/assets/images/icon-location.svg" height="24" />
        </div>
        <div class="col">
          <h6 class="font-weight-bold">
            {{ p.structured_formatting.main_text }}
          </h6>
          <p class="text-muted m-0">{{ p.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      location: "",
      timer: 0,
      showPredictions: false,
      predictions: [],
    };
  },
  computed: {
    // location() {
    // return this.$store.state.location;
    // }
  },
  methods: {
    ...mapActions(["getServiceArea"]),
    onclick() {
      if (this.predictions) {
        this.showPredictions = true;
      }
    },
    onselect(label) {
      console.log(label);
      this.location = label;
      this.showPredictions = false;
      this.$store.commit("setUserLocation", label);
      this.getLatLng(this.location);
      this.$setLocation(label);
      this.predictions = [];
      this.$emit("onselect");
    },
    onkeypress() {
      if (this.location.length < 3) {
        this.showPredictions = false;
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getSearchResults(this.location);
      }, 50);
    },
    getSearchResults(query) {
      const service = new google.maps.places.AutocompleteService();
      // service.getQueryPredictions({ input: query }, this.getSuggestions);
      service.getPlacePredictions(
        {
          input: "Karachi, " + query,
          // types: ['(cities)'],
          componentRestrictions: { country: "pk" },
        },
        this.getSuggestions
      );
    },
    getSuggestions(predictions, stats) {
      this.predictions = predictions;
      this.showPredictions = true;
    },
    getLatLng(address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: address,
        },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let latLng = {};
            latLng.lat = results[0].geometry.location.lat();
            latLng.lng = results[0].geometry.location.lng();
            localStorage.setItem("m_latlng", JSON.stringify(latLng));
            this.$store.commit("serUserLatLng", latLng);

            // get service area payload
            let payload = {
              lat: latLng.lat,
              lng: latLng.lng,
              address: address,
            };
            this.$store.dispatch("getServiceArea", payload);
          }
        }
      );
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

<style scoped lang="sass">
.suggestions
  .suggestion
    padding: 1rem
    border-radius: 8px
    &:hover
      background-color: rgba(227,245,251,0.5)
    &:not(:last-child)::after
      content: ''
      display: none
      height: 1px
      width: 100%
      margin: 1rem 0
      background-color: #E0E0E0
</style>
