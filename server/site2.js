// 教程  https://blog.csdn.net/u012187452/article/details/73478028

// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://www.qyule.tv';

app.get('/', function (req, res) {
    console.log(113213)

    request({
        url: 'http://www.qyule.tv',
        headers: {
            // 'cookie': '__atuvc=1%7C23; Hm_lvt_c6a3b64c4af1f7ffeacf52fd24915230=1528106802,1528254631,1530258830',
            // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            // 'Accept-Encoding': 'gzip, deflate',
            // 'Accept-Language': 'zh-CN,zh;q=0.9',
            // 'Host': 'www.qyule.tv',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    }, function (error, response, body) {
        console.log(body, error)
        if (!error && response.statusCode == 200) {
            console.log(body)
            //返回的body为抓到的网页的html内容
            var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
            var navText = $('.post_nav_block').html(); //拿到导航栏的内容
            res.send(navText);
        }
    })
});
app.listen(3003);


//  http 抓取
var http = require('http')
var opt = {
    host: 'qyule.tv',
    // port: '80',
    method: 'get', //这里是发送的方法
    path: 'http//www.qyule.tv', //这里是访问的路径
    headers: {
        'X-Forwarded-For': "10.111.198.90", // 模拟ip  不知道有没有用
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
}
//以下是接受数据的代码
var body = '';
var req = http.request(opt, function (res) {
    console.log("Got response: " + res.statusCode);
    res.on('data', function (d) {
        body += d;
    }).on('end', function () {
        console.log(res.headers)
        console.log(body)
    });

}).on('error', function (e) {
    console.log("Got error: " + e.message);
})
req.end();
