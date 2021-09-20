<template>
	<Button @click="onClick" class="btn btn-primary" to="/logout">Logout</Button>
</template>

<script>
export default {
	methods: {
		onClick() {
			localStorage.removeItem("m_token");
			localStorage.removeItem("m_user");
			this.$store.commit("setCurrentUser", {});
			window.location.replace("/");
		},
	},
};
</script>

<style></style>
