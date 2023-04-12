/*
 * @Author: hayyot
 * @Date: 2023-04-09 19:29:35
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\api\api.js
 */
import { get} from '../request'

export const ceshi = params => get('https://nothingnull.xyz/loginAll',params)

export const getStudyList = params => get('http://47.107.225.176:8080/findChildData/'+ params)
