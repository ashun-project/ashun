<template>
    <div id="app">
        <suspend></suspend>
        <div class="header" v-if="!$route.meta.notHeader">
            <div class="cont">
                <div class="lf"><router-link to="/"><img src="@/resource/img/logo.png"></router-link></div>
                <div class="rf">
                    <span>登入</span>
                    <span class="interval">|</span>
                    <span>注册</span>
                    <span class="interval">|</span>
                    <span>交流QQ<font color="red">3257905932</font></span>
                </div>
            </div>
            <div class="menu">
                <dl v-for="(list, idx) in menu" :key="idx">
                    <dt>{{list.label}}</dt>
                    <dd v-for="item in list.data" :key="item.url" :class="{active: item.url === $route.name || item.url === $route.params.title}">
                        <router-link :to="{name: item.url}">{{item.label}}</router-link>
                    </dd>
                </dl>
                <div class="clr"></div>
            </div>
        </div>
        <div class="banner" v-if="!$route.meta.notHeader">
            <img src="@/resource/img/banner.png" alt="">
        </div>
        <div class="body-content">
            <!-- <img class="ashun" src="@/resource/img/ashun.png" alt="ashun"> -->
            <router-view/>
        </div>
        <div class="footer" v-if="!$route.meta.notFooter">
            <div class="pc">
                警告︰本網站只這合十八歲或以上人士觀看。內容可能令人反感；不可將本網站的內容派發、傳閱、出售、出租、交給或借予年齡未滿18歲的人士或將本網站內容向該人士出示、播放或放映。<br/>
                LEGAL DISCLAIMER WARNING: THIS FORUM CONTAINS MATERIAL WHICH MAY OFFEND AND MAY NOT BE DISTRIBUTED, CIRCULATED, SOLD, HIRED, GIVEN, LENT,SHOWN, PLAYED OR PROJECTED TO A PERSON UNDER THE AGE OF 18 YEARS.<br/>
                站点申明：我们立足于美利坚合众国，受北美法律保护,未满18岁或被误导来到这里，请立即离开！
            </div>
            <div class="h5">警告︰本網站只這合十八歲或以上人士觀看</div>
        </div>
    </div>
</template>

<script>
import suspend from "@/components/common/suspend"
export default {
    name: 'App',
    components: {
        suspend
    },
    data () {
        return {
            menu: [
                {
                    label: '在线区：', 
                    data: [
                        {url: 'wumavideo', label: '无码性爱'}
                    ]
                },
                {
                    label: '下载区：', 
                    data: [
                        {url: 'wuma', label: '经典无码'},
                        {url: 'sanji', label: '三级影视'},
                        {url: 'oumei', label: '欧美风情'},
                        // {url: 'youma', label: '有码性爱'},
                        {url: 'dongman', label: '卡通动漫'},
                    // {url: 'tupian', label: '图片专区'},
                    // {url: 'xiaoshou', label: '小说专区'}]}
                    ]
                }
            ]
        }    
    }
}
</script>

<style>
    @import "./resource/css/style.css";
    .header{
        width: 100%;
        background: #fff;
    }
    .header .cont{
        max-width: 1200px;   
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
    }
    .header .cont .lf{
        color: #666;
        font-size: 16px;
    }
    .header .cont .lf img{
        height: 30px;
        float: left;
        margin-top: 5px;
    }
    .header .cont .rf{
        font-size: 16px;
        color: #666;
    }
    .header .cont .rf span{
        display: inline-block;
    }
    .header .cont .rf span.interval{
        padding: 0 5px;
        color: #ccc;
    }
    .header .menu{
        background:#f9d8dc;
        padding: 5px 0;
    }
    .header .menu dl{
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        height: 34px;
        line-height: 30px;
        font-size: 16px;
        padding: 2px 0 2px 70px;
        position: relative;
    }
    .header .menu dl dt{
        color: rgb(121, 33, 33);
        margin-right: 5px;
        font-weight: 600;
        float: left;
        position: absolute;
        left: 2px;
        top: 2px;
    }
    .header .menu dd{
        float: left;
        height: 30px;
        line-height: 30px;
        transition: all 1s;
    }
    .header .menu dd a{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        color: #576700;
        text-align: center;
    }
    .header .menu dd.active a{
        border-radius: 3px;
        background: #cae243;
        color: #fff;
    }
    .header .menu dd.active a:hover{
        color: #fff;
    }
    .header .menu dd a:hover{
        color: #cae243;
    }
    .banner{
        max-height: 300px;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
    .banner img{
        width: 100%;
    }
    .body-content .ashun{
        position: fixed;
        top: 50%;
        left: 0%;
        transform: translateY(-50%);
        z-index: -1;
    }
    .footer {
        width: 100%;
        background: #333;
        color: #ccc;
        padding: 50px 0;
        line-height:50px;
        font-size:14px;
        text-align: center;
    }
    .footer .h5{
        display: none;
    }
    @media screen and (max-width: 600px) {
        .header .cont .rf{
            padding-right: 5px;
        }
        .header .menu dl{
            padding-left: 60px;
            font-size: 14px;
        }
        .footer{
            padding: 10px 0;
        }
        .footer .h5{
            display: block;
        }
        .footer .pc{
            display: none;
        }
    }
</style>
