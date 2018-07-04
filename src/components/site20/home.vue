<template>
    <div class="site2">
        <div id="site2-content" class="video" v-show="content"></div>
        <div class="clr"></div>
    </div>
</template>

<script>
// import './css/bootstrap.min.css';
// import './css/font-awesome.min.css';
// import './css/style.css';
// import './css/bootstrap-theme-light-green.css';
// import './css/responsivepx.css';
export default {
    data () {
        return {
            content: ''
        }
    },
    watch: {
        $route () {
            // this.getHtml()
        }
    },
    mounted () {

    },
    methods: {
        reset () {
            let vm = this;
            timer = setInterval(function () {
                // var $srcipt = $('.video script[src]');
                var $link = $('.video link[href]');
                // var $form = $('.video form[action]');
                var $a = $('.video a[href]');
                // var $iframe = $('.video iframe[src]');
                console.log($iframe)
                // attr($srcipt.length, 'script[src]', 'src');
                attr($link.length, 'link[href]', 'href');
                // attr($form.length, 'form[action]', 'action');
                attr($a.length, 'a[href]', 'href', 'a');
                // attr($iframe.length, 'iframe[src]', 'src');

                function attr (len, label, attr, a) {
                    for (var i = 0; i < len; i++) {
                        let src = $(label).eq(i).attr(attr);
                        if (attr === 'action') {
                            if (src.substr(0, 2) !== '/#') {
                                $(label).eq(i).attr('onsubmit', true)
                                $(label).eq(i).attr('target', '')
                                $(label).eq(i).attr(attr, '/#/' + src)
                            }
                        } else if (a) {
                            if (src && src.substr(0, 2) !== '###') {
                                $(label).eq(i).attr('target', '')
                                $(label).eq(i).attr('data', src)
                                $(label).eq(i).css('display', 'inline-block')
                                $(label).eq(i).removeAttr(attr)
                            }
                        } else {
                            if (src && src.indexOf('http') === -1) {
                                $(label).eq(i).attr(attr, 'http://www.qyule.tv/' + src)
                            }
                        }
                    }
                }
            }, 100);
            setTimeout(function () {
                clearInterval(timer)
            }, 6000)
        },
        getContent () {
            let vm = this;
            let cont = 0;
            // this.$nextTick(() => {})
            let dom = document.getElementById('site2-content');
            let content = '';
            let timer = setInterval(function () {
                cont += 50;
                content = document.getElementById('content');

                if (content) {
                    clearInterval(timer)
                    dom.innerHTML = content.innerHTML;
                    vm.content = true;
                    vm.getClike();
                } else if (cont > 3000) {
                    clearInterval(timer)
                    alert('数据丢失，请联系管理员。QQ:3257905932')
                }
                console.log('轮询=====1')
            }, 50);
        },
        getClike () {
            let vm = this;
            let $Video = '';
            let $nav = '';
            let $page = '';
            let cont = 0;
            let timer2 = setInterval(function () {
                cont += 50;
                $Video = document.querySelectorAll('ul.videos li a');
                $nav = document.querySelectorAll('ul.nav li a');
                $page = document.querySelectorAll('ul.pagination li a');
                if ($nav && $Video && $page) {
                    clearInterval(timer2);
                    successContent($Video, '1');
                    successContent($nav, '2');
                    successContent($page, '3');
                } else if (cont > 3000) {
                    clearInterval(timer2)
                    alert('数据丢失，请联系管理员。QQ:3257905932')
                }
            }, 50)
            function successContent (list, type) {
                for (let i = 0; i < list.length; i++) {
                    list[i].setAttribute('my-data', list[i].getAttribute('href'))
                    list[i].removeAttribute('href');
                    list[i].onclick = function (event) {
                        event.preventDefault();
                        let hrf = this.getAttribute('my-data');
                        let arr = hrf.split('/').filter(item => item);
                        if (type === '1') {
                            window.open('#/site2Detail/' + arr[0] + '/' + arr[1], '_blank');
                        } else {
                            vm.content = false;
                            vm.getHtml(hrf)
                        }
                        // vm.$router.push({name: 'site2Detail', params: {id: arr[0], name: arr[1]}})
                        event.preventDefault();
                    }
                }
            }
        },
        getHtml (param) {
            let vm = this;
            let url = '/site2' + param
            // this.$http.post(url, { label: label }).then(response => {
            this.$http.get(url).then(response => {
                console.log(response.data)
                if (!response.data) {
                    alert('数据出错，请刷新页面或切换其他区域');
                    return;
                }
                var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
                var result = REG_BODY.exec(response.data);
                var html = document.getElementById('site2-content');
                html.innerHTML = result;
                vm.getContent();
                vm.refreshContent();
            })
        },
        refreshContent () {
            this.$nextTick(() => {
                // 过滤元素下载链接
                var divEles = document.getElementById('site2-content').children;
                var txt = '';
                eachList(divEles);
                function eachList (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].firstChild) {
                            txt = data[i].firstChild.nodeValue || '';
                        } else {
                            txt = data[i].innerText || '';
                        };
                        if (txt.indexOf('热门标签') > -1) {
                            var ev = data[i].parentNode.parentNode;
                            ev.parentNode.removeChild(ev);
                        };
                        if (data[i]) {
                            var childList = data[i].children;
                            eachList(childList);
                        }

                    };
                };
            })
        }
    },
    created () {
        this.getHtml('')
    }
}
</script>

