import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        count: 0,
        user: {
            firstName: "",
            lastName: "",
            password: "",
            email: null,
            address: "",
            mobile: "",
            terms: false,
        }
    },

    mutations: {
        updateUser (state, payload) {
            state.user = payload
        }
    },

    actions: {
        updateStoreValues ({commit}, payload) {
            commit('updateUser', payload)
        }
    },

    getters: {
        userDetails (state) {
            return state.user
        }
    }
})
