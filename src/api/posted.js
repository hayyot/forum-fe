import { get,post } from '../request'

export const getSection = params => get("http://47.107.225.176:8808/getSectionAndWzCount");

export const insertContent = params => post("http://47.107.225.176:8808/insert",params);