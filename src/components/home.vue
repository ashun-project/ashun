<template>
    <div class="home">
        <div class="header">
            <div class="cont">
                <span class="lf"><img src="logo.png"></span>
                <span class="rf">登入/注册</span>
            </div>
        </div>
        <div class="banner">
            <img src="banner.png" alt="">
        </div>
        <div class="data-list">
            <ul>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
                <li>
                    <img src="" alt="">
                    <p>this is title</p>
                </li>
            </ul>
            <div class="clr"></div>
        </div>
        <ul>
            <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                {{item.title}}
            </li>
        </ul>
        <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
    </div>
</template>
<script>
    import vPagination from "@/components/common/page"
    export default {
        data () {
            return {
                list: [],
                total: 100,
                current: 1
            }
        },
        components:{
            vPagination
        },
        methods: {
            goDetail (item) {
                this.$router.push({name: 'detail', params: {id: item.createTime}})
            },
            pagechange () {
                console.log(123)
            }
        },
        created () {
            this.$http.post('/api/getList', {current: 2}).then(response => {
                console.log(response, 787454121)
                this.list = response.data;
            })
        }
    }
</script>

<style scoped>
    .header{
        height: 50px;
        line-height: 5 0px;
        border: 1px solid #eee;
    }
    .header .cont{
        width: 1200px;
        margin: 0 auto;
    }
    .banner{
        height: 300px;
        background: #999;
    }
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
    </style>
