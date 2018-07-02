import Vue from 'vue'
import axios from 'axios'
import encryption from '@/components/common/md5.js'
Vue.prototype.$http = axios;

axios.interceptors.request.use(function (config) {
    let current = new Date().getDate();
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678@#$%^&*()';
    let maxPos = chars.length;
    let pwd = '';　　
    for (let i = 0; i <= 50; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));　
    }
    config.headers.pwd = pwd;
    config.headers.ashun = 'ashun520'
    config.headers.referers = encryption.encrypt.abc(pwd.split('').splice(current, 1).join(''));
    return config;
}, function (error) {
    //请求错误时做些事
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
