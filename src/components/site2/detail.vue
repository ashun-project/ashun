<template>
    <div class="site2-detail" :class="{mobile: isMobile}">
        <div class="rent">
            <img src="@/resource/img/rent.gif" alt="">
        </div>
        <div id="video"></div>
        <div class="down-link" v-if="downLink">
            <span>下载地址:</span>
            {{'http'+downLink.split('http')[1].replace(/全|集|\$|\"|\'/gi, '')}}
        </div>
        <div id="my-recommend" class="recommend" v-if="recommend">
            <div class="recom-title">
                更多推荐
            </div>
            <div id="my-content" class="recom-content" v-html="recommend"></div>
        </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            recommend: '',
            downLink: '',
            url: '',
            isMobile: ''
        }
    },
    methods: {
        getUrl () {
            if (!this.url) {
                alert('获取资源失败， 请切换其他资源')
                return;
            }
            let vm = this;

            let url = 'http' + this.url.split('http')[1];
            if (url.indexOf('https') > -1) {
                let $iframe = document.createElement('iframe');
                let $video = document.getElementById('video');
                $iframe.src = "https://api.xhgzyz.com/m3u8.php?url=" + url;
                $video.appendChild($iframe);
            } else {
                var videoObject = {
                    container: '#video', //容器的ID或className
                    variable: 'player',//播放函数名称
                    flashplayer: true,
                    poster: '/static/img/ashun.png',//封面图片
                    video: url
                    // video: [//视频地址列表形式
                    //     [video, 'video/mp4', '中文标清', 0],
                    //     [video, 'video/mp4', '中文高清', 0],
                    //     [video, 'video/mp4', '英文高清', 10],
                    //     [video, 'video/mp4', '英文超清', 0],
                    // ]
                };
                var player = new ckplayer(videoObject);
            }
        },
        getOrUrl (data) {
            let result = '';
            let reTag = /<div class="inputA">(?:.|\s)*?<\/div>/g;
            let reTagMore = /value=\"(?:.|\s)*?\"/g;
            let testResult = data.match(reTag);
            if (testResult && testResult[0]) {
                result = testResult[0].match(reTagMore);
            }
            return result;
        },
        getRecommend (data) {
            let vm = this;
            let reTag = '';
            let result = '';
            if (vm.isMobile) {
                reTag = /<div class=\"video__wrap\">(?:.|\s)*?<\/footer/g;
                result = data.match(reTag);
                if (result && result.length) {
                    this.recommend = result[0].replace(/<\/footer/g, '');
                    this.getClick();
                }
            } else {
                reTag = /<div class=\"col-sm-3 col-xs-6\"><a(?:.|\s)*?<\/div>/g;
                result = data.match(reTag);
                // let conetent
                if (result && result.length) {
                    this.recommend = result.join('');
                    this.getClick();
                }
            }
        },
        getClick () {
            let vm = this;
            let cont = 0;
            let dom = '';
            let timer = setInterval(function () {
                cont += 50;
                dom = document.getElementById('my-content');
                if (dom && dom.children) {
                    clearInterval(timer);
                    let evnList = dom.querySelectorAll('a');
                    for (let i = 0; i < evnList.length; i++) {
                        evnList[i].setAttribute('my-data', evnList[i].getAttribute('href'));
                        evnList[i].removeAttribute('href');
                        evnList[i].onclick = function (event) {
                            let hrf = this.getAttribute('my-data');
                            // window.location.href = '#/site2Detail/' + vm.Base64.encode(hrf);
                            vm.$router.push({ params: { id: vm.Base64.encode(hrf) } });
                            document.location.reload();
                            event.preventDefault();
                        }
                    }
                } else if (cont > 3000) {
                    clearInterval(timer)
                    alert('数据丢失，请联系管理员。QQ:3257905932')
                }
                console.log('轮询=====1')
            }, 50);
        },
        getHtml () {
            let vm = this;
            // 判断是不是手机端
            let ua = navigator.userAgent;
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            let isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            let isAndroid = ua.match(/(Android)\s+([\d.]+)/);
            this.isMobile = isIphone || isAndroid;

            let params = this.$route.params;
            let id = this.Base64.decode(params.id);
            let result2 = '';

            if (id.substr(0, 1) !== '/') id = '/' + id;
            this.$http.get('/site2' + id).then(response => {
                if (!response.data) return;
                let reTag = /mac_url=unescape(?:.|\s)*?\);/g;
                let rul = /mac_url=unescape\(\'|\'\)\;|\"/gi;
                let result = reTag.exec(response.data);
                if (result && result[0]) {
                    vm.url = unescape(result[0].replace(rul, ''));
                } else {
                    result2 = vm.getOrUrl(response.data);
                    vm.url = result2[0].replace(/\"|\'/gi, '');
                }
                vm.getUrl();

                // 其他的数据
                vm.getRecommend(response.data);
                if (!result2) result2 = vm.getOrUrl(response.data);
                vm.downLink = result2 ? result2[1] : '';
                // console.log(result2, '=================');
            })
        }
    },
    created () {
        this.getHtml();
    }
}

</script>

<style>
.site2-detail {
    max-width: 1200px;
    width: 100%;
    margin: 10px auto;
    padding: 10px;
    background: #0e0e0e;
    position: relative;
}
.site2-detail #video {
    width: 100%;
    max-width: 600px;
    height: 400px;
}
.site2-detail iframe {
    width: 100%;
    height: 100%;
    border: 0;
}
.site2-detail .down-link {
    line-height: 35px;
    background: #1f1e1e;
    color: #ccc;
    font-size: 16px;
    padding: 0 10px;
    margin-top: 10px;
}
.site2-detail .rent {
    position: absolute;
    top: 10px;
    right: 10px;
}
.site2-detail .recommend .recom-title {
    font-size: 16px;
    border-left: 5px solid #e62948;
    padding-left: 10px;
    color: #ccc;
    margin: 15px 0;
}
.site2-detail .recommend .recom-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.site2-detail .recommend .recom-content > div {
    margin: 5px 10px;
    font-size: 14px;
    text-align: center;
}
.site2-detail .recommend .recom-content img {
    display: block;
}

/* 手机端 */
.site2-detail.mobile #video {
    height: 200px;
}
.site2-detail.mobile .rent {
    display: none;
}
.site2-detail.mobile .recommend .recom-content .video__wrap {
    width: 100%;
    margin: 0;
}
.site2-detail.mobile .recommend .recom-content a {
    display: block;
    width: 100%;
    padding: 5px;
}
.site2-detail.mobile .recommend .recom-content a img {
    width: 100%;
}
/* @media screen and (max-width: 800px) {
    .site2-detail #video {
        height: 200px;
    }
    .site2-detail .rent {
        display: none;
    }
} */
</style>
