import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false
  },
  // getters: {
  //   DRAWER_STATE(state) {
  //     return state.drawer;
  //   }
  // },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    // TOGGLE_DRAWER({ commit }) {
    //   commit('toggleDrawer');
    // }
  },
  modules: {
  }
})
