<template>
    <div class="detail" id="my-detail">
        <div class="content" v-html="content"></div>
        <a @click="goDown">下载本片</a>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                content: '',
                hr: '',
                id: ''
            }
        },
        methods: {
            goDown () {
                window.open('http://localhost:8081/download?dir=file&name='+this.id +'.torrent')
                // this.$http.get('/api/download?dir=/file&name='+this.id +'.torrent').then(response => {
                //     console.log(response, 789456)
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

                    // 设置下载链接
                    var divEles = document.getElementById('my-detail').children;
                    var txt = '';
                    eachList(divEles);
                    function eachList(data) {
                        for (var i = 0; i < data.length; i++) {
                            var found = false;
                            if (data[i].getAttribute('href')) data[i].setAttribute('href', '###');
                            if (data[i].getAttribute('onmouseover')) data[i].removeAttribute('onmouseover');
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
                                        // child[j].removeAttribute('onmouseover');
                                        child[j].setAttribute('id', 'my-down');
                                        console.log(235345)
                                        found = true;
                                        break;
                                    };
                                };
                            };
                            if (!found) {
                                var childList = data[i].children;
                                eachList(childList);
                            };
                        };
                    };              
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
        width: 1000px;
        margin: 0 auto;
    }
    .detail .content >>> table{
        text-align: left;
    }
    .detail >>> #toubiao, .detail >>> .xg1, .detail >>> .xw1{
        display: none;
    }
</style>
