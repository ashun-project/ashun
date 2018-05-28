<template>
    <div class="home">
        
        <div class="data-list">
            <ul>
                <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                    <div>
                        <div class="cont-img">
                            <img :src="item.img.split(',')[0]" alt="">
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
                current: 1
            }
        },
        components:{
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
                let rul = /【mp4\/.+】|\[mp4\/.+\]|【MP4\/.+】|\[MP4\/.+\]|【RV原创】|【精品RV原创】|【无码\/MP4\/.+】|【杏吧】/gi;
                return item.replace(rul, '')
            },
            goDetail (item) {
                window.open('#/videoDetail/' + this.$route.name + '/' + item.id, '_blank');
            },
            pagechange (num) {
                this.getList (num)
            },
            getList (current) {
                console.log(this.$route.name, '==========')
                this.$http.post('/api/getList', {current: current, title: this.$route.name}).then(response => {
                    console.log(response, 787454121)
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

<style scoped>
    .data-list{
        max-width: 1200px;
        width: 100%;
        margin: 20px auto 0;
        overflow: hidden;
    }
    .data-list ul{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 -10px;
    }
    .data-list li{
        width: 33.3333%;
        padding: 10px;
        cursor: pointer;
    }
    .data-list li.not-data{
        padding: 0;
        margin: 0;
    }
    .data-list li .cont-img{
        float: left;
        width: 100%;
        height: 280px;
        background: #eee;
        overflow: hidden;
    }
    .data-list li .cont-img img{
        width: 100%;
        min-height: 100%;
    }
    .data-list .title{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .data-list li > div{
        border: 1px solid #eee;
        padding: 3px;
    }
    .data-list li > div p{
        padding: 10px 2px;
    }
    .data-list li:hover > div p{
        color: #fb7b86;
    }
    @media screen and (max-width: 600px) {
        .data-list li{
            width: 50%;
            padding: 5px 0;
        }
        .data-list li .cont-img{
            height: 200px;
        }
    }
    </style>
