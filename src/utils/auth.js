import store from '@/store'

export function getToken() {
  return store.getters.token
}

export function setToken(token) {
  return store.commit('user/SET_TOKEN', token)
}

export function removeToken() {
  return setToken('')
}
