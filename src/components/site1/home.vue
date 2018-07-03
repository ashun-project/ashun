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
    background: #2d2d2d;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    padding: 5px;
    position: relative;
    z-index: 3;
}
.site1 .menu dl {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    line-height: 40px;
    font-size: 14px;
    padding-left: 70px;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.site1 .menu dl dt {
    color: rgb(212, 112, 112);
    font-weight: 600;
    position: absolute;
    left: 2px;
    top: 2px;
}
.site1 .menu dd {
    float: left;
    height: 40px;
    line-height: 43px;
    -webkit-transition: all 1s;
    transition: all 1s;
    max-width: 100px;
}
.site1 .menu dd a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    color: #d2cdcd;
    text-align: center;
}
.site1 .menu dd.active a {
    color: #f7bcaa;
    border-bottom: 2px solid #ff6738;
}
.site1 .menu dd.active a:hover,
.site1 .menu dd a:hover {
    color: #f7bcaa;
    border-bottom: 2px solid #ff6738;
}
@media screen and (max-width: 600px) {
    .site1 .menu dl {
        padding-left: 60px;
        font-size: 12px;
        line-height: 30px;
    }
    .site1 .menu dl:first-child {
        border-bottom: 1px dashed #463f3f;
    }
    .site1 .menu dl dd {
        height: 30px;
        line-height: 33px;
    }
}
</style>
