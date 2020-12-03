import api from '../../api'
import Vue from 'vue'

const state = {
  user: null,
  token: null
}

// getters
const getters = {
  user: (state, getters, rootState) => {
    return _.pick(state, ['username', 'id'])
  },
  token: (state, getters, rootState) => {
    return state.token;
  },
  isLoggedIn: (state, getters, rootState) => {
    return (state.token && state.user && state.user.id) ? true : false;
  }
}

// actions
const actions = {
  login ({ commit, state }, token) {
    commit('saveToken', token)
    return api.auth.me()
      .then((data) => {
        return commit('saveUser', data)
      })
      .catch((err) => console.error)
  },
  refreshMe({ commit, state }, token) {
    return api.auth.me()
      .then((data) => {
        commit('saveUser', data)
      })
      .catch((err) => console.error)
  },
  logout({ commit, state }) {
    commit('clearUser')
    commit('clearToken')
  },
}

// mutations
const mutations = {
  saveUser (state, user) {
    Vue.set(state, 'user', user)
  },
  clearUser (state) {
    Vue.delete(state, 'user')
  },
  saveToken (state, token) {
    Vue.set(state, 'token', token)
  },
  clearToken (state, token) {
    Vue.set(state, 'token', null)
  },

  // incrementItemQuantity (state, { id }) {
  //   const cartItem = state.items.find(item => item.id === id)
  //   cartItem.quantity++
  // },
  //
  // setCartItems (state, { items }) {
  //   state.items = items
  // },
  //
  // setCheckoutStatus (state, status) {
  //   state.checkoutStatus = status
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
