<template>
    <div class="home">
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
