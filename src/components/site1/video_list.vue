<template>
    <div class="home">

        <div class="data-list">
            <ul>
                <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                    <div>
                        <div class="cont-img">
                            <img v-if="$route.params.label === 'wuma' && item.img.split(',').length > 1" :src="item.img.split(',')[1]" onerror="this.src='/static/img/errorimg.png'" alt="ashun520.com">
                            <img v-else :src="item.img.split(',')[0] || '/static/img/errorimg.png'" onerror="this.src='/static/img/errorimg.png'" alt="ashun520.com">
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
        <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
    </div>
</template>
<script>
import vPagination from "@/components/common/page"
export default {
    data () {
        return {
            list: [],
            total: 0,
            current: 1,
            myStor: localStorage.getItem('stor1')
        }
    },
    components: {
        vPagination
    },
    watch: {
        $route (n, o) {
            window.location.reload();
            document.documentElement.scrollTop=document.body.scrollTop=0;
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
            if (!this.myStor) {
                localStorage.setItem('stor1', 'aaa');
                window.open('http://llh8.vip');
            }
        },
        pagechange (num) {
            this.$router.replace({params: {page: num}});
        },
        getList (current) {
            this.list = [];
            this.total = 0;
            this.$http.post('/api/getList', { current: current, title: this.$route.params.label }).then(response => {
                if (!response.data || !response.data.list.length) return;
                
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
        var num = Number(this.$route.params.page) || '1';
        this.current = num;
        this.getList(num);
    }
}
</script>

<style scoped>
.data-list {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
}

.data-list ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: -5px;
    background: #0e0e0e;
}

.data-list li {
    width: 25%;
    padding: 10px;
    cursor: pointer;
}

.data-list li.not-data {
    padding: 0;
    margin: 0;
}

.data-list li .cont-img {
    float: left;
    width: 100%;
    height: 180px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.data-list li .cont-img img {
    max-width: 100%;
    /* min-height: 100%; */
}

.data-list .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}

.data-list li > div {
    border: 1px solid #252323;
    padding: 3px;
}

.data-list li > div p {
    margin-top: 5px;
    padding: 3px 2px;
    font-size: 0.6rem;
}

.data-list li:hover > div p {
    color: #fb7b86;
}

@media screen and (max-width: 600px) {
    .data-list ul {
        margin: 0;
    }
    .data-list li {
        width: 50%;
        padding: 5px 0;
    }
    .data-list li .cont-img {
        height: 120px;
    }
}
</style>

