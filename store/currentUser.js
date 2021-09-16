export const namespaced = false;

export const state = () => ({
  user: {},
});

export const getters = {
  // getUserById: (state) => (id) => {
  //   return state.users.find(user => user.id === id);
  // },
};

export const actions = {
  // loginUser()
  // fetchUsers(state) { },
};

export const mutations = {
  setCurrentUser(state, user) {
    state.user = user;
  },
};
