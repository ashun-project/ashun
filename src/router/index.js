import Vue from 'vue'
import Router from 'vue-router'
// import test from '@/components/test'
// import home from '@/components/home'
// import detail from '@/components/detail'
// import videoList from '@/components/video_list'
// import videoDetail from '@/components/video_detail'
// import deleteRepeat from '@/components/delete_repeat'


// const test = resolve => require(['@/components/test'], resolve)
// const home = resolve => require(['@/components/home'], resolve)
// const deleteRepeat = resolve => require(['@/components/delete_repeat'], resolve)


const site1Home = resolve => require(['@/components/site1/home'], resolve)
const videoList = resolve => require(['@/components/site1/video_list'], resolve)
const videoDetail = resolve => require(['@/components/site1/video_detail'], resolve)
const detail = resolve => require(['@/components/site1/detail'], resolve)

// const site2Home = resolve => require(['@/components/site2/home'], resolve)
// const site2Detail = resolve => require(['@/components/site2/detail'], resolve)



// import site2Home from '@/components/site2/home'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '*',
            redirect: '/site1Home/list/wumavideo/1',
        },
        {
            path: '/',
            name: 'home',
            redirect: '/site1Home/list/wumavideo/1'
        },
        {
            path: '/site1Home',
            name: 'site1Home',
            component: site1Home,
            redirect: '/site1Home/list/wumavideo',
            children: [{
                    path: '/site1Home/list/:label/:page',
                    name: 'list',
                    component: videoList
                },
                {
                    path: '/site1Home/videoDetail/:title/:id',
                    name: 'videoDetail',
                    component: videoDetail
                },
                {
                    path: '/site1Home/detail/:title/:id',
                    name: 'detail',
                    component: detail
                },
            ]
        },
        // {
        //     path: '/site2/:label',
        //     name: 'site2Home',
        //     component: site2Home
        // },
        // {
        //     path: '/site2Detail/:id',
        //     name: 'site2Detail',
        //     component: site2Detail
        // },
        // {
        //     path: '/wumavideo',
        //     name: 'wumavideo',
        //     component: videoList
        // },
        // {
        //     path: '/sanjivideo',
        //     name: 'sanjivideo',
        //     component: videoList
        // },
        // {
        //     path: '/youmavideo',
        //     name: 'youmavideo',
        //     component: videoList
        // },
        // {
        //     path: '/oumeivideo',
        //     name: 'oumeivideo',
        //     component: videoList
        // },
        // {
        //     path: '/dongmanvideo',
        //     name: 'dongmanvideo',
        //     component: videoList
        // },
        // {
        //     path: '/zipaivideo',
        //     name: 'zipaivideo',
        //     component: videoList
        // },
        // {
        //     path: '/videoDetail/:title/:id',
        //     name: 'videoDetail',
        //     component: videoDetail
        // },
        // {
        //     path: '/sanji',
        //     name: 'sanji',
        //     component: home
        // },
        // {
        //     path: '/wuma',
        //     name: 'wuma',
        //     component: home
        // },
        // {
        //     path: '/oumei',
        //     name: 'oumei',
        //     component: home
        // },
        // {
        //     path: '/dongman',
        //     name: 'dongman',
        //     component: home
        // },
        // {
        //     path: '/detail/:title/:id',
        //     name: 'detail',
        //     component: detail
        // },
        // {
        //     path: '/deleteRepeat/:id/:age/:name/:all',
        //     name: 'deleteRepeat',
        //     component: deleteRepeat,
        //     meta: {
        //         notFooter: true,
        //         notHeader: true
        //     }
        // },
        // {
        //     path: '/test',
        //     name: 'test',
        //     component: test
        // }
    ]
})
