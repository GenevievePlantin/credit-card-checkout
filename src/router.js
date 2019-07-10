import Vue from 'vue'
import Router from 'vue-router'
import Checkout from './views/Checkout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/checkout' },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    { path: '*', redirect: '/checkout' }
  ],
  mode: 'history'
})
