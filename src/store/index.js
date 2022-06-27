import Vue from 'vue'
import Vuex from 'vuex'
import Request from '@/scripts/Request'
import Constants from "@/scripts/Constants";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loading: { visible: false },
    speciality: { visible: false },
    snackbar: {
      visible: false,
      text: null,
      timeout: 3000,
      icon: null,
      color: null
    },
    insuranceList: {}
  },
  mutations: {
    showLoading(state, show) {
      state.loading = show;
    },
    addSpeciality(state, show) {
      state.speciality = show;
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
    insuranceListData(state, data) {
      state.insuranceList = data
    }
  },
  actions: {
    async getInsuranceList(context) {
      let request = new Request()
      let endpoint = new Constants.EndPoints()
      let url = endpoint.getORcreateInsurance
      let responseAsJson = await request.get(url)
      context.commit('insuranceListData', responseAsJson)
    }
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
