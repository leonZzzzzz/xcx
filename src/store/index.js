import Vue from 'vue'
import Vuex from 'vuex'

import user from '@lemon/euler-app-h5/src/store/module/user'
import app from '@lemon/euler-app-h5/src/store/module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
