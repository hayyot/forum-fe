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
    component: Home,
    meta:{
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },
  {
    path:'/forum/:id',
    name:'forum-item',
    component: index_itemVue,meta:{
      isAuth:true,
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },
  {
    path: '/posted',
    name: 'posted',
    component: Posted,
    meta:{
      isAuth:true,
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumVue,
    meta:{
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },{
    path: '/resource',
    name: 'ResourceIndexVue',
    component: ResourceIndexVue,
    meta:{
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },{
    path: '/study',
    name: 'StudyIndexVue',
    component: StudyIndexVue,
    meta:{
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },{
    path: '/aboutus',
    name: 'AboutUsIndex',
    component: AboutUsIndex,
    meta:{
      keepAlive:true, //自定义属性,通过改属性动态设置保活
    }
  },{
    path: '/user/personal/:id',
    component: r => require.ensure([], () => r(require('@/views/person/Personal')), 'personal'),
    meta: {
      isAuth:true,
      requireLogin: true,
      keepAlive:false,
    },
    children: [
      {
        // path: '/personal/info/:id',
        path: '/user/personal/info/:id',
        name:'info',
        component: r => require.ensure([], () => r(require('@/views/person/Info')), 'info'),
        meta:{
          isAuth:true,
          keepAlive:true, //自定义属性,通过改属性动态设置保活
        }
      },
      {
        path:'/user/personal/myarticle/:id',
        name:'myarticle',
        component: r => require.ensure([], () => r(require('@/views/person/MyArticle')), 'myarticle'),
        meta:{
          isAuth:true,
          keepAlive:true, //自定义属性,通过改属性动态设置保活
        }
      },
      {
        path:'/user/personal/mycollect/:id',
        name:'mycollect',
        component: r => require.ensure([], () => r(require('@/views/person/MyCollect')), 'mycollect'),
        meta:{
          isAuth:true,
          keepAlive:true, //自定义属性,通过改属性动态设置保活
        }
      },
      {
        path:'/user/personal/myfan/:id',
        name:'myfan',
        component: r => require.ensure([], () => r(require('@/views/person/MyFanAndFollow')), 'myfan'),
        meta:{
          isAuth:true,
          keepAlive:true, //自定义属性,通过改属性动态设置保活
        }
      },
      {
        path:'/user/personal/myfollow/:id',
        name:'myfollow',
        component: r => require.ensure([], () => r(require('@/views/person/MyFanAndFollow')), 'myfollow'),
        meta:{
          isAuth:true,
          keepAlive:true, //自定义属性,通过改属性动态设置保活
        }
      },
      {
        path:'/user/personal/myfollows/:id',
        name:'myfollows',
        component: r => require.ensure([], () => r(require('@/views/person/MyFollow')), 'myfollows'),
        meta:{
          isAuth:true,
          keepAlive:true, //自定义属性,通过改属性动态设置保活
        }
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) => {
  if (to.meta.isAuth) {
    //判断 如果school本地存储是qinghuadaxue的时候，可以进去
    if (localStorage.getItem('uid') !== null) {
        next()  //放行
    } else {
        alert('请登录后查看！')
        router.push('/')
    }
} else {
    // 否则，放行
    next()
} 
})
export default router