<style scoped>
.site2 {
    width: 100%;
    max-width: 1200px;
    min-height: 200px;
    margin: 0 auto;
}
.site2 >>> .panel-heading *,
.site2 >>> .col-md-2 .panel-heading .panel-title,
.site2 >>> .ads,
.site2 .video >>> .panel ul.nav li a span,
.site2 .video >>> .panel ul.videos li .video-rating,
.site2 .video >>> .panel ul.videos li .video-overlay,
.site2 .video >>> .panel ul.videos li .video-details {
    display: none;
}
.site2 >>> .panel-heading .panel-title {
    display: block;
    font-size: 18px;
    height: 26px;
    line-height: 26px;
    border-left: 5px solid #9c833b;
    margin-top: 15px;
    margin-bottom: 8px;
    padding-left: 10px;
    background: #fff;
    position: relative;
    z-index: 3;
}
.site2 .video >>> .panel ul {
    background: #f2f2f2;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    border: 1px solid #eee;
    padding: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 3px #ccc;
    position: relative;
    z-index: 3;
}
.site2 .video >>> .panel ul li a {
    padding: 0 12px;
    font-size: 16px;
    line-height: 30px;
    border: 1px solid rgb(233, 232, 232);
    box-shadow: 0 0 3px rgba(224, 223, 223, 0.6);
    margin: 4px;
    display: block;
    color: #666;
    border-radius: 2px;
    cursor: pointer;
}
.site2 .video >>> .panel ul li.active a,
.site2 .video >>> .panel ul li a:hover {
    background: rgb(243, 179, 4);
    color: #fff;
}

/* 数据列表 */
.site2 .video >>> .panel ul.videos {
    padding: 5px 0;
}
.site2 .video >>> .panel ul.videos li {
    width: 287px;
    height: 220px;
    margin: 0 5px;
}
.site2 .video >>> .panel ul.videos li a {
    width: 100%;
    height: 100%;
    padding: 0;
}
.site2 .video >>> .panel ul.videos li a .video-title {
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
    overflow: hidden;
    display: inline-block;
    padding: 0 5px;
    font-size: 14px;
    color: #9c833b;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.site2 .video >>> .panel ul.videos li a img {
    width: 100%;
    height: 179px;
    display: table;
}
.site2 .video >>> .panel ul.videos li a:hover .video-title {
    color: #fff;
}

@media screen and (max-width: 600px) {
    .site2 .video >>> .panel ul li a {
        padding: 0 8px;
        font-size: 14px;
        line-height: 26px;
        margin: 2px;
    }
    .site2 .video >>> .panel ul.videos li {
        width: 49%;
        height: 140px;
        margin: 0;
    }
    .site2 .video >>> .panel ul.videos li a img {
        height: 100px;
    }
    .site2 .video >>> .panel ul.videos li a .video-title {
        height: 20px;
    }
}
</style>
