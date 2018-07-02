<template>
    <div class="site2-detail" id="site2-detail">
        <div id="detail-content" style="display:none;"></div>
        <div class="my-content">
            <video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" style="margin:0 auto" width = 600; height = 400;>
                <!-- <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> -->
            </video>
        </div>
        <div class="clr"></div>
    </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
export default {
    data () {
        return {

        }
    },
    methods: {
        getContent () {
            let vm = this;
            let cont = 0;
            let video = '';
            let timer = setInterval(function () {
                cont += 50;
                video = document.querySelectorAll('#detail-content video.video-js source');
                if (video.length) {
                    clearInterval(timer);
                    getVideo()
                } else if (cont > 3000) {
                    clearInterval(timer)
                    alert('数据丢失，请联系管理员。QQ:3257905932')
                }
            }, 50)
            function getVideo () {
                console.log(document.body.clientWidth)
                let width = 600;
                let height = 400;
                for (let i = 0; i < video.length; i++) {
                    document.getElementById('my-video').appendChild(video[i]);
                }
                if (document.body.clientWidth < 600) {
                    width = document.body.clientWidth;
                    height = 200;
                } 
                document.getElementById('detail-content').innerHTML = '';
                console.log(video)
                videojs('my-video', {
                    // bigPlayButton: false,  // 播放按钮
                    // textTrackDisplay: false,
                    // posterImage: true,   // 封面图片
                    // errorDisplay: false,
                    // controlBar: true,    // 控制条
                    techOrder: ["html5", "flash"],
                    width: width,//宽string|number
                    height: height,//高：string|number
                    controls: true,//控制条：boolean
                    preload: "none",//预加载：string；'auto'|'true'|'metadata'|'none'
                    poster: '/static/img/ashun.png',//预览图：string
                    autoplay: false,//自动播放：boolean
                    loop: true,//循环：boolean
                    muted: true,//静音：boolean
                    // flash: {
                    //     hls: { withCredentials: false },
                    //     swf: '/static/js/video-js.swf'
                    // }
                });
            }
        },
    },
    created () {
        let params = this.$route.params;
        this.$http.get('/site2/' + params.id + '/' + params.name + '/').then(response => {
            //  console.log(response.data)  
            if (!response.data) {
                alert('数据出错，请刷新页面或切换其他区域');
                return;
            }
            let REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
            let result = REG_BODY.exec(response.data);
            let html = document.getElementById('detail-content');
            html.innerHTML = response.data;
            this.getContent();
        })
    }
}
</script>

<style scoped>
.site2-detail .my-content {
    max-width: 1200px;
    width: 98%;
    margin: 20px auto;
    position: relative;
    z-index: 3;
}
</style>
