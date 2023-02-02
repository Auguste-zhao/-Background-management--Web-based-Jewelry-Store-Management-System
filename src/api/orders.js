import { defHttp } from '@/utils/axios';

export function getOrders() {
  return defHttp.get({
    url: '/orders/listAll'
  });
}

export function getOrdersById(id) {
  return defHttp.get({
    url: '/orders/getlistbyid',
    params: {
      id,
    },
  });
}
