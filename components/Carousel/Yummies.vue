<template>
	<div class="swiper swiper-yummies">
		<div id="swiper-yummies-prev" class="swiper-button-prev" slot="button-prev">
			<span class="material-icons">navigate_before</span>
		</div>
		<div id="swiper-yummies-next" class="swiper-button-next" slot="button-next">
			<span class="material-icons">navigate_next</span>
		</div>
		<div v-swiper:swiperYummies="options">
			<div class="swiper-wrapper">
				<div v-for="s in slides" class="swiper-slide yummy">
					<h5 class="font-weight-bold">Pie in the Sky</h5>
					<nuxt-link to="/">View yummies</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			slides: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
			options: {
				spaceBetween: 24,
				slidesPerView: 3,
				slidesPerGroup: 3,
				loop: false,
				navigation: {
					nextEl: "#swiper-yummies-next",
					prevEl: "#swiper-yummies-prev",
				},
				breakpoints: {
					769: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
				},
			},
		};
	},
};
</script>

<style lang="css" scoped>
.yummy {
	position: relative;
	aspect-ratio: 2/0.85;
	padding: 1.25rem;
	border-radius: 8px;
	background-color: #f4c7c8;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: transform 0.2s ease;
}
.yummy a {
	color: #000;
	text-decoration: underline;
	font-size: 14px;
}
.yummy a:after {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.yummy:hover {
	transform: scale(0.97);
}
</style>
