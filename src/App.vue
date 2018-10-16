<template>
    <div id="app">
        <!-- <iframe style="display: none" id="my-iframe-ip" src="/static/ip.html" frameborder="0"></iframe> -->
        <div class="header" v-if="!$route.meta.notHeader">
            <div class="cont">
                <div class="lf">
                    <router-link to="/"><img src="@/resource/img/logo.png"></router-link>
                </div>
                <div class="lf notice notice-h5">
                    <marquee scrolldelay="30">
                        为防止域名更换, 请记住我们的导航域名&nbsp;xjb520.com
                    </marquee>
                </div>
                <div class="lf notice notice-pc">
                    为防止域名更换, 请记住我们的导航域名&nbsp;xjb520.com
                </div>
                <div class="rf">
                    <span>交流QQ群
                        <font><a href="https://jq.qq.com/?_wv=1027&k=5j4uiDH" style="color:#ff6738">854191436</a></font>
                    </span>
                </div>
            </div>
            <div class="my-nav">
                <ul>
                    <li>
                        <a href="http://xjb520.com" title="小鸡吧">其它资源</a>
                    </li>
                    <li v-for="(item, idx) in navList" :key="idx">
                        <a v-if="item.type === 2" href="http://www.llh8.vip" target="_blank">{{item.label}}</a>
                        <router-link v-else :to="item.url" :class="{active: navType === item.type}">{{item.label}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="banner" id="my-banner">
            <!-- 占位使用  -->
        </div>
        <!-- <div class="advert">
            <a href="http://www.117dfh.com/register.html" target="_blank">
                <img src="@/resource/img/advert/record.gif" alt="ashun520.com">
            </a>
        </div> -->
        <div class="notice-message">
            <span>通知：</span>
            <font color="red">请记住我们永久导航域名 xjb520.com
                <span class="h5-display">以便快速找到我们,其他域名即将更换</span>
            </font>
        </div>
        <div class="body-content">
            <router-view/>
        </div>
        <div class="footer" v-if="!$route.meta.notFooter">
            <div class="my-friendly">
                友情链接：
            </div>
            <div class="h5">警告︰本網站只這合十八歲或以上人士觀看
                <span class="h5-display rf">有任何观看问题都可咨询QQ群：&nbsp;&nbsp;
                    <font><a href="https://jq.qq.com/?_wv=1027&k=5j4uiDH" style="color:#fff">854191436</a></font>
                </span>
            </div>
        </div>
        <!-- <iframe src="http://xjb520.com/?myparams=6" frameborder="0" style="display:none"></iframe> -->
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
                    url: '/site1Home/list/wumavideo'
                },
                {
                    label: "vip区",
                    type: 2,
                    url: 'http://www.llh8.vip'
                }
                // {
                //     label: "一区",
                //     type: 3,
                //     url: ''
                // }
            ],
            navType: 1
        }
    },
    watch: {
        '$route' (n, o) {
            if (n.path.indexOf('site1') > -1) {
                this.navType = 1;
            } else {
                this.navType = 2;
            }
        }
    },
    mounted () {
        let host = window.location.host;

        // if (host.indexOf('xjb') < 0) {
        //     alert('本域名即将关闭，请记住我们的导航入口。http://xjb520.com');
        //     window.location.href = 'http://xjb1990.com';
        // }

        let guding = document.getElementById('guding');
        let myBanner = document.getElementById('my-banner');
        myBanner.style.height = guding.offsetHeight + 'px';
        // let vm = this;
        // let iframe = document.getElementById('my-iframe-ip');
        // let app = document.getElementById('app');
        // iframe.onload = function () {
        //     let inner = iframe.contentWindow.document.body.innerHTML.replace(/<script type=\"text\/javascript\" src=\"http:\/\/ip.chinaz.com\/getip.aspx\"><\/script>/, '');
        //     if (inner.indexOf('江西') > -1 && inner.indexOf('鹰潭') > -1) {
        //         // if (inner.indexOf('澳大利亚') > -1 && inner.indexOf('澳大利亚') > -1) {
        //         app.innerHTML = '<span style="color:#fff">网站休息了<span>'
        //         vm.$http.post('/api/prohibitIp', { id: new Date().getTime(), title: inner }).then(response => { })
        //     }
        // }
    },
    created () {
        if (this.$route.path.indexOf('site1') < 0 && this.$route.path !== '/') {
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
    height: 35px;
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
    height: 0px;
}
.advert {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
.advert img {
    width: 100%;
}
.body-content {
    min-height: 300px;
}
.footer {
    width: 100%;
    background: rgb(17, 17, 17);
    color: #666;
    padding: 5px;
    line-height: 30px;
    font-size: 14px;
    /* text-align: center; */
}
.footer .my-friendly {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
}
.footer .my-friendly a {
    display: inline-block;
    color: #666;
    padding-right: 5px;
}
.footer .h5 {
    max-width: 1200px;
    margin: 0 auto;
    border-top: 1px solid #191717;
    box-shadow: 4px -3px 18px rgba(51, 51, 51, 0.1);
    margin-top: 5px;
}
@media screen and (max-width: 600px) {
    .h5-display {
        display: none;
    }
    .header .cont .notice-h5,
    .pc-display {
        display: block;
    }
    .header .cont .rf {
        padding-right: 5px;
    }
    .header .cont .notice-pc {
        display: none;
    }
    /* .banner {
        height: 100px;
    } */
    .my-nav {
        height: 35px;
        line-height: 35px;
    }
    .my-nav ul li {
        width: 25%;
    }
    .notice-message {
        height: 30px;
        line-height: 30px;
    }
}
</style>
