<template>
    <div class="home">
        <div class="data-list">
            <ul>
                <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                    <div>
                        <div class="cont-img">
                            <img :src="item.img.split(',')[0] || '/static/img/errorimg.png'" onerror="this.src='/static/img/errorimg.png'" alt="ashun520.com">
                        </div>
                        <div class="clr"></div>
                        <p class="title">{{replaceWord(item.title)}}</p>
                    </div>
                </li>
                <li class="not-data"></li>
                <li class="not-data"></li>
                <li class="not-data"></li>
            </ul>
            <div class="clr"></div>
        </div>
        <!-- <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination> -->
        <v-pagination :total="total" :currentPage="current" @pagechange="pagechange"></v-pagination>
    </div>
</template>
<script>
import vPagination from "@/components/common/page"
export default {
    data () {
        return {
            list: [],
            total: 0,
            current: 1
        }
    },
    components: {
        vPagination
    },
    watch: {
        $route (n, o) {
            console.log(n, '===============')
            this.getList(1)
        }
    },
    methods: {
        replaceWord (item) {
            let rul = /【m3u8】|\[m3u8\]|【mp4下载】|\[mp4下载\]|【MP4\/.+】|\[MP4\/.+\]|【RV原创】|【精品RV原创】|【无码\/MP4\/.+】|【杏吧】/gi;
            return item.replace(rul, '')
        },
        goDetail (item) {
            let url = '#/site1Home/detail/';
            if (this.$route.params.label && this.$route.params.label.indexOf('video') > -1) {
                url = '#/site1Home/videoDetail/';
            }
            window.open(url + this.$route.params.label + '/' + item.id, '_blank');
        },
        pagechange (num) {
            this.getList(num)
        },
        getList (current) {
            console.log(this.$route.params.label, '==========')
            this.list = [];
            this.total = 0;
            this.$http.post('/api/getList', { current: current, title: this.$route.params.label }).then(response => {
                if (!response.data || response.data.length) return;
                response.data.list.forEach(item => {
                    if (item.img.indexOf('https:') > -1) {
                        item.img = item.img.replace('https:', '');
                    }
                })
                this.list = response.data.list;
                this.total = response.data.total;
            })
        }
    },
    created () {
        this.getList(1)
    }
}
</script>

