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
import ResourceIndexVue from '@/views/Resource/ResourceIndex.vue'
import StudyIndexVue from '@/views/Study/StudyIndex.vue'
import AboutUsIndex from '@/views/AboutUs/AboutUsIndex.vue'
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
  },{
    path: '/resource',
    name: 'ResourceIndexVue',
    component: ResourceIndexVue
  },{
    path: '/study',
    name: 'StudyIndexVue',
    component: StudyIndexVue
  },{
    path: '/aboutus',
    name: 'AboutUsIndex',
    component: AboutUsIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
