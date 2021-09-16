export const state = () => ({
	auth: false,
	token: "",
});

// export const getters = {

// }

// export const actions = {

// }

export const mutations = {
	setAuth(state, auth) {
		state.auth = auth;
	},
	setAuthToken(state, token) {
		state.token = token;
	},
};
