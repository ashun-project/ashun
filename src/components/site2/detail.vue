<template>
    <div class="site2-detail">
        <div id="video"></div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            recommend: '',
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

            let url = this.url.replace(/全|集|\$/gi, '');
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
    created () {
        let vm = this;
        let params = this.$route.params;
        let id = this.Base64.decode(params.id);
        if (id.substr(0, 1) !== '/') id = '/' + id;
        this.$http.get('/site2' + id).then(response => {
            if (!response.data) return;
            let reTag = /mac_url=unescape(?:.|\s)*?\);/g;
            let rul = /mac_url=unescape\(\'|\'\)\;|\"/gi;
            let result = reTag.exec(response.data);
            if (result && result[0]) {
                vm.url = unescape(result[0].replace(rul, ''));
            } else {
                let reTag2 = /\"全集\$(?:.|\s)*?\"/g;
                let result2 = reTag2.exec(response.data);
                if (result2 && result2[0]) {
                    vm.url = result2[0].replace(/\"|\'/gi, '');
                }
            }
            vm.getUrl();
            // console.log(response.data, '===============')
            let reTag3 = /<div class=\"col-sm-3 col-xs-6\">(?:.|\s)*?<\/div>/g;
            let result3 = response.data.match(reTag3);
            console.log(result3, '=================');
            this.recommend = result3;
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
    width: 600px;
    height: 400px;
    margin: 0 auto;
}
</style>
