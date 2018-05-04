<template>
    <div class="delete-data">
        <ul>
            <li v-for="item in list" :key="item.createTime" :data="item.url">
                {{item.title}}
                <i @click="deleteData(item.createTime)">删除</i>
            </li>
        </ul>
        <div class="popup" v-if="deleteId">
            <div>确定要删除吗？</div><br/>
            <button @click="sure">确定</button>
            <button @click="cancel">取消</button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                list: [],
                deleteId: ''
            }
        },
        methods: {
            deleteData (id) {
                this.deleteId = id;
            },
            sure () {
                this.$http.post('/api/deteleRepeat', {id: this.deleteId}).then(response => {
                    this.deleteId = '';
                    if (response.data === 'error') {
                        alert('删除失败');
                    } else{
                        alert('删除成功');
                    }
                })
            },
            cancel () {
                this.deleteId = '';
            }
        },
        created () {
            let id = parseInt(this.$route.params.id);
            if (!id || id < 1525412438898) {
                console.log('this' + id + 'is bad');
                return;
            }

            this.$http.post('/api/getAllList').then(response => {
                this.list = response.data;
                let arr = [];
                let repeat = [];
                // let name = "朋友"
                // response.data.forEach( (item) => {
                //     let re = arr.some(value => value.title === item.title);
                //     if (re) {
                //         repeat.push(item) // createTime
                //         this.$http.post('/api/deteleRepeat', {id: item.createTime}).then(response => {
                //             console.log(response, 789)
                //         })
                //     } else {
                //         arr.push(item)
                //     }
                // })
                
                let fil = response.data.filter(item => item.title.indexOf(name) > -1);
                // console.log(fil)
            })
        }
    }
</script>

<style scoped>
    .delete-data ul li {
        width: 1000px;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        position: relative;
        padding: 0 10px;
    }
    .delete-data ul li:nth-child(even) {
        background: #f2f2f2;
    }
    .delete-data ul li i{
        position: absolute;
        top: 0;
        right: 10px;
        cursor: pointer;
    }
    .delete-data ul li:hover{
        background: burlywood;
    }
    .delete-data .popup{
        border: 1px solid burlywood;
        position: fixed;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        z-index: 100000;
        background: #fff;
        text-align: center;
        padding: 30px 80px;
    }
</style>
