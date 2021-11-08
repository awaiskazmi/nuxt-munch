export const namespaced = false;

export const state = () => ({
  products: [],
  productsKey: 0,
});

export const getters = {
  getProductQuantityById: (state) => (id) => {
    // let productIndex = state.products.findIndex((obj) => obj.id == id);
    return state.products.find((product) => product.productId === id).cartQuantity;
  },
  getAllProducts: (state) => () => {
    return state.products;
  },
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.productId === id);
  },
  getAddedProducts: (state) => {
    return state.products.filter((product) => product.cartQuantity > 0);
  },
};

export const actions = {
  // async nuxtServerInit({ rootState, commit }, { req }) {
  //   // get all products
  //   const res = await this.$axios.get(
  //     "/qa/v2/public/hub-product/all?serviceAreaId=16"
  //   );
  //   // get hot damn products
  //   const resHd = await this.$axios.get(
  //     "/qa/v2/public/hub-product/hot-damn?serviceAreaId=16"
  //   );
  //   // get exclusive products
  //   const resX = await this.$axios.get(
  //     "/qa/v2/public/hub-product/exclusive?serviceAreaId=16"
  //   );
  //   // filter and merge all products
  //   let pAll = res.data.data,
  //     pHd = resHd.data.data,
  //     pX = resX.data.data,
  //     pF;
  //   // loop through all products
  //   pF = pAll.map((product) => {
  //     // set initial quantity to 0
  //     product.quantity = 0;
  //     // set hot damn tag identifier
  //     if (pHd.some((e) => e.id == product.id)) {
  //       product.tag = "HOT_DAMN";
  //     }
  //     // set exclusive tag identifier
  //     if (pX.some((e) => e.id == product.id)) {
  //       product.tag = "EXCLUSIVE";
  //     }
  //     return product;
  //   });
  //   commit("setProducts", pF);
  // },
};

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  updateProductsKey(state) {
    state.productsKey = state.productsKey + 1;
  },
  addProducts(state, products) {
    products.forEach((p) => {
      state.products.push(p);
    });
  },
  resetCart(state) {
    state.products = [];
    localStorage.removeItem("m_cart");
  },
  removeProductFromCart(state, id) {
    console.log("REMOVING", id);
    state.products.splice(
      state.products.findIndex(function (i) {
        return i.productId === id;
      }),
      1
    );
    state.productsKey++;
  },
  setProductQuantity(state, product) {
    // see if already added
    let productIndex = state.products.findIndex((obj) => obj.productId == product.productId);
    // if already added, updated quantity
    if (productIndex > -1) {
      state.products[productIndex].cartQuantity = product.cartQuantity;
    } else { // otherwise add to cart
      state.products.push(product);
    }
    state.productsKey++;
  },
};
