<template>
    <div class="detail" id="my-detail">
        <div class="content">
            <div v-html="content"></div>
            <span class="down-load" @click="goDown" v-if="content">点击下载观看</span>
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
                window.open('http://'+ host +'/api/download?dir=file&name='+this.id);
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
            }
        },
        mounted () {
            // document.getElementById('toubiao').remove();
            
        },
        created () {
            this.id = this.$route.params.id;
            this.hr = '/file/'+this.id +'.torrent' 
            this.$http.post('/api/getDetail', {id: this.id}).then(response => {
                console.log(response)
                this.content = response.data[0].content;
                this.refreshContent();
            })
        }
    }
</script>

<style scoped>
    .detail .content{
        width: 1200px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #eee;
        margin-top: 20px;
        min-height: 260px;
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
</style>
