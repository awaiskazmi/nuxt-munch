export default ({ app }, inject) => {
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
  }

  // users
  app.$axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
    app.store.commit("setUsers", res.data);
  })

  // posts
  app.$axios({
    method: 'get',
    url: '/test/posts/'
  }).then(res => {
    app.store.commit("setPosts", res.data);
  })

  // categories
  // app.$axios({
  //   method: "get",
  //   url: `/qa/v2/public/hub-product-category/all`,
  // }).then((res) => {
  //   app.store.commit("setCategories", res.data.data);
  // });
};
