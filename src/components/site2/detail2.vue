<template>
    <div class="site2-detail">
        <video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" style="margin:0 auto" width=600; height=400;>
            <!-- <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> -->
            <source src="http://cdn1.midas-hitech.com:8091/20180703/TTDFlebk/index.m3u8" type="application/x-mpegURL">

        </video>
        <!-- <div class="spare" v-html="html" style="display:none"></div> -->
    </div>
</template>


<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
export default {
    data () {
        return {
            html: '',
            url: ''
        }
    },
    methods: {
        getUrl () {
            let vm = this;
            videojs('my-video', {
                // bigPlayButton: false,  // 播放按钮
                // textTrackDisplay: false,
                // posterImage: true,   // 封面图片
                // errorDisplay: false,
                // controlBar: true,    // 控制条
                techOrder: ["html5", "flash"],
                width: 600,//宽string|number
                height: 400,//高：string|number
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
            })
        }
    },
    created () {
        let vm = this;
        let params = this.$route.params;
        let id = this.Base64.decode(params.id);
        if (id.substr(0, 1) !== '/') id = '/' + id;
        this.$http.get('/site2' + id).then(response => {
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
            console.log(vm.url, '===============')

            // console.log(unescape(reTag.exec(response.data)[0].replace(rul, '')), '-------------')
            // this.getContainer();
        })
    }
}

</script>