<template>
	<nav>
		<ul class="d-block d-md-flex align-items-center pt-3 pt-md-0">
			<li>
				<BaseButton url="/" type="link">Home</BaseButton>
			</li>
			<li>
				<BaseButton url="/about-us" type="link">About</BaseButton>
			</li>
			<li>
				<BaseButton url="/orders" type="link">Promos</BaseButton>
			</li>
			<li>
				<BaseButton url="/blog" type="link">Blog</BaseButton>
			</li>
			<li>
				<BaseButton url="/" type="link">Support</BaseButton>
			</li>
			<li>
				<BaseButton url="/" type="link">Team</BaseButton>
			</li>
			<li>
				<BaseButton url="/" type="link">Careers</BaseButton>
			</li>
			<li class="mt-5 mt-md-0">
				<BaseButton
					class="justify-content-center"
					url="/"
					type="primary"
					icon="face"
					>Start munching</BaseButton
				>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
nav {
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;

		li {
			margin-left: 1rem;

			a {
				justify-content: flex-start;
			}

			@media (max-width: 768px) {
				margin-left: 0;
			}
		}
	}
}
</style>
