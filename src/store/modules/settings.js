import Request from '@/scripts/Request'
import Constants from "@/scripts/Constants";

let request = new Request()
let endpoint = new Constants.EndPoints()

const state = () => ({
    insuranceList: {},
    specialityList: [],
    speciality: { data: {}, visible: false, title: "" },
    dxMainCodeForm: { data: {}, visible: false, title: "" },
    dxMainCodeList: [],
    relationCodeList: []
})

// getters
const getters = {
    getSpecialityById: (state) => (id) => {
        return state.specialityList.find(speciality => speciality.id === id)
    },
    specialityForm: (state) => {
        return state.speciality
    },
    dxMainCodeForm: (state) => {
        return state.dxMainCodeForm
    },
    getAllSpecialities: (state) => {
        console.log("3")
        return state.specialityList
    },
    getAllDXMainCode: (state) => {
        return state.dxMainCodeList
    },
    getAllRelationCode: (state) => {
        return state.relationCodeList
    },
    getStateRequest: (state) => {

    }
}
// mutations
const mutations = {
    insuranceList(state, data) {
        state.insuranceList = data
    },
    specialityList(state, data) {
        console.log("2")
        state.specialityList = data

    },
    dxMainCodeList(state, data) {
        state.dxMainCodeList = data
    },
    relationCodeList(state, data) {
        state.relationCodeList = data
    },
    toggleSpecialityForm(state, show) {
        if (show === undefined || show === null) {
            state.speciality.visible = false
            return
        }
        state.speciality.visible = true
    },
    toggleCUPForm(state, show) {
        if (show === undefined || show === null) {
            state.dxMainCodeForm.visible = false
            return
        }
        state.dxMainCodeForm.visible = true
    },
    specialityForms(state, payload) {
        state.speciality.data = payload.data
        state.speciality.title = payload.title
    },
    dxMainCodeForm(state, payload) {
        state.dxMainCodeForm.data = payload.data
        state.dxMainCodeForm.title = payload.title
    }
}

// actions
const actions = {
    async getInsuranceList(context) {
        let url = endpoint.getORcreateInsurance
        let responseAsJson = await request.get(url)
        context.commit('insuranceList', responseAsJson)
    },
    async getSpecialityList(context) {
        console.log("1")
        let url = endpoint.getORcreateSpeciality
        let responseAsJson = await request.get(url)
        context.commit('specialityList', responseAsJson)

    },
    async getDXMainCodeList(context) {
        console.log("1.Dx")
        let url = endpoint.getORcreateCup
        let responseAsJson = await request.get(url)
        context.commit('dxMainCodeList', responseAsJson)
        console.log(responseAsJson)
    },
    async addDXMainCode({ commit }, data) {
        let url = endpoint.getORcreateCup
        let responseAsJson = await request.post(url, data)
        commit('dxMainCodeList', responseAsJson)
    },
    async addRelationCode({ dispatch, commit }, data) {
        let show = true
        dispatch('notifications/SHOW_LOADING', show, { root: true })
        let url = endpoint.getORcreateRelationCode
        let responseAsJson = await request.post(url, data)
        commit('relationCodeList', responseAsJson)
        show = false
        dispatch('notifications/SHOW_LOADING', show, { root: true })
        dispatch('notifications/SHOW_SNACKBAR', responseAsJson, { root: true })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}