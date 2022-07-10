import Request from '@/scripts/Request'
import Constants from "@/scripts/Constants";

let request = new Request()
let endpoint = new Constants.EndPoints()

const state = () => ({
    insuranceList: [],
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
    getDxMainCodeBySpecialityId: (state) => (id) => {
        return state.dxMainCodeList.filter(dxMainCode => dxMainCode.speciality.id === id)
    },
    specialityForm: (state) => {
        return state.speciality
    },
    dxMainCodeForm: (state) => {
        return state.dxMainCodeForm
    },
    getAllSpecialities: (state) => {
        return state.specialityList
    },
    getAllDXMainCode: (state) => {
        return state.dxMainCodeList
    },
    getRelationCodeByDXMainCodeId: (state) => (id) => {
        let response = state.relationCodeList.filter(relationCodeList => relationCodeList.dxmaincode.id === id)
        console.log(response)
        return response
    }
}
// mutations
const mutations = {
    insuranceList(state, data) {
        state.insuranceList = data
    },
    specialityList(state, data) {
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
        let url = endpoint.getORcreateSpeciality
        let responseAsJson = await request.get(url)
        context.commit('specialityList', responseAsJson)
    },
    async getDXMainCodeList(context) {
        let url = endpoint.getORcreateDxMainCode
        let responseAsJson = await request.get(url)
        context.commit('dxMainCodeList', responseAsJson)
    },
    async getRelationCodeList(context) {
        let url = endpoint.getORcreateRelationCode
        let responseAsJson = await request.get(url)
        context.commit('relationCodeList', responseAsJson)
    },
    async addSpeciality({ dispatch, commit }, data) {
        dispatch('notifications/SHOW_LOADING', true, { root: true })
        let url = this.endpoint.getORcreateSpeciality;
        responseAsJson = await this.request.post(url, data);
        dispatch('getSpecialityList')
        dispatch('handleNotification', responseAsJson)
    },
    async addDXMainCode({ dispatch, commit }, data) {
        dispatch('notifications/SHOW_LOADING', true, { root: true })
        let url = endpoint.getORcreateDxMainCode
        let responseAsJson = await request.post(url, data)
        commit('dxMainCodeList', responseAsJson)
        dispatch('handleNotification', responseAsJson)
    },
    async updateDXMainCode({ dispatch, commit }, data) {
        dispatch('notifications/SHOW_LOADING', true, { root: true })
        let url = endpoint.updateDxMainCode(data.id)
        let responseAsJson = await request.put(url, data)
        commit('dxMainCodeList', responseAsJson)
        dispatch('handleNotification', responseAsJson)
    },
    async updateSpeciality({ dispatch, commit }, data) {
        dispatch('notifications/SHOW_LOADING', true, { root: true })
        let url = endpoint.updateSpeciality(data.id)
        let dataJSON = JSON.stringify(data);
        let responseAsJson = await request.put(url, dataJSON)
        dispatch('handleNotification', responseAsJson)
    },
    async addRelationCode({ dispatch, commit }, data) {
        dispatch('notifications/SHOW_LOADING', true, { root: true })
        let url = endpoint.getORcreateRelationCode
        let responseAsJson = await request.post(url, data)
        commit('relationCodeList', responseAsJson)
        dispatch('handleNotification', responseAsJson)
    },
    handleNotification({ dispatch }, responseAsJson) {
        dispatch('notifications/SHOW_LOADING', false, { root: true })
        dispatch('notifications/SHOW_SNACKBAR', responseAsJson, { root: true })
        setTimeout(() => {
            dispatch('notifications/CLOSE_SNACKBAR', null, { root: true })
        }, 3000)

    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}