export const namespaced = false;

export const state = () => ({
  users: [],
})

export const getters = {
  getUserById: (state) => (id) => {
    return state.users.find(user => user.id === id);
  },
}

export const actions = {
  fetchUsers(state) { },
}

export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
}