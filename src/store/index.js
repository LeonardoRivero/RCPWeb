import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showConfirm: false
  },
  mutations: {
    handleConfirm(state, show) {
      state.showConfirm = show;
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
