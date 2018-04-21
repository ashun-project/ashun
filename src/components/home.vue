<template>
    <div class="home">
        <div class="header">
            <span class="lf"><img src="logo.png"></span>
            <span class="rf">登入/注册</span>
        </div>
        <div class="banner">
            <img src="banner.png" alt="">
        </div>
        <ul>
            <li v-for="(item, idx) in list" :key="idx" @click="goDetail(item)">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                list: []
            }
        },
        methods: {
            goDetail (item) {
                this.$router.push({name: 'detail', params: {id: item.createTime}})
            }
        },
        created () {
            this.$http.get('/api/getList').then(response => {
                console.log(response, 787454121)
                this.list = response.data;
            })
        }
    }
</script>
