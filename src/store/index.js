import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  showCodePop: false
}

const mutations = {
  setCodeType (state, value) {
    state.showCodePop = value
  }
}

export default new Vuex.Store({
  state,
  mutations
})
