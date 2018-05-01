<template>
    <div class="home">
        
        <div class="data-list">
            <ul>
                <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                    <img :src="item.img.split(',')[0]" alt="">
                    <p class="title">{{item.title}}</p>
                </li>
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
        methods: {
            goDetail (item) {
                window.open('#/detail/'+item.createTime, '_blank')
            },
            pagechange (num) {
                this.getList (num)
            },
            getList (current) {
                this.$http.post('/api/getList', {current: current}).then(response => {
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
        width: 1200px;
        margin: 20px auto 0;
        overflow: hidden;
    }
    .data-list ul{
        width: 1300px;
    }
    .data-list li{
        float: left;
        width: 292px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .data-list li img{
        float: left;
        width: 100%;
        height: 300px;
        background: #eee;
    }
    .title{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    </style>
