/*
 * @Author: hayyot
 * @Date: 2023-04-24 20:59:53
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\api\home.js
 */
import { get,post } from '../request'

export const getSectionBysid = (current,limit,params) => get("http://47.107.225.176:8808/getAllBySid/"+current+'/'+limit,params);