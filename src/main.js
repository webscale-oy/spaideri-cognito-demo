import Vue from 'vue'
import VueRouter from 'vue-router'
import 'aws-sdk';
import 'amazon-cognito-identity-js';

import App from './App.vue'
import store from './store';
import './user/user.service';

import './components'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [

  ]
})

const smartMap = {}
smartMap.app = new Vue({
  router,
  store,
  el: '#cognito-demo-app',
  render: h => h(App)
})
