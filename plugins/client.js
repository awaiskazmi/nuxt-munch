export default ({ app }, inject) => {
  // GLOBAL METHODS

  // TEST METHOD
  inject("mLogin", (userObject) => {
    console.log("...GLOBAL METHOD...", userObject);
  });
  // SET LOCATION
  inject("setLocation", (location) => {
    localStorage.setItem("m_location_name", location);
    app.store.commit("setUserLocation", location);
  });

  // get logged in user data
  if (process.client) {
    // set logged in userdata
    const localStorageUser = localStorage.getItem("m_user");
    if (localStorageUser) {
      app.store.commit("setCurrentUser", JSON.parse(localStorageUser));
      app.store.commit("setAuth", true);
    }
    // set logged in user token
    const localStorageToken = localStorage.getItem("m_token");
    if (localStorageToken) {
      app.store.commit("setAuthToken", localStorageToken);
    }
    // set logged in user location
    const localStorageLocation = localStorage.getItem("m_location_name");
    if (localStorageLocation) {
      app.store.commit("setUserLocation", localStorageLocation);
    }
    // set logged in user location coordinates
    const localStorageLatLng = localStorage.getItem("m_latlng");
    if (localStorageLatLng) {
      app.store.commit("serUserLatLng", JSON.parse(localStorageLatLng));
    }
    // set loggin in user service area
    const localStorageServiceArea = localStorage.getItem("m_serviceArea");
    if (localStorageServiceArea) {
      app.store.commit("setServiceArea", localStorageServiceArea);
    }
    // set shopping cart if present
    const localStorageShoppingCart = localStorage.getItem("m_shoppingCart");
    if (localStorageShoppingCart) {
      app.store.commit("setShoppingCart", JSON.parse(localStorageShoppingCart));
    }
  }

  // users
  app.$axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
    app.store.commit("setUsers", res.data);
  });

  // posts
  app
    .$axios({
      method: "get",
      url: "/test/posts/",
    })
    .then((res) => {
      app.store.commit("setPosts", res.data);
    });

  // categories
  // app.$axios({
  //   method: "get",
  //   url: `/qa/v2/public/hub-product-category/all`,
  // }).then((res) => {
  //   app.store.commit("setCategories", res.data.data);
  // });
};
