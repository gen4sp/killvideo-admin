import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import VuexPersist from 'vuex-persist'
// import products from './modules/products'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user
  },
  strict: debug,
  plugins: [vuexPersist.plugin]
})
