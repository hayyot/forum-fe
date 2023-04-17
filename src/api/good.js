import request from '@/request'

  export function mygoodCount(userId) {
    return request({
      url: `/good/goodcount/${userId}`,
      method: 'post'
    })
  }
