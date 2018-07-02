<template>
    <div id="app">
        <div class="header" v-if="!$route.meta.notHeader">
            <div class="cont">
                <div class="lf">
                    <router-link to="/"><img src="@/resource/img/logo.png"></router-link>
                </div>
                <div class="lf notice notice-h5">
                    <marquee scrolldelay="30">
                        为防止域名更换, 请记住我们的永久域名&nbsp;ashun520.com，&nbsp;s8sex.com
                    </marquee>
                </div>
                <div class="lf notice notice-pc">
                    为防止域名更换, 请记住我们的永久域名&nbsp;ashun520.com，&nbsp;s8sex.com
                </div>
                <div class="rf">
                    <span>交流QQ
                        <font color="#ff6738">3257905932</font>
                    </span>
                </div>
            </div>
            <div class="my-nav">
                <ul>
                    <li v-for="(item, idx) in navList" :key="idx" @click="navType = item.type">
                        <router-link :to="{name: item.url}" :class="{active: navType === item.type}" >{{item.label}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="banner" id="my-banner">
            占位使用 
        </div> -->
        <div class="notice-message">
            <span>通知：</span>
            <font color="red">请记住我们永久域名 ashun520.com, s8sex.com
                <span class="h5-display">以便快速找到我们,其他域名即将更换</span>
            </font>
        </div>
        <div class="body-content">
            <router-view/>
        </div>
        <div class="footer" v-if="!$route.meta.notFooter">
            <div class="friendly">
                友情链接：
                <a href="http://www.susan520.info/" target="_blank">苏三福利导航</a>
                <a href="http://www.biyudh.pw/" target="_blank">碧玉AV导航</a>
                <a href="http://www.ssmmdh.info/" target="_blank">色姐姐导航</a>
                <a href="http://www.ccchh.pw/" target="_blank">春色导航</a>
                <a href="http://www.yinuuu.info/" target="_blank">淫色导航</a>
                <a href="http://www.ygssss.info/" target="_blank">一个色导航</a>
            </div>
            <div class="h5">警告︰本網站只這合十八歲或以上人士觀看<span class="h5-display rf">有任何观看问题都可咨询我QQ：&nbsp;&nbsp;3257905932</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            navList: [
                {
                    label: "视频一区",
                    type: 1,
                    url: 'site1Home'
                },
                {
                    label: "视频二区",
                    type: 2,
                    url: 'site2Home'
                },
                // {
                //     label: "一区",
                //     type: 3,
                //     url: ''
                // }
            ],
            navType: 1
        }
    },
    mounted () {
        let host = window.location.host;
        let value = localStorage.getItem('web');
        if (!value && (host.indexOf('ashun') < 0 && host.indexOf('s8sex') < 0)) {
            alert('本域名即将关闭，请记住我们的永久域名。ashun520.com')
            localStorage.setItem('web', '1')
        }
    },
    created (){
        if (this.$route.path.indexOf('site1Home') < 0 && this.$route.path !== '/') {
            this.navType = 2;
        }
    }
}
</script>

<style>
@import './resource/css/style.css';
.header {
    width: 100%;
    background: #fff;
}
.header .cont {
    max-width: 1200px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    position: relative;
}
.header .cont .lf {
    color: #666;
    font-size: 16px;
}
.header .cont .lf img {
    height: 30px;
    float: left;
    margin-top: 5px;
}
.header .cont .rf {
    font-size: 16px;
    height: 95%;
    color: #666;
    background: #fff;
    position: relative;
    z-index: 10;
}
.header .cont .rf span {
    display: inline-block;
}
.header .cont .notice {
    position: absolute;
    left: 60px;
    top: 0;
    color: #ff6738;
    max-width: 500px;
}
.header .cont .notice-h5 {
    display: none;
}
.my-nav {
    height: 48px;
    line-height: 48px;
    background: #0e0e0e;
}
.my-nav ul {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
}
.my-nav ul li {
    width: 130px;
    text-align: center;
    float: left;
}
.my-nav ul li a {
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
}
.my-nav ul li a.active,
.my-nav ul li a:hover {
    background: #ff6738;
}
.notice-message {
    min-height: 35px;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    background: #333;
    color: #fff;
    box-shadow: 0 0 3px #000;
    font-size: 0.6rem;
    padding: 0 5px;
    display: flex;
    /* justify-content: center */
    align-items: center;
}
.banner {
    width: 0;
    height: 90px;
}
.body-content {
    min-height: 300px;
}
.footer {
    width: 100%;
    background: rgb(17, 17, 17);
    color: #ccc;
    padding: 5px;
    line-height: 30px;
    font-size: 14px;
    /* text-align: center; */
}
.footer .friendly {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
}
.footer .friendly a {
    display: inline-block;
    color: #ccc;
    padding-right: 5px;
}
.footer .h5{
    max-width: 1200px;
    margin: 0 auto;
    border-top: 1px solid #191717;
    box-shadow: 4px -3px 18px rgba(51, 51, 51, 0.10);
    margin-top: 5px;
}
@media screen and (max-width: 600px) {
    .h5-display{
        display: none;
    }
    .header .cont .rf {
        padding-right: 5px;
    }
    .header .cont .notice-h5 {
        display: block;
    }
    .header .cont .notice-pc {
        display: none;
    }
    .banner {
        height: 75px;
    }
    .my-nav {
        height: 30px;
        line-height: 30px;
    }
    .my-nav ul li {
        width: 25%;
    }
}
</style>
