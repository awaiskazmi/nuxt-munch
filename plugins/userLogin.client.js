export default ({ app }, inject) => {
  // LOGIN USER
  inject('loginUser', ({ email, password, ref }) => {
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

      if (data.access_token) {
        localStorage.setItem("m_token", data.access_token);
        localStorage.setItem("m_user", JSON.stringify(data));
        app.store.commit("setUserObject", data);
        app.store.commit("setAuth", true);
        app.store.commit("setAuthToken", data.access_token);
        if (ref) {
          app.router.push({ name: ref })
        } else {
          // window.location.replace("/");
          app.router.push('/');
        }
      }
    }).catch(err => console.log(err));
  })
};