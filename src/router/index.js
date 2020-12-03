// import Vue from 'vue/dist/vue.esm.js'
import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Users from '../pages/Users.vue'
import Items from '../pages/Items.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        skipAuth: true,
        authorizedUserRedirect:'/'
      }
    },
    {
      path: '/logout',
      component: Login,
      meta: {
        skipAuth: true
      }
    },
    {
      path: '/',
      component: Home,
      redirect: '/users',
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/items',
          component: Items
        },
      ]
    },
    { path: '*', redirect: '/' },
    // {
    //   path: '*',
    //   component: {
    //     render(h) {
    //       return h('div', { staticClass: 'flex flex-main-center', attrs: { style: 'width:100%;font-size:32px' }}, 'Page not found')
    //     },
    //   },
    // },
  ]
})

router.beforeEach((to, from, next) => {

  const isLoggedIn = store.state.user && store.state.user.token
  console.log(isLoggedIn, store.state.user.user)
  if (to.path === '/login' && isLoggedIn) {
    return next({
      path: '/'
    })
  }
  // const restricted = _.some(to.matched, (m) => {
  //   return m.meta.roleOnly && m.meta.roleOnly !== store.getters.userRole
  // })
  // if (restricted) {
  //   next({
  //     path: '/login',
  //     query: {redirect: to.fullPath}
  //   })
  // }
  if (!to.meta.skipAuth) {
    if (!isLoggedIn) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
