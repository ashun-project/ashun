import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import detail from '@/components/detail'
import videoList from '@/components/video_list'
import videoDetail from '@/components/video_detail'
import deleteRepeat from '@/components/delete_repeat'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/wumavideo'
    },
    {
      path: '/wumavideo',
      name: 'wumavideo',
      component: videoList
    },
    {
      path: '/sanjivideo',
      name: 'sanjivideo',
      component: videoList
    },
    {
      path: '/videoDetail/:title/:id',
      name: 'videoDetail',
      component: videoDetail
    },
    {
      path: '/sanji',
      name: 'sanji',
      component: home
    },
    {
      path: '/wuma',
      name: 'wuma',
      component: home
    },
    {
      path: '/oumei',
      name: 'oumei',
      component: home
    },
    {
      path: '/dongman',
      name: 'dongman',
      component: home
    },
    {
      path: '/detail/:title/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/deleteRepeat/:id/:age/:name/:all',
      name: 'deleteRepeat',
      component: deleteRepeat,
      meta: {
        notFooter: true,
        notHeader: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
