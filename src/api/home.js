/*
 * @Author: hayyot
 * @Date: 2023-04-24 20:59:53
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\api\home.js
 */
import { get,post } from '../request'
//根据板块sid获取文章
export const getSectionBysid = (current,limit,params) => get("http://47.107.225.176:8808/getAllBySid/"+current+'/'+limit,params);
//获取全部文章(全部标签下)
export const getAllContent = (current,limit) => get("http://47.107.225.176:8808/getAll/"+current+"/"+limit)