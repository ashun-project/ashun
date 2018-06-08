<template>
    <div class="site2">
        <div id="site2-content" class="video"></div>
        <div class="clr"></div>
    </div>
</template>

<script>
// import './css/bootstrap.min.css';
// import './css/font-awesome.min.css';
// import './css/style.css';
// import './css/bootstrap-theme-light-green.css';
// import './css/responsivepx.css';
export default {
    data () {
        return {
            message: ''
        }
    },
    methods: {
        reset () {
            let vm = this;
            timer = setInterval(function () {
                // var $srcipt = $('.video script[src]');
                var $link = $('.video link[href]');
                // var $form = $('.video form[action]');
                var $a = $('.video a[href]');
                // var $iframe = $('.video iframe[src]');
                console.log($iframe)
                // attr($srcipt.length, 'script[src]', 'src');
                attr($link.length, 'link[href]', 'href');
                // attr($form.length, 'form[action]', 'action');
                attr($a.length, 'a[href]', 'href', 'a');
                // attr($iframe.length, 'iframe[src]', 'src');

                function attr (len, label, attr, a) {
                    for (var i = 0; i < len; i++) {
                        let src = $(label).eq(i).attr(attr);
                        if (attr === 'action') {
                            if (src.substr(0, 2) !== '/#') {
                                $(label).eq(i).attr('onsubmit', true)
                                $(label).eq(i).attr('target', '')
                                $(label).eq(i).attr(attr, '/#/' + src)
                            }
                        } else if (a) {
                            if (src && src.substr(0, 2) !== '###') {
                                $(label).eq(i).attr('target', '')
                                $(label).eq(i).attr('data', src)
                                $(label).eq(i).css('display', 'inline-block')
                                $(label).eq(i).removeAttr(attr)
                            }
                        } else {
                            if (src && src.indexOf('http') === -1) {
                                $(label).eq(i).attr(attr, 'http://www.qyule.tv/' + src)
                            }
                        }
                    }
                }
            }, 100);
            setTimeout(function () {
                clearInterval(timer)
            }, 6000)
        },
        getContent () {
            this.$nextTick(() => {
                let dom = document.getElementById('site2-content');
                let content = document.getElementById('content');
                dom.innerHTML = content.innerHTML;
                // this.reset()
            })

        }
    },
    created () {
        let vm = this;
        this.$http.get('/site2').then(response => {
            //  console.log(response.data)  
            var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
            var result = REG_BODY.exec(response.data);
            var html = document.getElementById('site2-content');
            html.innerHTML = result;
            vm.getContent();
        })
    }
}
</script>

<style scoped>
/* @import url('./css/bootstrap.min.css');
    @import url('./css/font-awesome.min.css');
    @import url('./css/style.css');
    @import url('./css/bootstrap-theme-light-green.css');
    @import url('./css/responsivepx.css'); */
@import './css/bootstrap.min.css';
/* @import './css/font-awesome.min.css'; */
@import './css/style.css';
/* @import './css/bootstrap-theme-light-green.css'; */
@import './css/responsivepx.css';
.site2 {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
.site2 >>> .panel-heading {
    display: none;
}
.site2 .video >>> .panel ul {
    background: #f2f2f2;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    border: 1px solid #eee;
    padding: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 3px #ccc;
}
.site2 .video >>> .panel ul li a {
    padding: 0 12px;
    font-size: 14px;
    line-height: 28px;
    border: 1px solid rgb(233, 232, 232);
    box-shadow: 0 0 3px rgba(224, 223, 223, 0.6);
    margin: 4px;
    display: block;
    color: #666;
    border-radius: 2px;
}
.site2 .video >>> .panel ul li.active a,
.site2 .video >>> .panel ul li a:hover {
    background: rgb(243, 179, 4);
    color: #fff;
}
.site2 .video >>> .panel ul li a span {
    display: none;
}
</style>
