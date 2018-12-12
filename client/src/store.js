import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 6000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 6000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},  //save arrays of tasks as the values and the task's listId's as the key
    comments: {}
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
    newTask(state, payload) {
      // state.tasks[payload.listId] = payload.tasks
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    newComment(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    }
  },
  actions: {
    //COMMENT STUFF
    createComment({ commit, dispatch }, commentData) {
      api.post('comments/', commentData)
        .then(res => {
          console.log('comments', res.data)
          dispatch('getComments', commentData.taskId)
        })
    },
    getComments({ commit, dispatch }, taskId) {
      api.get('comments/' + taskId)
        .then(res => {
          console.log('comments:', res.data)
          let payload = {
            taskId: taskId,
            comments: res.data
          }
          commit('newComment', payload)
        })
    },
    deleteComment({ commit, dispatch }, commentData) {
      api.delete('comments/' + commentData.commentId)
        .then(res => {
          dispatch('getComments', commentData.taskId)
        })
    },

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
          // router.push({ name: 'boards' })
        })
        .catch(err => {
          console.error(err)
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit }) {
      auth.delete('logout')
        .then(res => {
          router.push({ name: 'login' })
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
    //write a delete board request

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
    deleteList({ commit, dispatch }, listData) {
      api.delete('lists/' + listData.listId)
        .then(res => {
          dispatch('getLists', listData.boardId)
        })
    },


    //TASKS
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/' + listId)
        .then(res => {
          console.log('tasks:', res.data)
          let payload = {
            listId: listId,
            tasks: res.data
          }
          commit('newTask', payload)
        })
    },
    createTask({ commit, dispatch }, taskDetails) {
      api.post('tasks/', taskDetails)
        .then(res => {
          dispatch('getTasks', taskDetails.listId)
        })
    },
    deleteTask({ commit, dispatch }, taskData) {
      debugger
      api.delete('tasks/' + taskData.taskId)
        .then(res => {
          dispatch('getTasks', taskData.listId)

        })
    }
  }
})