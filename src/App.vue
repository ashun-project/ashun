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
                    <span>交流QQ<font color="red">762008732</font></span>
                </div>
            </div>
            <div class="menu">
                <ul>
                    <li v-for="item in menu" :key="item.url" :class="{active: item.url === $route.name || item.url === $route.params.title}">
                        <router-link :to="{name: item.url}">{{item.label}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="banner" v-if="!$route.meta.notHeader">
            <img src="@/resource/img/banner.png" alt="">
        </div>
        <router-view/>
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
                {url: 'sanji', label: '经典三级'},
                {url: 'wuma', label: '无码性爱'}
            ]
        }
    }
}
</script>

<style>
    @import "./resource/css/style.css";
    .header{
        
        
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
        background:#f1909c;
        height: 50px;
        
    }
    .header .menu ul{
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
    }
    .header .menu li{
        float: left;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        transition: all 1s;
    }
    .header .menu li a{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 15px;
        color: #f1f1f1;
    }
    .header .menu li.active{
        /* border-bottom: 3px solid #efdee1; */
        background: #fff;
    }
    .header .menu li.active a, .header .menu li a:hover{
        color: #6f1818;
        font-weight: 600;
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
