import { get,post } from '../request'

export const getItemById = params => get("http://47.107.225.176:8808/getWzByTid",params)