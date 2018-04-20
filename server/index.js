const api = require('./api');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
var session = require('express-session');
const express = require('express');
const app = express();

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

app.get('*', function(req, res) {
    // path.resolve(__dirname, '../dist/index.html'
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    console.log(123)
    // console.log(html)
    res.send(html);
})

app.listen(8081);