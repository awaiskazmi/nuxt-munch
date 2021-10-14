export const namespaced = false;

export const state = () => ({
  products: [],
});

export const getters = {
  getProductQuantityById: (state) => (id) => {
    // let productIndex = state.products.findIndex((obj) => obj.id == id);
    return state.products.find((product) => product.id === id).quantity;
  },
  getAllProducts: (state) => () => {
    return state.products;
  },
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
  // getAddedProducts: (state) => {
  //   return state.products.find((product) => product.quantity > 0).length;
  // }
};

export const actions = {
  async nuxtServerInit({ rootState, commit }, { req }) {
    // get all products
    const res = await this.$axios.get(
      "/qa/v2/public/hub-product/all?serviceAreaId=16"
    );

    // get hot damn products
    const resHd = await this.$axios.get(
      "/qa/v2/public/hub-product/hot-damn?serviceAreaId=16"
    );

    // get exclusive products
    const resX = await this.$axios.get(
      "/qa/v2/public/hub-product/exclusive?serviceAreaId=16"
    );

    // filter and merge all products
    let pAll = res.data.data,
      pHd = resHd.data.data,
      pX = resX.data.data,
      pF;

    // loop through all products
    pF = pAll.map((product) => {
      // set initial quantity to 0
      product.quantity = 0;
      // set hot damn tag identifier
      if (pHd.some((e) => e.id == product.id)) {
        product.tag = "HOT_DAMN";
      }
      // set exclusive tag identifier
      if (pX.some((e) => e.id == product.id)) {
        product.tag = "EXCLUSIVE";
      }
      return product;
    });

    commit("setProducts", pF);
  },
  async setProductQuantityAction({ commit }, payload) {
    commit("setProductQuantity", payload);
  },
};

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setProductQuantity(state, product) {
    let productIndex = state.products.findIndex((obj) => obj.id == product.id);
    state.products[productIndex].quantity = product.quantity;
  },
};
