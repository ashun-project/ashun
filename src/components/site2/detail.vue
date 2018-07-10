<template>
    <div class="site2-detail">
        <div id="video"></div>
        <div class="down-link" v-if="downLink">
            <span>下载地址:</span>
            {{'http'+downLink.split('http')[1].replace(/全|集|\$|\"|\'/gi, '')}}
        </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            recommend: '',
            downLink: '',
            url: ''
        }
    },
    methods: {
        getUrl () {
            if (!this.url) {
                alert('获取资源失败， 请切换其他资源')
                return;
            }
            let vm = this;

            let url = 'http'+this.url.split('http')[1];
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
        },
        orUrl (data) {
            let result = '';
            let reTag = /<div class="inputA">(?:.|\s)*?<\/div>/g;
            let reTagMore = /value=\"(?:.|\s)*?\"/g;
            let testResult = data.match(reTag);
            if (testResult && testResult[0]) {
                result = testResult[0].match(reTagMore);
            }
            return result;
        }
    },
    created () {
        let vm = this;
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
                result2 = vm.orUrl(response.data);
                vm.url = result2[0].replace(/\"|\'/gi, '');
            }
            vm.getUrl();
            if (!result2) result2 = vm.orUrl(response.data);
            vm.downLink = result2 ? result2[1] : '';
            // console.log(result2, '=================');
        })
    }
}

</script>

<style scoped>
.site2-detail {
    max-width: 1200px;
    width: 100%;
    margin: 10px auto;
    padding: 10px;
    background: #0e0e0e;
}
.site2-detail #video {
    width: 100%;
    max-width: 600px;
    height: 400px;
}
.down-link{
    line-height: 35px;
    background: #1f1e1e;
    color: #ccc;
    font-size: 16px;
    padding: 0 10px;
    margin-top: 10px;
}
@media screen and (max-width: 800px) {
    .site2-detail #video {
        height: 200px;
    }
}
</style>
