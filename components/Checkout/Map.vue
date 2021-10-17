<template>
  <div
    id="google-map"
    class="bg-light p-5 d-flex align-items-center justify-content-center"
  ></div>
</template>

<script>
import { mapState } from "vuex";
import mapStyles from "~/static/mapstyles.json";
import markerOrder from "~/assets/images/marker-order.svg";

let apiKey = process.env.GOOGLE_PLACES_API;
let map;

export default {
  data() {
    return {};
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
      this.onScriptLoaded();
    }
    // }
  },
  methods: {
    onScriptLoaded(event = null) {
      const uluru = this.center;
      // The map, centered at Uluru
      this.map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 16,
        center: uluru,
        styles: mapStyles,
        mapTypeControl: false,
        disableDefaultUI: true,
        streetViewControl: false,
      });
      const mapDiv = this.map.getDiv();
      const markerDiv = document.createElement("div");
      markerDiv.className = "marker";
      mapDiv.prepend(markerDiv);
      // MAP EVENTS
      google.maps.event.addListener(this.map, "dragend", this.onMapUpdate);
      google.maps.event.addListener(this.map, "zoom_changed", this.onMapUpdate);
      // let latLng = {
      //   lat: this.map.getCenter().lat(),
      //   lng: this.map.getCenter().lng(),
      // };
      // this.$store.commit("serUserLatLng", latLng);
      // this.$reverseGeoCode(latLng);
      // this.$emit("update", this.location);
      // });
      // The marker, positioned at Uluru
      // const marker = new google.maps.Marker({
      //   position: uluru,
      //   icon: markerOrder,
      //   map: map,
      // });
    },
    onMapUpdate() {
      let latLng = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
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
