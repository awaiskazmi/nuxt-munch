<template>
	<b-sidebar
		id="sidebar-promo-code"
		width="460px"
		title="Sidebar"
		right
		backdrop
		shadow
		bg-variant="white"
		no-header
	>
		<template #default="{ hide }">
			<BaseButton isButton type="m-btn-action m-sidebar-close" @click="hide">
				<span class="material-icons">close</span>
			</BaseButton>
			<div class="pt-6 px-4">
				<p class="my-4 h2 font-weight-bold">Promo</p>
			</div>
			<div class="bg-light p-3">
				<p>Add promo code</p>
				<BaseInput prepend="local_offer" placeholder="PROMOCODE" />
			</div>
			<div class="promo-codes p-3">
				<CheckoutPromoCode
					v-for="p in promos"
					:key="p.id"
					:id="p.id"
					:code="p.code"
					:description="p.description"
					:start="p.effectiveFrom"
					:end="p.expiredOn"
					:status="p.status"
					:title="p.title"
					@select="onPromoCodeSelect"
				/>
			</div>
		</template>
	</b-sidebar>
</template>

<script>
export default {
	data() {
		return {
			promos: [],
		};
	},
	async created() {
		const res = await this.$axios.get(`/qa/v1/public/promo-codes/all`);
		this.promos = res.data.data;
	},
	methods: {
		onPromoCodeSelect(code) {
			this.$emit("select", code);
			this.$root.$emit("bv::toggle::collapse", "sidebar-promo-code");
		},
	},
};
</script>

<style lang="css" scoped>
.labels {
	display: flex;
}
</style>
