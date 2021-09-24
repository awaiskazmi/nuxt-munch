export const state = () => ({
  auth: false,
  token: "",
  cart: 0,
  location: "",
  latLng: {},
  serviceArea: -1,
});

// export const getters = {

// }

export const actions = {
  async getServiceArea({ commit }, payload) {
    console.log("PAYLOAD", payload);

    let formData = new FormData();
    // let coordinates = {
    //   lat: payload.lat,
    //   lng: payload.lng,
    // };

    formData.append("coordinates[lat]", payload.lat);
    formData.append("coordinates[lng]", payload.lng);
    formData.append("address", payload.address);

    // console.log("FORM DATA", JSON.stringify(coordinates));

    const res = await this.$axios({
      mode: "cors",
      method: "post",
      url: "/api/check-customer-location",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data[0].id);
    localStorage.setItem("m_serviceArea", res.data[0].id);
    commit("setServiceArea", res.data[0].id);
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
  serUserLatLng(state, latlng) {
    state.latLng = latlng;
  },
  setServiceArea(state, id) {
    state.serviceArea = id;
  },
};
