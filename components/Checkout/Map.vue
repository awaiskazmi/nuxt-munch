<template>
  <div
    id="google-map"
    class="bg-light p-5 d-flex align-items-center justify-content-center h-100"
  ></div>
</template>

<script>
import mapStyles from "~/static/mapstyles.json";
import markerOrder from "~/assets/images/marker-order.svg";

let apiKey = process.env.GOOGLE_PLACES_API;

export default {
  data() {
    return {
      center: {
        lat: 31.464,
        lng: 74.387,
      },
    };
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
      const uluru = { lat: this.center.lat, lng: this.center.lng };
      // The map, centered at Uluru
      const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 16,
        center: uluru,
        styles: mapStyles,
        mapTypeControl: false,
        disableDefaultUI: true,
        streetViewControl: false,
      });
      const mapDiv = map.getDiv();
      const markerDiv = document.createElement("div");
      markerDiv.className = "marker";
      mapDiv.prepend(markerDiv);
      // MAP EVENTS
      google.maps.event.addListener(map, "center_changed", () => {
        this.center.lat = map.getCenter().lat();
        this.center.lng = map.getCenter().lng();
      });
      this.$emit("update", this.center);
      // The marker, positioned at Uluru
      // const marker = new google.maps.Marker({
      //   position: uluru,
      //   icon: markerOrder,
      //   map: map,
      // });
    },
  },
};
</script>

<style lang="sass">
.marker
  background-image: url('./assets/images/marker-order.svg')
</style>
