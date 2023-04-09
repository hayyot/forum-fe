/*
 * @Author: hayyot
 * @Date: 2023-04-01 17:18:41
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Index.vue'
import ForumVue from '@/views/Forum.vue'
import Posted from '../views/Posted.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posted',
    name: 'posted',
    component: Posted
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumVue
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
