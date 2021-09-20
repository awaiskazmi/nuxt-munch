export const state = () => ({
  auth: false,
  token: "",
  cart: 0,
  // location: "702, 7 Tariq Rd, Delhi CHS"
  location: ""
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
  }
};
