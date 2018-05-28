<template>
    <div class="list">
        <div class="title">TG平台留言提交列表</div>
        <table cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th>
                        <div class="conta">时间</div>
                    </th>
                    <th>
                        <div class="conta">用户</div>
                    </th>
                    <th>
                        <div class="conta">标题</div>
                    </th>
                    <th width="40%">
                        <div class="conta">内容</div>
                    </th>
                    <th>
                        <div class="conta">邮箱</div>
                    </th>
                    <th>
                        <div class="conta">操作</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in list" :key="idx">
                    <td>{{getFormDate(item.date)}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.content}}</td>
                    <td>{{item.email}}</td>
                    <td class="operation">
                        <span class="detele" @click="goDelete(item._id)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="container">
            <!-- <h1> Vue 分页组件 </h1> -->
            <pagination :total="total" :currentPage="current" @pagechange="pagechange"></pagination>
            <!-- <pre>{{ $data|json }}</pre> -->
        </div>
    </div>
</template>

<script>
import pagination from './page'
export default {
    data () {
        return {
            list: [],
            total: 81,     // 记录总条数
            current: 1     // 当前第n页 ， 也可以 watch current 的变化
        }
    },
    components: {
        pagination
    },
    methods: {
        pagechange (p) {     // 页码改变event ， p 为新的 current
            console.log('pagechange', p);
        },
        getFormDate (param) {
            let date = new Date(param);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let currentDate = date.getDate();
            if (month < 10) month = '0' + month;
            if (currentDate < 10) currentDate = '0' + currentDate;
            return year + '-' + month + '-' + currentDate;
        },
        getList () {
            this.$http.post('/tg/feedback/list').then(response => {
                console.log(response)
                this.list = response.data.data;
            })
        },
        goDelete (id) {
            this.$http.post('/tg/feedback/del', { id: id }).then(response => {
                if (response.data.code !== 0) {
                    alert('删除失败')
                } else {
                    alert('删除成功')
                    this.getList()
                }
            })
        }
    },
    created () {
        this.getList()
    }
}
</script>

<style scoped>
.title {
    text-align: left;
    width: 100%;
    background: #ca5f13;
    height: 60px;
    line-height: 60px;
    color: #fff;
    padding-left: 20px;
}
.list table {
    width: 100%;
    font-size: 16px;
}
.list th {
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e9eaec;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
    text-align: center;
}
.list th .conta {
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    box-sizing: border-box;
    display: inline-block;
    word-wrap: normal;
    vertical-align: middle;
}
.list tbody tr:nth-child(even) {
    background: #f2f2f2;
}
.list td {
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e9eaec;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
}
.list td .detele {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 3px;
    background: rgb(247, 67, 67);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}
.list td .detele:active {
    background: rgb(226, 54, 54);
}
</style>
