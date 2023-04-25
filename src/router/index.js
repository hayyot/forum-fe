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
import index_itemVue from '@/views/index/index_item.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/forum/:id',
    name:'forum-item',
    component: index_itemVue
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
  },{
    path: '/user/personal/:id',
    component: r => require.ensure([], () => r(require('@/views/person/Personal')), 'personal'),
    meta: {
      requireLogin: true
    },
    children: [
      {
        // path: '/personal/info/:id',
        path: '/user/personal/info/:id',
        name:'info',
        component: r => require.ensure([], () => r(require('@/views/person/Info')), 'info')
      },
      {
        path:'/user/personal/myarticle/:id',
        name:'myarticle',
        component: r => require.ensure([], () => r(require('@/views/person/MyArticle')), 'myarticle')
      },
      {
        path:'/user/personal/mycollect/:id',
        name:'mycollect',
        component: r => require.ensure([], () => r(require('@/views/person/MyCollect')), 'mycollect')
      },
      {
        path:'/user/personal/myfan/:id',
        name:'myfan',
        component: r => require.ensure([], () => r(require('@/views/person/MyFanAndFollow')), 'myfan')
      },
      {
        path:'/user/personal/myfollow/:id',
        name:'myfollow',
        component: r => require.ensure([], () => r(require('@/views/person/MyFanAndFollow')), 'myfollow')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
