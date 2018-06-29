// 教程  https://blog.csdn.net/u012187452/article/details/73478028

// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://www.qyule.tv';
var server = http.createServer(function (req, res) {
    if (req.url !== '/favicon.ico') {
        req.on('data', function (data) {
            console.log('服务器端接收到数据' + decodeURIComponent(data));
        });
        req.on('end', function () {
            console.log('客户端请求数据已接受完毕');
        });
    }
    res.end();
}).listen(3000, 'localhost');
// http.get(url, function (res) {

//     var html = '';
//     // 获取页面数据
//     res.on('data', function (data) {
//         html += data;
//     });
//     // 数据获取结束
//     res.on('end', function () {
//         // 通过过滤页面信息获取实际需求的轮播图信息
//         var slideListData = filterSlideList(html);
//         // 打印信息
//         printInfo(slideListData);
//     });
// }).on('error', function () {
//     console.log('获取数据出错！');
// }, {
//     cookie: '_sessionid=1234567890'
// });

/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {

        return html;
    } else {
        console.log('无数据传入！');
    }
}

/* 打印信息 */
function printInfo(slideListData) {
    console.log(slideListData);
}
