<template>
	<div class="container py-3 py-md-5">
		<div class="d-none d-md-block">
			<b-breadcrumb>
				<b-breadcrumb-item to="/">
					<span class="d-flex align-items-center">
						<small class="material-icons icon-home mr-1">home</small>
						Home
					</span>
				</b-breadcrumb-item>
				<b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
				<b-breadcrumb-item active>Hot Damn</b-breadcrumb-item>
			</b-breadcrumb>
		</div>
		<HotDamn title="Hot Damn" />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="css" scoped></style>
