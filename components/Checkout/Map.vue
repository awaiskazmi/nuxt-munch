<template>
  <div
    :key="key"
    id="google-map"
    class="bg-light p-5 d-flex align-items-center justify-content-center"
  ></div>
</template>

<script>
import { mapState } from "vuex";
import mapStyles from "~/static/mapstyles.json";
import markerOrder from "~/assets/images/marker-order.svg";

let apiKey = process.env.GOOGLE_PLACES_API;
let map, marker;

export default {
  data() {
    return {
      key: 0,
    };
  },
  computed: {
    ...mapState({
      location: (state) => state.locationObj,
    }),
    center() {
      return {
        lat: this.location.lat,
        lng: this.location.lng,
      };
    },
  },
  watch: {
    center(value) {
      map.setCenter(value);
      marker.setPosition(value);
    },
  },
  mounted() {
    // if (!process.server) {
    if (typeof google === "undefined") {
      const script = document.createElement("script");
      script.onload = this.onScriptLoaded;
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?
      key=${apiKey}&libraries=places`;
      document.head.appendChild(script);
    } else {
      this.generateMap();
    }
    // }
  },
  methods: {
    generateMap(event = null) {
      // The map, centered at user location
      map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 16,
        center: this.center,
        styles: mapStyles,
        mapTypeControl: false,
        disableDefaultUI: true,
        streetViewControl: false,
      });
      marker = new google.maps.Marker({
        position: this.center,
        icon: markerOrder,
        map: map,
      });
    },
    onMapUpdate() {
      let latLng = {
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
      };
      this.$store.commit("serUserLatLng", latLng);
      this.$reverseGeoCode(latLng);
      this.$emit("update", this.location);
    },
  },
};
</script>

<style lang="sass">
#google-map
  height: 100vh
  @media(max-width: 768px)
    height: 320px
.marker
  background-image: url('./assets/images/marker-order.svg')
</style>
