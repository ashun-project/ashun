import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios;


axios.interceptors.request.use(function (config) { 
    config.headers.deviceId = 'aaaaaaaaaaaaaa';
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