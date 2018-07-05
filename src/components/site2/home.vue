<template>
    <div class="site2">
        <div id="site2-content" class="video" v-show="showDo" v-html="html"></div>
        <div class="clr"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            html: '',
            showDo: false,
            isMobile: ''
        }
    },
    methods: {
        reset (dem) {
            let vm = this;
            // 过滤元素下载链接
            var divEles = dem.children;
            var txt = ['首页', '激情图区', '情色小说', '采集插件', '采集教程', '采集福利'];
            eachList(divEles);
            function eachList (data) {
                for (var i = 0; i < data.length; i++) {
                    // 去除from表单
                    if (data[i].getAttribute('action') === '/index.php?m=vod-search') {
                        // console.log(data[i].parentNode, '===')
                        getParent(data[i].parentNode);
                        function getParent (pat) {
                            let classN = pat.getAttribute('class');
                            console.log(classN)
                            if (classN.indexOf('row')) {
                                pat.parentNode.removeChild(pat);
                            } else {
                                getParent(pat.parentNode);
                            }
                        }
                    }
                    // 去除横幅广告
                    if (data[i].getAttribute('href') && data[i].getAttribute('href').indexOf('http://www.fd2563.com') > -1) {
                        data[i].parentNode.removeChild(data[i]);
                    }
                    // 循环
                    if (data[i]) {
                        var childList = data[i].children;
                        eachList(childList);
                    }
                };
            };

            let imgs = dem.querySelectorAll('img');
            let getA = dem.querySelectorAll('a');
            // 去除a链接
            for (var i = 0; i < getA.length; i++) {
                getA[i].setAttribute('my-data', getA[i].getAttribute('href'));
                getA[i].removeAttribute('href');
                if (txt.some(item => {
                    return getA[i].text.indexOf(item) > -1;
                })) {
                    if (getA[i].parentNode.getAttribute('class') && getA[i].parentNode.getAttribute('class').indexOf('top-nav') > -1) {
                        getA[i].parentNode.removeChild(getA[i])
                    }
                }
            }
            // 添加完整的图片路径
            for (var i = 0; i < imgs.length; i++) {
                let src = imgs[i].getAttribute('src');
                if (src.indexOf('http') === -1) {
                    imgs[i].setAttribute('src', '//www.xhgzyz.com/'+src);
                }
            }
        },
        getClike () {
            let vm = this;
            let $Video = '';
            let $Nav = '';
            let $Menu = '';
            let $page = '';
            let cont = 0;
            let timer2 = setInterval(function () {
                cont += 50;
                // pc 端事件注册
                $Video = document.querySelectorAll('.portfolio-item a');
                $Nav = document.querySelectorAll('.top-nav a');
                $Menu = document.querySelectorAll('.class-feed-btn2 a');
                $page = document.querySelectorAll('.news-feed-btn a');
                console.log($page, '====')
                if ($Video && $Nav && $Menu && $page) {
                    clearInterval(timer2);
                    successContent($Video, '1');
                    successContent($Nav, '2');
                    successContent($Menu, '3');
                    successContent($page, '4');
                } else if (cont > 3000) {
                    clearInterval(timer2)
                    alert('数据丢失，请联系管理员。QQ:3257905932')
                }
            }, 50)
            function successContent (list, type) {
                for (let i = 0; i < list.length; i++) {
                    list[i].onclick = function (event) {
                        console.log(this.getAttribute('my-data'))
                        let hrf = this.getAttribute('my-data');
                        // let arr = hrf.split('/').filter(item => item);
                        if (type === '1') {
                            window.open('#/site2Detail/' + vm.Base64.encode(hrf));
                        } else {
                            vm.getHtml(hrf)
                        }
                        // vm.$router.push({name: 'site2Detail', params: {id: arr[0], name: arr[1]}})
                        event.preventDefault();
                    }
                }
            }
        },
        getContainer () {
            let vm = this;
            let cont = 0;
            let dom = document.getElementById('site2-content');
            let foot = '';
            let timer = setInterval(function () {
                cont += 50;
                if (dom.children) {
                    clearInterval(timer)
                    foot = document.getElementsByTagName('footer')[0];
                    if (foot) foot.parentNode.removeChild(foot);
                    vm.reset(dom);
                    vm.getClike();
                    // dom.innerHTML = content.innerHTML;

                    vm.showDo = true;
                } else if (cont > 3000) {
                    clearInterval(timer)
                    alert('数据丢失，请联系管理员。QQ:3257905932')
                }
                console.log('轮询=====1')
            }, 50);
        },
        getHtml (param) {
            this.$http.get('/site2' + param).then(response => {
                let reTag = /<body(?:.|\s)*?<\/body>/g;
                let result = reTag.exec(response.data);
                if (result && result[0]) {
                    this.html = result[0].replace(/<body[^>]*>|<\/body>/, '');
                }

                // console.log(this.html, '-------------')
                this.getContainer();
            })
        }
    },
    created () {
        let ua = navigator.userAgent;
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        let isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        let isAndroid = ua.match(/(Android)\s+([\d.]+)/);
        this.isMobile = isIphone || isAndroid;
        this.getHtml('/?m=vod-type-id-2.html');
    }
}

