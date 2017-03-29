import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/todos/incomplete',
  },
  {
    path: '/todos/:filterType',
    component: require('./../pages/todos.vue'),
  },
]

Vue.use(VueRouter)
export default new VueRouter({
  routes,
  mode: 'history',
})
