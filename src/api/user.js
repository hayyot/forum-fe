import request from '@/request'

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
