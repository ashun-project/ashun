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
            showDo: false
        }
    },
    methods: {
        reset (dem) {
            let vm = this;
            // 过滤元素下载链接
            var divEles = dem.children;
            var txt = '';
            eachList(divEles);
            function eachList (data) {
                for (var i = 0; i < data.length; i++) {

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
                    if (data[i].getAttribute('href') && data[i].getAttribute('href').indexOf('http://www.fd2563.com') > -1) {
                        data[i].parentNode.removeChild(data[i]);
                    }
                    // if (data[i].firstChild) {
                    //     txt = data[i].firstChild.nodeValue || '';
                    // } else {
                    //     txt = data[i].innerText || '';
                    // };
                    // if (txt.indexOf('下载次数') > -1) {
                    //     var ev = data[i].parentNode;
                    //     var child = ev.getElementsByTagName('a');
                    //     var hf = '';
                    //     var cla = '';
                    //     for (var j = 0; j < child.length; j++) {
                    //         hf = child[j].getAttribute('href');
                    //         cla = child[j].getAttribute('class') || '';
                    //         if (hf.indexOf('forum.php?mod') > -1 && cla.indexOf('xw1') < 0) {
                    //             ev.parentNode.removeChild(ev);
                    //             console.log(235345)
                    //         };
                    //     };
                    // };
                    // if (data[i].getAttribute('onmouseover')) data[i].removeAttribute('onmouseover');
                    // if (data[i].getAttribute('onclick')) data[i].removeAttribute('onclick');
                    // if (data[i].getAttribute('title') === '帖子模式') {
                    //     data[i].parentNode.removeChild(data[i]);
                    // }
                    // if (data[i] && data[i].getAttribute('src') === 'https://static.wifi588.net/static/image/filetype/torrent.gif') {
                    //     data[i].parentNode.removeChild(data[i]);
                    // }
                    if (data[i]) {
                        var childList = data[i].children;
                        eachList(childList);
                    }

                };
            };
            let getA = dem.querySelectorAll('a');
            for (var i = 0; i < getA.length; i++) {
                getA[i].setAttribute('my-data', getA[i].getAttribute('href'));
                getA[i].removeAttribute('href');
            }
            console.log(getA);
        },
        getClike () {
            let vm = this;
            let $Video = '';
            // let $nav = '';
            // let $page = '';
            let cont = 0;
            let timer2 = setInterval(function () {
                cont += 50;
                // pc 端事件注册
                $Video = document.querySelectorAll('.portfolio-item a');
                // $nav = document.querySelectorAll('ul.nav li a');
                // $page = document.querySelectorAll('ul.pagination li a');
                if ($Video) {
                    console.log($Video, 'zzzzzzzzzzzzzzzzzzz')
                    clearInterval(timer2);
                    successContent($Video, '1');
                    // successContent($nav, '2');
                    // successContent($page, '3');
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
                        }// else {
                        //     vm.content = false;
                        //     vm.getHtml(hrf)
                        // }
                        // vm.$router.push({name: 'site2Detail', params: {id: arr[0], name: arr[1]}})
                        event.preventDefault();
                    }
                }
            }
        },
        getContainer () {
            let vm = this;
            let cont = 0;
            // this.$nextTick(() => {})
            let dom = document.getElementById('site2-content');
            // let content = '';
            let foot = '';
            let timer = setInterval(function () {
                cont += 50;
                // content = dom.children;
                // console.log(content, '============')
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
        }
    },
    created () {
        this.$http.get('/site2/?m=vod-type-id-2.html').then(response => {
            let reTag = /<body(?:.|\s)*?<\/body>/g;
            let result = reTag.exec(response.data);
            if (result && result[0]) {
                this.html = result[0].replace(/<body[^>]*>|<\/body>/, '');
            }

            console.log(this.html, '-------------')
            this.getContainer();
        })
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
.site2 >>> .page-header {
    display: none;
}
.site2 >>> a {
    cursor: pointer;
}
.site2 >>> .top-nav {
    width: 100%;
    background: #2d2d2d;
    padding: 10px;
    border-bottom: 1px solid #666;
    font-size: 16px;
}
.site2 >>> .top-nav a {
    color: rgb(248, 248, 248);
    display: inline-block;
    margin-right: 10px;
}
.site2 >>> .top-nav a.this {
    border-bottom: 2px solid #ff6738;
}
.site2 >>> .row {
    clear: both;
}
.site2 >>> .portfolio-item {
    width: 25%;
    height: 230px;
    font-size: 14px;
    float: left;
    text-align: center;
    background: #0e0e0e;
    color: #ccc;
    padding-top: 10px;
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
.site2 >>> .class-feed-btn2 ul {
    background: #2d2d2d;
    display: flex;
    align-items: center;
    padding: 10px;
}
.site2 >>> .class-feed-btn2 li {
    font-size: 14px;
    margin-right: 10px;
    color: #fff;
}
.site2 >>> .class-feed-btn2 li a {
    color: #dedede;
}
.site2 >>> .news-feed-btn {
}
</style>

