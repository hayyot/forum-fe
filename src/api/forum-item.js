/*
 * @Author: hayyot
 * @Date: 2023-04-25 15:56:02
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\api\forum-item.js
 */
import { get,post } from '../request'

export const getItemById = params => get("http://47.107.225.176:8808/getWzByTid",params)

// 点赞
export const Thumb = params => post("http://47.107.225.176:8808/dianzan", {data:params},{
    headers: {
      "Content-Type":"application/json"
    },
})