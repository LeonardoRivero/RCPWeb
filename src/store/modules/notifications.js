import Request from '@/scripts/Request'
import Constants from "@/scripts/Constants";

let messages = new Constants.Messages()
const state = () => ({
    loading: { visible: false },
    snackbar: {
        visible: false,
        text: null,
        timeout: 3000,
        icon: null,
        color: null
    },
})

// getters
const getters = {
    getLoading: (state) => {
        return state.loading
    },
    getSnackbar: (state) => {
        return state.snackbar
    }

}
// mutations
const mutations = {
    showLoading(state, show) {
        state.loading.visible = show;
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
}

// actions
const actions = {
    async SHOW_LOADING(context, show) {
        context.commit('showLoading', show)
    },
    async SHOW_SNACKBAR(context, responseAsJson) {
        let payload = {}
        if (responseAsJson === undefined) {
            payload = {
                text: messages.errorMessage,
                icon: "mdi-close-thick",
                color: "error",
            };
        }
        else {
            payload = {
                text: messages.successMessage,
                icon: "mdi-check-bold",
                color: "success",
            }
        }
        context.commit('showSnackbar', payload)
    }

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}