import { defHttp } from '@/utils/axios'

export function productsApi() {
  return defHttp.get({
    url: '/products/list'
  })
}
export function productsDel(id) {
  return defHttp.delete({
    url: '/products/list',
    params: id
  })
}
export function productsGet(params) {
  return defHttp.get({
    url: '/products/list/getProduct',
    params
  })
}
export function productsEdit(params) {
  return defHttp.put({
    url: '/products/list/update',
    params
  })
}
export function productsAdd(data) {
  return defHttp.post({
    url: '/products/list',
    data
  })
}
