// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'


import {Button,Col,Row,Lazyload,Swipe,SwipeItem,List,Field,NavBar,Tabs,Tab,Tabbar,TabbarItem, Loading,PullRefresh,Stepper} from 'vant';
Vue.config.productionTip = false
Vue
.use(Button)
.use(Col)
.use(Row)
.use(Lazyload)
.use(Swipe)
.use(SwipeItem)
.use(List)
.use(Field)
.use(NavBar)
.use(Loading)
.use(Tabs)
.use(Tabbar)
.use(TabbarItem)
.use(Tab)
.use(PullRefresh)
.use(Stepper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
