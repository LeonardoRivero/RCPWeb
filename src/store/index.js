import Vue from 'vue'
import Vuex from 'vuex'
//import snackbar from "@/modules/snackbarto.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // showConfirm: false,
    loading: { visible: false },
    snackbar: {
      visible: false,
      text: null,
      timeout: 3000,
      icon: null,
      color: null
    }
  },
  mutations: {
    // handleConfirm(state, show) {
    //   console.log("first")
    //   state.showConfirm = show;
    //   let timeoutHandle = null
    //   if (show === true) {
    //     timeoutHandle = setTimeout(() => { state.showConfirm = false }, 5000)
    //   }
    //   else {
    //     window.clearTimeout(timeoutHandle);
    //   }
    // },
    showLoading(state, show) {
      state.loading = show;
    },
    showSnackbar(state, payload) {
      state.snackbar.text = payload.text;
      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout;
      }
      if (payload.icon) {
        state.snackbar.icon = payload.icon;
      }
      if (payload.color) {
        state.snackbar.color = payload.color;
      }
      state.snackbar.visible = true;
    },
    closeSnackbar(state) {
      state.snackbar.visible = false;
      state.snackbar.timeout = 3000;
      state.snackbar.text = null;
    },
  },
  actions: {
    // TOGGLE_DRAWER({ commit }) {
    //   commit('toggleDrawer');
    // }
  },
  modules: {
    //snackbar
  },
  getters: {
    showConfirm: (state) => {
      return state.showConfirm;
    }
  }
})
