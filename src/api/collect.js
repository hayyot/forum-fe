import request from '@/request'

export function myCollect(userId) {
    return request({
      url: `/collect/list/${userId}`,
      method: 'post'
    })
  }
