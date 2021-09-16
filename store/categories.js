export const namespaced = false;

export const state = () => ({
  categories: [],
})

export const getters = {
  getAllCategories: (state) => () => {
    return state.categories;
  },
  getCategoryById: (state) => (id) => {
    return state.categories.find(category => category.id === id);
  },
}

export const actions = {
  async nuxtServerInit({ rootState, commit }, { req }) {
    const res = await this.$axios.get('/qa/v2/public/hub-product-category/all');
    commit('setCategories', res.data.data)
  },
  fetchCategories(state) { },
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
}