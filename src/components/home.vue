<template>
    <div class="home">
        
        <div class="data-list">
            <ul>
                <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                    <div>
                        <img :src="item.img.split(',')[0]" alt="">
                        <div class="clr"></div>
                        <p class="title">{{item.title}}</p>
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
        methods: {
            goDetail (item) {
                window.open('#/detail/'+item.id, '_blank')
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
        width: 25%;
        padding: 10px;
        margin: 0 0 15px;
        cursor: pointer;
    }
    .data-list li.not-data{
        padding: 0;
        margin: 0;
    }
    .data-list li img{
        float: left;
        width: 100%;
        height: 280px;
        background: #eee;
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
        }
        .data-list li img{
            height: 230px;
        }
    }
    </style>
