<template>
    <div class="my-page">
        <ul class="pagination">
            <li :class="{'disabled': current == 1}">
                <a href="javascript:;" @click="setCurrent(1)"> 首页 </a>
            </li>
            <li :class="{'disabled': current == 1}" class="h5-status">
                <a href="javascript:;" @click="setCurrent(current - 1)"> 上一页 </a>
            </li>
            <li v-for="(p, idx) in grouplist" :key="idx" :class="{'active': current == p.val}">
                <a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
            </li>
            <li :class="{'disabled': current == page}" class="h5-status">
                <a href="javascript:;" @click="setCurrent(current + 1)"> 下一页</a>
            </li>
            <li :class="{'disabled': current == page}">
                <a href="javascript:;" @click="setCurrent(page)"> 尾页 </a>
            </li>
        </ul>
        <ul class="pagination pull-right h5-status">
            <li>
                <span> 共 {{ total }} 条数据 </span>
            </li>
            <!-- <li>
                <span> 每页显示 {{ display }} 条数据 </span>
            </li> -->
            <li>
                <span> 共 {{ page }} 页 </span>
            </li>
            <!-- <li>
                <span> 当前第 {{ current }} 页 </span>
            </li> -->
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        total: {            // 数据总条数
            type: Number,
            default: 0
        },
        display: {            // 每页显示条数
            type: Number,
            default: 20
        },
        currentPage: {            // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: {        // 分页条数 -- 奇数
            type: Number,
            default: 5,
            coerce: function (v) {
                v = v > 0 ? v : 5;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    data () {
        return {
            current: this.currentPage
        }
    },
    computed: {
        page () { // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist () { // 获取分页页码
            var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
            if (len <= this.pagegroup) {
                while (len--) { temp.push({ text: this.page - len, val: this.page - len }); };
                return temp;
            }
            while (len--) { temp.push(this.page - len); };
            var idx = temp.indexOf(center);
            (idx < count) && (center = center + count - idx);
            (this.current > this.page - count) && (center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.current > count + 1) && list.unshift({ text: '...', val: list[0].val - 1 });
                (this.current < this.page - count) && list.push({ text: '...', val: list[list.length - 1].val + 1 });
            }
            return list;
        }
    },
    methods: {
        setCurrent (idx) {
            if (this.current != idx && idx > 0 && idx < this.page + 1) {
                this.current = idx;
                this.$emit('pagechange', this.current);
            }
        }
    }
}
</script>


<style scoped>
.my-page {
    max-width: 1200px;
    margin: 0 auto;
}
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
}

.pagination > li {
    display: inline;
}

.pagination > li > a,
.pagination > li > span {
    position: relative;
    float: left;
    /* padding: 6px 12px; */
    margin-left: -1px;
    /* line-height: 1.42857143; */
    color: #666;
    text-decoration: none;
    background-color: #fff;
    /* border: 1px solid #f5b9be; */
    padding: 0 12px;
    font-size: 16px;
    line-height: 30px;
    border: 1px solid rgb(233, 232, 232);
}

.pagination > li:first-child > a,
.pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.pagination > li:last-child > a,
.pagination > li:last-child > span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.pagination > li > a:focus,
.pagination > li > a:hover,
.pagination > li > span:focus,
.pagination > li > span:hover {
    z-index: 2;
    color: #666;
    background-color: rgb(231, 190, 78);
    border-color: rgb(231, 190, 78);
}

.pagination > .active > a,
.pagination > .active > a:focus,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:focus,
.pagination > .active > span:hover {
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: rgb(243, 179, 4);
    border-color: rgb(243, 179, 4);
}

.pagination > .disabled > a,
.pagination > .disabled > a:focus,
.pagination > .disabled > a:hover,
.pagination > .disabled > span,
.pagination > .disabled > span:focus,
.pagination > .disabled > span:hover {
    color: #ccc;
    cursor: not-allowed;
    background-color: #f2f2f2;
}

.pagination-lg > li > a,
.pagination-lg > li > span {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
}

.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

.pagination-sm > li > a,
.pagination-sm > li > span {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
}

.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
@media screen and (max-width: 600px) {
    .my-page .h5-status {
        display: none;
    }
}
</style>
