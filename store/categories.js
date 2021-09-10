export const namespaced = false;

export const state = () => ({
  categories: [],
})

export const getters = {
  getAllCategories: (state) => () => {
    return state.categories;
  },
  getCategoryById: (state) => (id) => {
    return state.users.find(user => user.id === id);
  },
}

export const actions = {
  fetchCategories(state) { },
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
}