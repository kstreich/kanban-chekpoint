import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    // activeBoard: {},
    lists: [],// OR AN OBJECT???
    tasks: {}  //this is where we are going to create a dictionary with comments as the value, tasks as the key
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    newLists(state, lists) {
      state.lists = lists
    },
    newTask(state, task) {
      state.tasks = task
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          console.log('boards:', res)
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    //LISTS
    createList({ commit, dispatch }, listConfig) {
      api.post('lists', listConfig)
        .then(res => {
          console.log('new list', res.data)
          dispatch('getLists', listConfig.boardId)
        })
    },

    getLists({ commit }, boardId) {
      api.get('lists/' + boardId)
        .then(res => {
          console.log('list data:', res.data)
          commit('newLists', res.data)
        })
    },

    //TASKS
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/' + listId)
        .then(res => {
          commit('newTask', res.data)
        })
    },
    createTask({ commit, dispatch }, taskDetails) {
      api.post('tasks/', taskDetails)
        .then(res => {

        })
    }
  }
})