import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerId: '',
    uid:'',
    homeNav:'',
    adminNav:'umkm'
  },
  mutations: {
    setSearch (state, id) {
      state.registerId = id
    },
    setUid (state, id) {
      state.uid = id
    },
    setHomeNav (state, status) {
      state.homeNav = status
    },
    setAdminNav (state, status) {
      state.adminNav = status
    }
  },
  actions: {
    setRegisterId( {commit}, id ) {
      commit('setSearch', id)
    },
    mutateUid( {commit}, id ) {
      commit('setUid', id)
    },
    mutateHomeNav( {commit}, status) {
      commit('setHomeNav',status)
    },
    mutateAdminNav( {commit}, status) {
      commit('setAdminNav',status)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
