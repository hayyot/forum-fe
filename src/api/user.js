import request from '@/request'
import { get,post } from '@/request'

export function userInfo(id) {
  return request({
    url: `/users/userInfo/${id}`,
    method: 'post'
  })
}

export function myArticle(authorId) {
  return request({
    url: `/articles/view1/${authorId}`,
    method: 'post'
  })
}

export function updateUser(user) {
  return request({
    url: '/users/update',
    method: 'post',
    data: user
  })
}

export const getUserinfoById = params => get('http://47.107.225.176:8808/getUserByUid/'+params)