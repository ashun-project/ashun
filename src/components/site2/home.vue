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
            function eachList(data) {
                for (var i = 0; i < data.length; i++) {
                    
                    if(data[i].getAttribute('action') === '/index.php?m=vod-search') {
                        // console.log(data[i].parentNode, '===')
                        getParent(data[i].parentNode);
                        function getParent(pat) {
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
        getContainer () {
            let vm = this;
            let cont = 0;
            // this.$nextTick(() => {})
            let dom = document.getElementById('site2-content');
            let content = '';
            let foot = '';
            let timer = setInterval(function () {
                cont += 50;
                content = document.getElementsByClassName('container')[0];
                
                // foot.parentNode.removeChild(foot);
                // console.log(foot, '--------')
                // if (foot) {
                    
                // }
                if (content) {
                    clearInterval(timer)
                    foot = document.getElementsByTagName('footer')[0];
                    // foot.innerHTML('')
                    // console.log(foot.parentNode, '--------')
                    foot.parentNode.removeChild(foot);
                    vm.reset(content);
                    dom.innerHTML = content.innerHTML;

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

            //col-md-3 portfolio-item new-video
            let reTag1 = /<div class="col-md-9 top-nav">(?:.|\s)*?<\/div>/g;
            let reTag2 = /<div class="col-md-12 class-feed-btn2">(?:.|\s)*?<\/div>/g;
            let reTag = /<div class="container">(?:.|\s)*?<\/div>/g;
            this.html = response.data;
            let menu1 = reTag1.exec(response.data);
            let menu2 = reTag2.exec(response.data);
            this.getContainer();
            //<div class="col-md-9 top-nav">
            // console.log(this.html)
        })
    }
}

</script>

<style scoped>
    .site2 .video{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        /* background: #333; */
    }
    .site2 >>> .navbar-header, .site2 >>> .portfolio-item .uptime, .site2 >>> .page-header{
        display: none;
    }
    .site2 >>> .top-nav{
        width: 100%;
    }
    .site2 >>> .row{
        clear: both;
    }
    .site2 >>> .portfolio-item{
        width: 25%;
        height: 230px;
        font-size: 14px;
        float: left;
        text-align: center;
        background: #000;
        color: #ccc;
    }
    .site2 >>> .portfolio-item a{
        display: inline-block;
        width: 100%;
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
    }
</style>

