<template>
  <button>
    <span @click="$emit('click')">{{ label }}</span>
    <span @click="removeRecentSearch" class="material-icons">close</span>
  </button>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["label"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      recentSearches: (state) => state.recentSearches,
    }),
  },
  methods: {
    removeRecentSearch() {
      this.$store.commit("removeRecentSearch", this.label);
    },
  },
};
</script>

<style lang="sass" scoped>
button
	display: inline-flex
	align-items: center
	justify-content: center
	height: 32px
	padding: 0 16px
	background-color: #e3f5fb
	color: #315780
	text-transform: capitalize
	border-radius: 100px
	border: none
	margin-right: 1rem
	margin-bottom: 1rem

	@media(max-width: 768px)
		margin-right: 0.5rem
		margin-bottom: 0.5rem

.material-icons
	font-size: 18px
	margin-left: 8px
	margin-top: 2px
	&:hover
		transform: scale(1.2)
</style>
