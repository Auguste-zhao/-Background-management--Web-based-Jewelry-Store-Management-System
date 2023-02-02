import { defHttp } from "@/utils/axios";

export function getCustomers() {
  return defHttp.get({
    url: "/customers/list"
  });
}

export function customersDel(id) {
  return defHttp.delete({
    url: "/customers/deleteById",
    params: id
  });
}
