<template>
    <div class="site2">
        <!-- <div id="site2-content" class="video"></div> -->
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        mounted () {
        },
        methonds: {
            reset() {
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

                    function attr(len, label, attr, a) {
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
            }    
        },
        created () {
            // this.$http.get('/site2/rapping/').then(response => {
            //      console.log(response.data)
            //     var html = document.getElementById('site2-content');
            //     html.innerHTML = response.data;
            //     this.reset()
            // })
        }
    }
</script>

<style>
    .site2{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
</style>
