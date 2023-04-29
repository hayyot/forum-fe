/*
 * @Author: hayyot
 * @Date: 2023-04-19 15:41:44
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\api\user.js
 */
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

// 获取点赞列表
export const getDianzanById = (current,limit,uid) => get('http://47.107.225.176:8808/dianZanList/'+current+'/'+limit+'/'+uid)

// 获取收藏列表
export const getShoucangById = (current,limit,uid) => get('http://47.107.225.176:8808/shoucangList/'+current+'/'+limit+'/'+uid)

//获取顶部数据
export const getUserCount = uid => get('http://47.107.225.176:8808/getUserCount/'+uid);

// 获取关注列表
export const getAllFollows = (current,limit,uid) => get('http://47.107.225.176:8808/followList/'+current+'/'+limit+'/'+uid)

// 取消关注
export const cancelFollow = (uid,followid) => post('http://47.107.225.176:8808/cancel/'+uid+'/'+followid)