</script>

<style scoped>
.site2 .video {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    /* background: #333; */
}
.site2 >>> .navbar-header,
.site2 >>> .portfolio-item .uptime,
.site2 >>> .page-header, .site2 >>> .news-feed-btn .pagego, .site2 >>> .news-feed-btn .pagebtn{
    display: none;
}
.site2 >>> a {
    cursor: pointer;
}
.site2 >>> .news-feed-btn a:hover, 
.site2 >>> .top-nav a:hover,
.site2 >>> .class-feed-btn2 a:hover{
    background: #e62948;
    color: #FFF;
}
.site2 >>> .top-nav {
    width: 100%;
    background: #2d2d2d;
    padding: 0 5px;
    border-bottom: 1px solid #666;
    font-size: 16px;
}
.site2 >>> .top-nav a {
    color: rgb(248, 248, 248);
    display: inline-block;
    padding: 0 5px;
    line-height: 35px;
}
.site2 >>> .top-nav a.this {
    border-bottom: 2px solid #ff6738;
}
.site2 >>> .row {
    clear: both;
}
.site2 >>> .portfolio-item {
    width: 25%;
    height: 215px;
    font-size: 14px;
    float: left;
    text-align: center;
    background: #0e0e0e;
    color: #ccc;
    padding: 5px 0;
    overflow: hidden;
}
.site2 >>> .portfolio-item a {
    display: inline-block;
    width: 100%;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
}
.site2 >>> .portfolio-item .v-title{
    margin-top: -6px;
}
.site2 >>> .portfolio-item:hover a{
    color: #e62948;
}
.site2 >>> .class-feed-btn2 ul {
    background: #2d2d2d;
    display: flex;
    align-items: center;
    padding: 10px;
    flex-wrap: wrap;
    line-height: 25px;
}
.site2 >>> .class-feed-btn2 li {
    font-size: 14px;
    margin-right: 10px;
    color: #fff;
}
.site2 >>> .class-feed-btn2 li a {
    background: #171717;
    color: #FFFFFF;
    text-decoration: none;
    font-size: 12px;
    font-family: "微軟正黑體", "新細明體";
    border-radius: 2px;
    padding-top: 5px;
    padding-right: 12px;
    padding-bottom: 5px;
    padding-left: 12px;
}
.site2 >>> .news-feed-btn {
    color: #CCC;
    line-height: 35px;
    font-size: 0px;
    padding: 15px 10px;
    text-align: center;
}
.site2 >>> .news-feed-btn .pagenow {
    padding: 5px 10px;
    background: #e62948;
    color: #FFFFFF;
    text-decoration: none;
    font-size: 13px;
    font-family: "微軟正黑體", "新細明體";
    border-radius: 2px;
    font-size: 14px;
    margin-right: 2px;
    margin-left: 2px;
}
.site2 >>> .news-feed-btn a {
    background: #171717;
    color: #FFFFFF;
    text-decoration: none;
    font-family: "微軟正黑體", "新細明體";
    border-radius: 2px;
    font-size: 14px;
    margin-right: 2px;
    margin-left: 2px;
    padding-top: 5px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
}

</style>

