<template>
    <div class="detail">
        <div class="content">
            <div v-if="content">
                <div v-if="content === 'error'">内容丢失，请重新选择</div>
                <div v-else>
                    <div class="detail-cont" id="my-detail" v-html="content"></div>
                    <div class="clr"></div><br/>
                    <div class="down-load" :class="{flx: flx}" @click="goDown()">点击下载观看</div>
                    <div class="tip">温馨提示：下载后使用迅雷或其他软件打开即可观看</div>
                </div>
            </div>         
            <my-loading v-else></my-loading>      
        </div>
    </div>
</template>

<script>
    import myLoading from "@/components/common/loading"
    export default {
        data () {
            return {
                content: '',
                flx: false,
                hr: '',
                id: ''
            }
        },
        components: {
            myLoading
        },
        methods: {
            goDown () {
                let host = window.location.host;
                // window.open('http://'+ host +'/api/download?dir=file&name='+this.id);
                window.location.href = 'http://'+ host +'/api/download?dir='+ this.$route.params.title +'&name='+this.id;
                // this.$http.get('/api/download?dir=file&name='+this.id).then(response => {
                //     console.log(response,'============')
                //      window.location.href = 'http://'+ host +'/api/download?dir=file&name='+this.id
                // })
            },
            refreshContent () {
                this.$nextTick(() => {
                    // 更换img的src
                    let img = document.getElementsByTagName('img');
                    for (let i = 0,len = img.length; i < len; i++) {
                        let src = img[i].getAttribute('file');
                        if (src) {
                            let src2 = src.replace('https:', '');
                            img[i].setAttribute('src', src2);
                        }
                    }

                    // 过滤元素下载链接
                    var divEles = document.getElementById('my-detail').children;
                    var txt = '';
                    eachList(divEles);
                    function eachList(data) {
                        for (var i = 0; i < data.length; i++) {
                            
                            
                            if (data[i].firstChild) {
                                txt = data[i].firstChild.nodeValue || '';
                            } else {
                                txt = data[i].innerText || '';
                            };
                            if (txt.indexOf('下载次数') > -1) {
                                var ev = data[i].parentNode;
                                var child = ev.getElementsByTagName('a');
                                var hf = '';
                                var cla = '';
                                for (var j = 0; j < child.length; j++) {
                                    hf = child[j].getAttribute('href');
                                    cla = child[j].getAttribute('class') || '';
                                    if (hf.indexOf('forum.php?mod') > -1 && cla.indexOf('xw1') < 0) {
                                        ev.parentNode.removeChild(ev);
                                        console.log(235345)
                                    };
                                };
                            };
                            if (data[i].getAttribute('onmouseover')) data[i].removeAttribute('onmouseover');
                            if (data[i].getAttribute('onclick')) data[i].removeAttribute('onclick');
                            if (data[i].getAttribute('title') === '帖子模式') {
                                data[i].parentNode.removeChild(data[i]);
                            }
                            if (data[i] && data[i].getAttribute('src') === 'https://static.wifi588.net/static/image/filetype/torrent.gif') {
                                data[i].parentNode.removeChild(data[i]);
                            }
                            if (data[i]) {
                                var childList = data[i].children;
                                eachList(childList);
                            }
                            
                        };
                    };

                    // 去除a链接
                    let a = document.getElementsByTagName('a');
                    for (let i = 0,len = a.length; i < len; i++) {
                        a[i].setAttribute('href', '###');
                    }        
                })
            },
            // 处理手机端点击元素兼容问题
            getPosition () {
                let vm = this;
                this.$nextTick(() => {
                    vm.currentPoistion()
                    document.addEventListener('scroll', function () {
                        vm.currentPoistion()
                    })
                })
            },
            currentPoistion () {
                let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;
                let hig = document.documentElement.clientHeight;
                let wid = document.documentElement.offsetWidth;
                let scroH = document.documentElement.scrollHeight;
                if (wid < 1000 && (scroH - top - hig) < 100 ) {
                    this.flx = true;
                } else {
                    this.flx = false;
                }
            }
        },
        mounted () {
            
        },
        created () {
            this.id = this.$route.params.id;
            this.hr = '/file/'+this.id +'.torrent' 
            this.$http.post('/api/getDetail', {id: this.id, title: this.$route.params.title}).then(response => {
                console.log(response)
                if (response.data === 'error') {
                    this.content = response.data;
                } else {
                    let re = /<ignore_js_op>|<\/ignore_js_op>/gi;
                    this.content = response.data.content.replace(re, '');
                    this.refreshContent();
                    this.getPosition();
                }
            })
        }
    }
</script>

<style scoped>
    .detail .content{
        max-width: 1200px;
        width: 100%;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #eee;
        min-height: 260px;
        position: relative;
        background: #fff;
    }
    .detail .content >>> table{
        text-align: left;
    }
    .detail >>> #toubiao, .detail >>> .xg1, .detail >>> .xw1{
        display: none;
    }
    .detail .content >>> img{
        max-width: 800px;
    }
    .detail .content .down-load{
        cursor: pointer;
        color: #f1909c;
        text-decoration: underline;
    }
    .detail .tip{
        font-size: 16px;
        color: #666;
    }
    .flx{
        position: fixed;
        bottom: 120px;
        left: 10px;
        right: 10px;
        z-index: 1000;
        background: #fff;
    }
    @media screen and (max-width: 800px) {
        .detail .content{
            padding: 10px;
        }
        .detail .content >>> img{
            max-width: 100% !important;
            height: auto !important;
        }
        .detail .tip{
            font-size: 0.6rem;
        }
    }
</style>
