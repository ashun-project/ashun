<template>
    <div class="site2">
        <div id="site2-content" class="video" v-html="html"></div>
        <div class="clr"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            html: ''
        }
    },
    created () {
        this.$http.get('/site2/?m=vod-type-id-2.html').then(response => {

            //col-md-3 portfolio-item new-video
            let reTag1 = /<div class="col-md-9 top-nav">(?:.|\s)*?<\/div>/g;
            let reTag2 = /<div class="col-md-12 class-feed-btn2">(?:.|\s)*?<\/div>/g;
            let reTag = /<div class="container">(?:.|\s)*?<\/div>/g;
            this.html = response.data;
            let menu1 = reTag1.exec(response.data);
            let menu2 = reTag2.exec(response.data);
            //<div class="col-md-9 top-nav">
            console.log(this.html)
        })
    }
}

</script>
