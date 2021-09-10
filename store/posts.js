export const namespaced = false;

export const state = () => ({
  posts: [],
})

export const getters = {
  getPostById: (state) => (id) => {
    return state.posts.find(user => user.id === id);
  }
}

export const actions = {
  fetchPosts(state) { },
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
}