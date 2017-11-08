import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './user/user.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friend: userStore,
  }
})
