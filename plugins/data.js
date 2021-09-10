export default ({ app }, inject) => {
  // users
  fetch('https://jsonplaceholder.typicode.com/users/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // call mutator in store to update users state
      app.store.commit('setUsers', data)
    })

  // posts
  fetch('https://awais-users.000webhostapp.com/api/posts/', {
    mode: 'cors',
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // call mutator in store to update users state
      app.store.commit('setPosts', data)
    })

  // categories
  fetch(`${app.$axios.defaults.baseURL}/v2/public/hub-product-category/all`, {
    mode: 'cors',
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.data)
      // call mutator in store to update categories state
      app.store.commit('setCategories', data.data)
    })
}