export default ({ app, route }, inject) => {
  // GLOBAL METHODS




  // WATCH ROUTER CHANGES AND CHECK SERVICE AREA
  // app.router.afterEach((to, from) => {
  //   if (to.name == 'coming-soon') {
  //   } else {
  //   }
  // });




  // GET RANDOM STRING
  inject('mRandomString', (length) => {
    return [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
  })

  // VERIFICATION TYPES
  const verificationTypes = {
    forgot: "VERIFICATION_TYPE_FORGOT",
    signup: "VERIFICATION_TYPE_SIGNUP",
    verify: "VERIFICATION_TYPE_SIGNUP",
    checkout: "VERIFICATION_TYPE_SIGNUP",
  };
  inject("verificationTypes", verificationTypes);

  // SET LOCATION
  inject("setLocation", (location) => {
    localStorage.setItem("m_location_name", location);
    app.store.commit("setUserLocation", location);
  });

  // MATCH PRODUCTS WITH CART AND UPDATE QUANTITY
  inject("syncProductsWithCart", (products) => {
    let cart = app.store.state.products.products;
    products = products.map((p) => {
      let foundIndex = cart.findIndex((element) => element.id === p.id);
      if (foundIndex > -1) {
        return { ...p, quantity: cart[foundIndex].quantity };
      } else {
        return p;
      }
    });
    return products;
  });

  // MATCH SINGLE PRODUCT WITH CART AND UPDATE QUANTITY
  inject("syncProductWithCart", (product) => {
    let cart = app.store.state.products.products;
    let foundIndex = cart.findIndex((element) => element.id === product.id);
    if (foundIndex > -1) {
      return { ...product, quantity: cart[foundIndex].quantity };
    } else {
      return product;
    }
  });

  // REVERSE GEOCODE LAT LNG TO GET LOCATION NAME AND SERVICE AREA
  inject("reverseGeoCode", (latLng) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }).then((res) => {
      let locationObject = {
        ...latLng,
        address: res.results[0].formatted_address,
      };
      // Update location label globally
      app.$setLocation(res.results[0].formatted_address);
      // Get new service area
      app.store.dispatch("getServiceArea", locationObject);
    });
  });

  // UPDATE CART IN LOCAL STORAGE
  inject("cartLocalStorage", () => {
    localStorage.setItem(
      "m_cart",
      JSON.stringify(app.store.state.products.products)
    );
  });

  // get logged in user data
  if (process.client) {
    // set logged in userdata
    const localStorageUser = localStorage.getItem("m_user");
    if (localStorageUser) {
      app.store.commit("setUserObject", JSON.parse(localStorageUser));
      app.store.commit("setAuth", true);
    }
    // set logged in user token
    const localStorageToken = localStorage.getItem("m_token");
    if (localStorageToken) {
      app.store.commit("setAuthToken", localStorageToken);
    }
    // set logged in user location
    const localStorageLocation = localStorage.getItem("m_location");
    if (localStorageLocation) {
      app.store.commit(
        "setUserLocationObject",
        JSON.parse(localStorageLocation)
      );
    }
    // set logged in user locationname
    const localStorageLocationName = localStorage.getItem("m_location_name");
    if (localStorageLocationName) {
      app.store.commit("setUserLocation", localStorageLocationName);
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
    // set recent searches if present
    const localStorageSearches = localStorage.getItem("m_recentSearches");
    if (localStorageSearches) {
      app.store.commit("setRecentSearches", JSON.parse(localStorageSearches));
    }
    // set cart if present
    const localStorageCart = localStorage.getItem("m_cart");
    if (localStorageCart) {
      app.store.commit("setProducts", JSON.parse(localStorageCart));
    }
    // set verification phone if present
    const localStorageVPhone = localStorage.getItem("m_verificationPhone");
    if (localStorageVPhone) {
      app.store.commit("setVerificationPhone", localStorageVPhone);
    }
  }

  // ?hubTypes=INTERNAL&role=ROLE_CUSTOMER&sortProperties=productCategory.sequenceNumber&status=ACTIVE

  // get all categories
  if (process.client) {
    let locationObj = app.store.state.locationObj;
    console.log('...location already set...', locationObj);
    app.store.dispatch("gerServiceAreaCategories", locationObj.service_area);
    return;
    if (Object.keys(locationObj).length != 0) {
      app.$axios
        .get(
          // `/qa/v2/public/hub-product-category/all?hubTypes=INTERNAL&role=ROLE_CUSTOMER&serviceAreaId=${locationObj.service_area}&sortProperties=productCategory.sequenceNumber&status=ACTIVE`
          `/qa/v1/public/categories?serviceAreaId=${locationObj.service_area}&activeStatus=ACTIVE`
        )
        .then((res) => {
          app.store.commit("setCategories", res.data.data);
        });
    }
  }
};
