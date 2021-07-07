import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    posts: null,
    currentPost: null
  },
  getters: {
    GET_CURRENT_USER: state => state.currentUser,
    GET_ALL_POSTS: state => state.posts,
    GET_CURRENT_POST: state => state.currentPost,
    GET_LAST_POST_ID: state => state.posts[state.posts.length - 1].id
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    SET_ALL_POSTS(state, posts) {
      state.posts = posts
    },
    SET_CLAP(state, index) {
      state.posts[index].claps++
    },
    DELETE_POST(state, index) {
      state.posts.splice(index, 1)
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post
    },
    EDIT_POST(state, data) {
      state.posts[data.index] = data.post
    }
  },
  actions: {
    GET_ALL_POSTS({ commit }) {
      axios.get('http://localhost:3000/posts')
      .then((response) => {
        commit('SET_ALL_POSTS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    SET_CLAP_TO_SERVER({ state, commit }, index) {
      const i = state.posts.findIndex(post => post.id === index)
      commit('SET_CLAP', i)
      const post = state.posts[i]
      axios.patch(`http://localhost:3000/posts/${post.id}`, post)
    },
    DELETE_POST_TO_SERVER({ state, commit }, id) {
      const index = state.posts.findIndex(post => post.id === id)
      commit('DELETE_POST', index)
      axios.delete(`http://localhost:3000/posts/${id}`)
    },
    ADD_POST({ dispatch }, newPost) {
      axios.post('http://localhost:3000/posts', newPost)
      dispatch('SET_ALL_POSTS')
    },
    EDIT_POST({ state, commit }, post) {
      const index = state.posts.findIndex(p => p.id === post.id)
      const data = {
        index,
        post
      }
      commit('EDIT_POST', data)
      axios.patch(`http://localhost:3000/posts/${post.id}`, post)
    }
  },
});