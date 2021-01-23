import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/shop/list',
    method:'get',
    params:params
  })
}
export function createShop(data) {
  return request({
    url:'/shop/create',
    method:'post',
    data:data
  })
}

export function getShop(id) {
  return request({
    url:'/shop/'+id,
    method:'get',
  })
}

export function updateShop(id,data) {
  return request({
    url:'/shop/update/'+id,
    method:'post',
    data:data
  })
}

