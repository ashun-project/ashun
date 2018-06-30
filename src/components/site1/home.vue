<template>
    <div class="site1">
        <div class="menu">
            <dl v-for="(list, idx) in menu" :key="idx">
                <dt>{{list.label}}</dt>
                <dd v-for="item in list.data" :key="item.url" :class="{active: item.url === $route.params.label || item.url === $route.params.title}">
                    <router-link :to="{name: 'list', params:{label: item.url}}">{{item.label}}</router-link>
                </dd>
            </dl>
            <div class="clr"></div>
        </div>
        <div class="site-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menu: [
                {
                    label: '在线区：',
                    data: [
                        { url: 'wumavideo', label: '无码性爱' },
                        { url: 'sanjivideo', label: '三级在线' },
                        { url: 'youmavideo', label: '有码性爱' },
                        { url: 'dongmanvideo', label: '卡通动漫' },
                        { url: 'oumeivideo', label: '欧美性爱' },
                        { url: 'zipaivideo', label: '网友自拍' }
                    ]
                },
                {
                    label: '下载区：',
                    data: [
                        { url: 'wuma', label: '经典无码' },
                        { url: 'sanji', label: '三级影视' },
                        { url: 'oumei', label: '欧美风情' },
                        // {url: 'youma', label: '有码性爱'},
                        { url: 'dongman', label: '卡通动漫' },
                        // {url: 'tupian', label: '图片专区'},
                        // {url: 'xiaoshou', label: '小说专区'}]}
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.site1 .menu {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 5px;
    background: #f2f2f2;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    border: 1px solid #eee;
    padding: 5px;
    box-shadow: 0 0 3px #ccc;
}
.site1 .menu dl {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    line-height: 30px;
    font-size: 16px;
    padding: 2px 0 2px 70px;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.site1 .menu dl dt {
    color: rgb(121, 33, 33);
    margin-right: 5px;
    font-weight: 600;
    position: absolute;
    left: 2px;
    top: 2px;
}
.site1 .menu dd {
    float: left;
    height: 30px;
    line-height: 30px;
    transition: all 1s;
    width: 90px;
    max-width: 100px;
}
.site1 .menu dd a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    color: #576700;
    text-align: center;
}
.site1 .menu dd.active a {
    border-radius: 3px;
    background: #cae243;
    color: #fff;
}
.site1 .menu dd.active a:hover {
    color: #fff;
}
.site1 .menu dd a:hover {
    color: #cae243;
}
@media screen and (max-width: 600px) {
    .site1 .menu dl {
        padding-left: 60px;
        font-size: 14px;
        line-height: 26px;
    }
    .site1 .menu dl dd {
        width: 33%;
        height: 26px;
        line-height: 26px;
    }
}
</style>
