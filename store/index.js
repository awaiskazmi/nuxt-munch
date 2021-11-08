export const state = () => ({
  auth: false,
  cart: 0,
  serviceArea: null,
  hubId: null,
  token: "",
  location: "",
  globalSearchQuery: "",
  user: {},
  latLng: {},
  locationObj: {},
  shoppingCart: [],
  recentSearches: [],
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
  async getServiceArea({ commit, state, dispatch }, payload) {
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

    // if service area not found
    if (res.data.length == 0) {
      console.log(payload.address);
      commit("setHubId", null);
      commit("setCategories", {});
      commit("setServiceArea", null);
      commit("setUserLocation", null);
      commit("setUserLocationObject", {});
      localStorage.removeItem("m_hubId");
      localStorage.removeItem("m_latlng");
      localStorage.removeItem("m_location");
      localStorage.removeItem("m_serviceArea");
      localStorage.removeItem("m_location_name");
      this.$router.push(`/coming-soon?area=${payload.address}`);
    } else {
      console.log("...SERVICE AREA DETAILS...", res);
      newServiceArea = res.data[0].id;

      commit('updateProductsKey');

      let cartCount = state.products.products.length;
      console.log("CART COUNT ===", cartCount);

      // products in cart but location changed, reset cart
      if (cartCount > 0) {
        commit("resetCart");
      }

      // redirect to orders page
      let currentPage = this.$router.history.current.name;
      console.log('...CURRENT ROUTE...', currentPage);

      // if already at orders page, reload
      if (currentPage == 'orders') {
        this.$forceUpdate();
        // this.$router.go("/orders");
      } else { // if not, push
        this.$router.push("/orders");
      }

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

      // dispatch GET hubId action
      dispatch("getHubId", newServiceArea);

      // dispatch GET categories action
      dispatch("getHubCategories", newServiceArea);
    }
  },

  // GET HUB ID BY SERVICE AREA
  async getHubId({ commit, dispatch }, serviceAreaId) {
    // GET hubId from service area
    const hubData = await this.$axios({
      mode: "cors",
      method: "get",
      url: `/qa/v2/public/hub?serviceAreaId=${serviceAreaId}&hubTypes=INTERNAL`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // print hubData
    console.log("...HUB DATA...", hubData);

    // save hubId in store and localstorage
    commit("setHubId", hubData.data.data[0].id);
  },

  // GET CATEGORIES BY SERVICE AREA
  async getHubCategories({ commit, dispatch }, serviceAreaId) {
    // GET product categories based on service area
    const categoryData = await this.$axios({
      mode: "cors",
      method: "get",
      url: `/qa/v2/public/hub-product-category/all?descending=false&hubTypes=INTERNAL&role=ROLE_CUSTOMER&serviceAreaId=${serviceAreaId}&sortProperties=productCategory.sequenceNumber&status=ACTIVE`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // print categories
    console.log("...CATEGORIES...", categoryData);

    // update categories in store
    commit("setCategories", categoryData.data.data);
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
  async toast(
    { commit },
    { message, title, variant, position = "bottom-center", autoHide = false }
  ) {
    this._vm.$bvToast.toast(message, {
      title: title,
      variant: variant,
      toaster: "b-toaster-" + position,
      noAutoHide: autoHide,
      solid: true,
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
  setHubId(state, hubId) {
    state.hubId = hubId;
    localStorage.setItem("m_hubId", hubId);
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
    state.locationObj.locationName = address.locationName;
    state.locationObj.addressId = address.id;
    state.locationObj.additionalDetails = address.additionalDetails;
    localStorage.setItem("m_location", JSON.stringify(state.locationObj));
    localStorage.setItem("m_location_name", state.locationObj.locationName);
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
