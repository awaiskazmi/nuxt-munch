export const state = () => ({
  auth: false,
  token: "",
  user: {},
  cart: 0,
  locationObj: {},
  location: "",
  latLng: {},
  serviceArea: -1,
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
  // GLOBAL GET SERVICE AREA ACTION
  async getServiceArea({ commit, state }, payload) {
    console.log("...FETCHING SERVICE AREA...");

    let formData = new FormData();
    let currentServiceArea = state.serviceArea;
    let cartCount = state.products.products.length;
    let newServiceArea = null;

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

    // service area not found
    if (res.data.length == 0) {
      console.log(payload.address);
      commit("setServiceArea", null);
      commit("setUserLocation", null);
      commit("setUserLocationObject", {});
      localStorage.removeItem('m_latlng');
      localStorage.removeItem('m_location');
      localStorage.removeItem('m_serviceArea');
      localStorage.removeItem('m_location_name');
      this.$router.push(`/coming-soon?area=${payload.address}`);
    } else {
      console.log("...SERVICE AREA DETAILS...", res);
      newServiceArea = res.data[0].id;

      // update service area in store
      commit("setServiceArea", newServiceArea);
      // update service area in localstorage
      localStorage.setItem(
        "m_location",
        JSON.stringify({ ...payload, service_area: newServiceArea })
      );
      // update location in store
      commit("setUserLocationObject", {
        ...payload,
        service_area: newServiceArea,
      });
    }
  },

  // GET CATEGORIES BY SERVICE AREA
  async gerServiceAreaCategories({ commit }, serviceAreaId) {
    const res = await this.$axios({
      mode: "cors",
      method: "get",
      url: `/qa/v1/public/categories?serviceAreaId=${serviceAreaId}&activeStatus=ACTIVE`,
    });
    console.log('SERVICE AREA CATEGORIES', res);
  },

  // SET RECENT SEARCHES
  async setRecentSearches({ commit }, query) {
    commit("setRecentSearch", query);
    localStorage.setItem(
      "m_recentSearches",
      JSON.stringify(this.state.recentSearches)
    );
  },

  // GENERATE TOAST
  async toast({ commit }, { message, title, variant }) {
    this._vm.$bvToast.toast(message, {
      title: title,
      variant: variant,
      toaster: 'b-toaster-bottom-center',
      solid: true,
      noAutoHide: true
    });
  },
};

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setAuthToken(state, token) {
    state.token = token;
  },
  setUserLabelOption(state, option) {
    state.locationObj.labelOption = option;
  },
  setUserLocation(state, location) {
    state.location = location;
    // state.locationObj.address = location;
  },
  setUserLocationAddress(state, address) {
    state.locationObj.details = address.details;
    state.locationObj.label = address.label;
    localStorage.setItem("m_location", JSON.stringify(state.locationObj));
    localStorage.setItem("m_location_name", state.locationObj.address);
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
    localStorage.setItem("m_serviceArea", id);
  },
  setglobalSearchQuery(state, query) {
    state.globalSearchQuery = query;
  },
  setShoppingCart(state, cart) {
    state.shoppingCart = cart;
  },
  setUserObject(state, user) {
    state.user = user;
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
