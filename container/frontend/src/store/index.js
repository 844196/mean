import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
})

const state = {
  list: [],
}

const mutations = {
  updateList(state, payload) {
    state.list = payload.list
  },
}

const actions = {
  getList(context) {
    return new Promise((resolve, reject) => {
      api
        .get('/todos')
        .then((result) => {
          context.commit('updateList', {list: result.data})
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
})
