export const state = () => ({
  auth: false,
  token: "",
  cart: 0,
  locationObj: {},
  location: "",
  latLng: {},
  serviceArea: 16,
  globalSearchQuery: "",
  recentSearches: [],
  shoppingCart: [],
  recentSearches: [],
});

export const getters = {
  getglobalSearchQuery: (state) => {
    return state.globalSearchQuery;
  },
  getRecentSearches: (state) => {
    return state.recentSearches;
  },
  getLatLng: (state) => {
    return {
      lat: state.locationObj.lat,
      lng: state.locationObj.lng,
    };
  },
};

export const actions = {
  async getServiceArea({ commit, state }, payload) {
    let formData = new FormData();
    let currentServiceArea = state.serviceArea;

    formData.append("coordinates[lat]", payload.lat);
    formData.append("coordinates[lng]", payload.lng);
    formData.append("address", payload.address);

    const res = await this.$axios({
      mode: "cors",
      method: "post",
      url: "/api/check-customer-location",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("SERVICE AREA", res.data[0]);

    localStorage.setItem(
      "m_location",
      JSON.stringify({ ...payload, service_area: res.data[0].id })
    );
    commit("setUserLocationObject", {
      ...payload,
      service_area: res.data[0].id,
    });
    commit("setServiceArea", res.data[0].id);
  },
  async setRecentSearches({ commit }, query) {
    commit("setRecentSearch", query);
    localStorage.setItem(
      "m_recentSearches",
      JSON.stringify(this.state.recentSearches)
    );
  },
};

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setAuthToken(state, token) {
    state.token = token;
  },
  setUserLocation(state, location) {
    state.location = location;
  },
  setUserLocationObject(state, locationObj) {
    state.locationObj = locationObj;
  },
  serUserLatLng(state, latlng) {
    state.latLng = latlng;
    state.locationObj.lat = latlng.lat;
    state.locationObj.lng = latlng.lng;
  },
  setServiceArea(state, id) {
    state.serviceArea = id;
  },
  setglobalSearchQuery(state, query) {
    state.globalSearchQuery = query;
  },
  setShoppingCart(state, cart) {
    state.shoppingCart = cart;
  },
  removeRecentSearch(state, query) {
    state.recentSearches.splice(
      state.recentSearches.findIndex((s) => s == query),
      1
    );
    localStorage.setItem(
      "m_recentSearches",
      JSON.stringify(this.state.recentSearches)
    );
  },
  addProductToCart(state, product) {
    // check if product already added
    const isPresent = (e) => e.id === product.id;
    const index = state.shoppingCart.findIndex(isPresent);
    if (index >= 0) {
      state.shoppingCart[index].quantity = product.quantity;
    } else {
      state.shoppingCart.push(product);
    }
  },
  setRecentSearch(state, query) {
    let check = state.recentSearches.indexOf(query);
    state.recentSearches.indexOf(query) < 0
      ? state.recentSearches.push(query)
      : null;
  },
  setRecentSearches(state, payload) {
    state.recentSearches = payload;
  },
};
