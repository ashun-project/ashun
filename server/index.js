const api = require('./api');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const express = require('express');
const app = express();
var session = require('express-session');
var num = 0;
var ipCont = '';
var getIp = function(req) {  
    var ip = req.headers['x-real-ip'] ||  
        req.headers['x-forwarded-for'] ||  
        req.socket.remoteAddress || '';
    if(ip.split(',').length>0){  
        ip = ip.split(',')[0];  
    }  
    return ip;  
};

app.use(cookie());
app.use(session({
    resave: true, // 是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒
    saveUninitialized: false, // 是指无论有没有session cookie，每次请求都设置个session cookie 
    secret: '123456',  //  加密
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 6000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
app.use(express.static(path.resolve(__dirname, '../dist')));
// 全局拦截配置https://blog.csdn.net/ixuhangyi/article/details/50579445
// app.get('*', function(req, res) {
//     // path.resolve(__dirname, '../dist/index.html'
//     const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
//     const currentIp = getIp(req);
//     num = num +1;
//     ipCont += currentIp
//     console.log('当前访问次数：',num, '当前访问者:', currentIp)
//     res.send(html);
// })

app.listen(8686);