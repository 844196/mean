import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
})

const state = {
  list: [],
}

const getters = {
  sortedList(state) {
    return state.list.sort((itemA, itemB) => {
      if (itemA.isDone === itemB.isDone) return 0
      return itemA.isDone ? 1 : -1
    })
  },
}

const mutations = {
  updateList(state, payload) {
    state.list = payload.list
  },
  addTodo(state, { todo }) {
    state.list.push(todo)
  },
  updateTodo(state, { updatedTodo }) {
    let before = state.list.find((beforeItem) => {
      return beforeItem.id === updatedTodo.id
    })
    Object.keys(before).forEach((key) => {
      before[key] = updatedTodo[key]
    })
  },
  deleteTodo(state, { deletedId }) {
    const idx = state.list.findIndex((item) => {
      return item.id === deletedId
    })
    state.list.splice(idx, 1)
  },
}

const actions = {
  updateList(context) {
    return api
      .get('/todos')
      .then((result) => {
        context.commit('updateList', {list: result.data})
        Promise.resolve(result)
      })
  },
  createTodo(context, newTodo) {
    return api
      .post(`/todos`, newTodo)
      .then((result) => {
        context.commit('addTodo', {todo: result.data})
        Promise.resolve(result)
      })
  },
  updateTodo(context, { id, patch }) {
    return api
      .patch(`/todos/${id}`, patch)
      .then((result) => {
        context.commit('updateTodo', {updatedTodo: result.data})
        Promise.resolve(result)
      })
  },
  deleteTodo(context, { id }) {
    return api
      .delete(`/todos/${id}`)
      .then((result) => {
        context.commit('deleteTodo', {deletedId: id})
        Promise.resolve(result)
      })
  },
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
