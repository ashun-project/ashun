<template>
    <div class="detail">
        <div class="content" v-html="content"></div>
        <a @click="goDown">下载本片</a>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                content: '',
                hr: '',
                id: ''
            }
        },
        methods: {
            goDown () {
                window.open('http://localhost:8081/download?dir=file&name='+this.id +'.torrent')
                // this.$http.get('/api/download?dir=/file&name='+this.id +'.torrent').then(response => {
                //     console.log(response, 789456)
                // })
            }
        },
        created () {
            this.id = this.$route.params.id;
            this.hr = '/file/'+this.id +'.torrent' 
            this.$http.post('/api/getDetail', {id: this.id}).then(response => {
                console.log(response)
                this.content = response.data[0].content;
            })
        }
    }
</script>

<style>
    .detail .content{
        width: 600px;
        margin: 0 auto;
    }
</style>
