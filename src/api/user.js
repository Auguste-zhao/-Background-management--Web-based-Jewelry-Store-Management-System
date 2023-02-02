import { defHttp } from '@/utils/axios'

export function login(data) {
  return defHttp.post({
    url: '/user/login',
    data
  })
}
export function getInfo() {
  return defHttp.get({
    url: '/user/info'
  })
}
export function logout() {
  return defHttp.post({
    url: 'user/logout'
  })
}
