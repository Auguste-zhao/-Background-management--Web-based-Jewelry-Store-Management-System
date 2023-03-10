import { defHttp } from '@/utils/axios'

export function salespersonApi(data) {
  return defHttp.get({
    url: '/salesperson/list',
    data
  })
}
export function salespersonDel(id) {
  return defHttp.delete({
    url: '/salesperson/list',
    params: id
  })
}
export function salespersonGet(params) {
  return defHttp.get({
    url: '/salesperson/list/getSalesperson',
    params
  })
}
export function salespersonEdit(data) {
  return defHttp.put({
    url: '/salesperson/list/update',
    data
  })
}
export function salespersonAdd(data) {
  return defHttp.post({
    url: '/salesperson/list',
    data
  })
}
