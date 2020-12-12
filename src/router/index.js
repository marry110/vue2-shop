import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/pages/Register'

import registertwo from '@/components/pages/registertwo'

import registerthree from '@/components/pages/registerthree'

import ShoppingMall from '@/components/pages/ShoppingMall.vue'

import Loginone from '@/components/pages/Loginone.vue'
import Logintwo from '@/components/pages/Logintwo.vue'
import Loginthree from '@/components/pages/Loginthree.vue'


import Goods from '@/components/pages/Goods.vue'
import CategoryListone from '@/components/pages/CategoryListone.vue'

import Cart from '@/components/pages/Cart.vue'

import Main from '@/components/pages/Main.vue'


Vue.use(Router)

export default new Router({
  routes: [

    
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
       
        {
          path: '/CategoryListone',
          name: 'CategoryListone',
          component: CategoryListone
        },

        {
          path: '/Cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/Goods',
          name: 'Goods',
          component: Goods
        },
      ]
    },


    // {
    //   path: '/',
    //   name: 'ShoppingMall',
    //   component: ShoppingMall
    // },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/registertwo',
      name: 'registertwo',
      component: registertwo
    },
    {
      path: '/registerthree',
      name: 'registerthree',
      component: registerthree
    },
    {
      path: '/Loginone',
      name: 'Loginone',
      component: Loginone
    },
    {
      path: '/Logintwo',
      name: 'Logintwo',
      component: Logintwo
    },
    {
      path: '/Loginthree',
      name: 'Loginthree',
      component: Loginthree
    },
    // {
    //   path: '/Goods',
    //   name: 'Goods',
    //   component: Goods
    // },
    {
      path: '/CategoryListone',
      name: 'CategoryListone',
      component: CategoryListone
    },
    // {
    //   path: '/Cart',
    //   name: 'Cart',
    //   component: Cart
    // },

  ]
})
