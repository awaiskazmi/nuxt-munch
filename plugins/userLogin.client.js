export default ({ app }, inject) => {
  // LOGIN USER
  inject('loginUser', ({ email, password, ref, refQuery = null }) => {
    // prepare payload
    let payload = new FormData();
    payload.append("email", email);
    payload.append("password", password);

    // send login request
    app.$axios({
      mode: "cors",
      method: "post",
      url: "/api/proceed-login",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(({ data }) => {
      console.log(data);
      if (data.code == 4001) {
        app.store.dispatch('toast', { title: 'Error loggin in', message: data.message, variant: 'danger' });
      }
      if (data.access_token) {
        localStorage.setItem("m_token", data.access_token);
        localStorage.setItem("m_user", JSON.stringify(data));
        app.store.commit("setUserObject", data);
        app.store.commit("setAuth", true);
        app.store.commit("setAuthToken", data.access_token);
        if (ref) {
          app.router.push({ name: ref, query: refQuery })
        } else {
          // window.location.replace("/");
          app.router.push('/orders');
        }
      }
    }).catch(err => {
      console.log('ERROR LOGGING IN', err);
    });
  })

  // LOGOUT IF ACCESS TOKEN INVALID CODE 4000
  inject('logoutOutSessionExpired', () => {
    console.log("...logging out...");
    localStorage.removeItem("m_token");
    localStorage.removeItem("m_user");
    app.store.commit("setUserObject", {});
    app.store.commit("setAuthToken", null);
    app.store.commit("setAuth", null);
    app.router.push('/login/');
    app.store.dispatch('toast', {
      title: 'Session expired',
      message: 'You need to login again!',
      variant: 'info',
    })
  })
};