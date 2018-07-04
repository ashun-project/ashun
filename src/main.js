// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Base64加密
import Base64 from 'js-base64'
// ajax请求
import './axios'
Vue.config.productionTip = false
Vue.prototype.Base64 = Base64.Base64;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})
