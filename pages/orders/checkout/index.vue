<template>
	<div class="container py-md-5">
		<div class="d-none d-md-block">
			<b-breadcrumb>
				<b-breadcrumb-item to="/">
					<span class="d-flex align-items-center">
						<small class="material-icons icon-home mr-1">home</small>
						Home
					</span>
				</b-breadcrumb-item>
				<b-breadcrumb-item to="/orders">Orders</b-breadcrumb-item>
				<b-breadcrumb-item to="/checkout" active>Checkout</b-breadcrumb-item>
			</b-breadcrumb>
		</div>
		<h1>Checkout</h1>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="sass" scoped></style>
