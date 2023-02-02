import { login, logout, getInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: '',
  name: '',
  role: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const { token } = await login({ username: username.trim(), password: password })
      if (!token) {
        Message({
          message: '登录失败',
          type: 'error'
        })
        return
      }
      commit('SET_TOKEN', token)
      const user = await getInfo()
      commit('SET_ROLE', user.role)
      commit('SET_NAME', user.username)
      Message({
        message: '登陸成功',
        type: 'success'
      })
    } catch (error) {
      Message({
        message: '登录失败',
        type: 'error'
      })
      throw error
    }
  },

  // get user info
  async getInfo({ commit }) {
    try {
      const { role, name } = await getInfo()
      commit('SET_ROLE', role)
      commit('SET_NAME', name)
      Message({
        message: '登陸成功',
        type: 'success'
      })
    } catch (error) {
      throw error
    }
  },

  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLE', [])
    // dispatch('tagsView/delAllViews', null, { root: true })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)

    const { role: newRole } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on role
    const accessRoutes = await dispatch('permission/generateRoutes', newRole, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
