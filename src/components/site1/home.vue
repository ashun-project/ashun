<template>
    <div class="site1">
        <div class="menu">
            <dl v-for="(list, idx) in menu" :key="idx">
                <dt>{{list.label}}</dt>
                <dd v-for="item in list.data" :key="item.url" :class="{active: item.url === $route.name || item.url === $route.params.title}">
                    <router-link :to="{name: item.url}">{{item.label}}</router-link>
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

<style>
</style>
