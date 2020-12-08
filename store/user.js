import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export const plugins = [vuexLocal.plugin]
export const state = () => ({
  token: null,
  username: null
})

export const mutations = {
  setUser(state, { token, username }) {
    if (token !== undefined) {
      state.token = token
    }
    if (username !== undefined) {
      state.username = username
    }
  },
  clearUser(state) {
    state.token = null
    state.username = null
  }
}
