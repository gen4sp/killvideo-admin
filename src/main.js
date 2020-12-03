// import 'babel-polyfill'
import Vue from 'vue'
// import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'


import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
import '../static/styles/app.scss';
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
})
