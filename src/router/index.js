import Vue from 'vue'
import Router from 'vue-router'
// import test from '@/components/test'
// import home from '@/components/home'
// import detail from '@/components/detail'
// import videoList from '@/components/video_list'
// import videoDetail from '@/components/video_detail'
// import deleteRepeat from '@/components/delete_repeat'


const test = resolve => require(['@/components/test'], resolve)
const home = resolve => require(['@/components/home'], resolve)
const detail = resolve => require(['@/components/detail'], resolve)
const videoList = resolve => require(['@/components/video_list'], resolve)
const videoDetail = resolve => require(['@/components/video_detail'], resolve)
const deleteRepeat = resolve => require(['@/components/delete_repeat'], resolve)
const site2Home = resolve => require(['@/components/site2/home'], resolve)



// import site2Home from '@/components/site2/home'

Vue.use(Router)

export default new Router({
    routes: [{
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
            path: '/youmavideo',
            name: 'youmavideo',
            component: videoList
        },
        {
            path: '/oumeivideo',
            name: 'oumeivideo',
            component: videoList
        },
        {
            path: '/dongmanvideo',
            name: 'dongmanvideo',
            component: videoList
        },
        {
            path: '/zipaivideo',
            name: 'zipaivideo',
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
        },
        {
            path: '/site2Home',
            name: 'site2Home',
            component: site2Home,
            children: [

            ]
        }

    ]
})
