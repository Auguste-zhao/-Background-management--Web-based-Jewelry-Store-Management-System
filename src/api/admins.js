import { defHttp } from '@/utils/axios'

export function adminsApi(data) {
  return defHttp.get({
    url: '/user/list',
    data
  })
}
export function adminsDel(id) {
  return defHttp.delete({
    url: '/user/list',
    params: id
  })
}
export function adminsGet(params) {
  return defHttp.get({
    url: '/user/list/getAdmin',
    params
  })
}
export function adminsEdit(data) {
  return defHttp.put({
    url: '/user/list/update',
    data
  })
}
export function adminsAdd(data) {
  return defHttp.post({
    url: '/user/list',
    data
  })
}
