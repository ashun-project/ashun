var express = require('express');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var router = express.Router();
var num = 0;        
var menu = [
    {url: '/', name: '首页'},
    {url: '/list/wumavideo.html', name: '无码性爱'},
    {url: '/list/sanjivideo.html', name: '三级在线'},
    {url: '/list/youmavideo.html', name: '有码视频'},
    {url: '/list/dongmanvideo.html', name: '卡通动漫'},
    {url: '/list/oumeivideo.html', name: '欧美性爱'},
    {url: '/list/zipaivideo.html', name: '网友自拍'},
    {url: '/list/lingleivideo.html', name: '另类视频'},
    {url: 'http://ashun520.com/app/andriod.apk', name: '安卓app下载'}
]
var getIp = function (req) {
    var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    num = num + 1;
    return ip;
};

var pool = mysql.createPool({
    host: '103.60.222.43',
    user: 'root',
    password: 'ashun666',   // 记得改数据库密码
    database: 'xinba',
    port: 3306
});

// 首页
router.get('/', function (req, res) {
    // var sql = 'select a.* from (select * from youmavideolist order by createTime desc limit 4) a union all select b.* from (select * from oumeivideolist order by createTime desc limit 4) b union all select c.* from (select * from dongmanvideolist order by createTime desc limit 4) c';
    var sql = 'select * from list_data order by create_time desc limit 16';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL-index ==> " + err);
        conn.query(sql, function (err, result) {
            var listObj = {
                pageTitle: '韩国伦理',
                pageKeyword: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
                pageDescrition: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
                host: 'http://'+req.headers['host'],
                menu: menu,
                type: '/',
                list: result
            }
            res.render('index', listObj);
            conn.release();
        });
    })
})

// 获取列表
router.get('/list/:type', function (req, res) {
    var typeU = req.params.type || '';
    var params = typeU.split('.');
    var type = params[0].split('_');
    var search = req.url.split('search=');
    var listObj = {
        pageTitle: type[0]+'列表-韩国伦理',
        pageKeyword: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        pageDescrition: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        host: 'http://'+req.headers['host'],
        menu: menu,
        type: '/list/' + type[0] + '.html',
        list: []
    }
    if (params.length < 2) {
        res.render('list', listObj);
        return;
    } 
    var numL = Number(type[1]) || 1;
    var limit = ((numL - 1) * 12) + ',' + 12;
    var sql = 'SELECT * FROM list_data where type = "'+ type[0] +'" order by create_time desc limit ' + limit;
    // var sql = 'SELECT * FROM ' + type[0] + 'list order by createTime desc limit ' + limit;
    var count = 'SELECT COUNT(*) FROM list_data where type = "'+ type[0] + '"';
    if (search[1]) {
        sql = 'SELECT * FROM list_data where title like "' +'%'+ decodeURI(search[1]) +'%'+ '" order by create_time desc limit ' + limit;
        count = 'SELECT COUNT(*) FROM list_data where title like "' +'%'+ decodeURI(search[1]) +'%'+ '"';
    }
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL-list ==> " + err); 
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] -list ', err.message);
                res.render('list', listObj);
                conn.release();
            } else {
                conn.query(count, function (err, total) {
                    if (err) {
                        res.render('list', listObj);
                    } else {
                        var arr = result.map(item => {
                            return {
                                create_time: item.create_time,
                                title: item.title,
                                img: item.img.replace(/https:/g, '').split(',')[0]
                            }
                        })
                        listObj.list = arr;
                        listObj.page = getPage(Number(total[0]['COUNT(*)']), numL, type[0], search[1]);
                        res.render('list', listObj);
                    }
                    conn.release();
                });
            }
        });
    })
})
function getPage(total, currentPage, type, pSearch) {
    var totalPage = 0;//总页数
    var pageSize = 12;//每页显示行数
    var pageUrl = '/list/' + type;
    var pageSearch = pSearch? '?search=' + pSearch : '';
    //总共分几页
    if(total/pageSize > parseInt(total/pageSize)){
        totalPage=parseInt(total/pageSize)+1;
    }else{
        totalPage=parseInt(total/pageSize);
    }
    var tempStr = "<span>共"+totalPage+"页</span>";
    if(currentPage>1){
        tempStr += "<a href="+ pageUrl + '.html' + pageSearch + ">首页</a>";
        tempStr += "<a href="+ pageUrl + '_' + (currentPage-1) + '.html' + pageSearch +">上一页</a>"
    }else{
        tempStr += "<span class='btn'>首页</span>";
        tempStr += "<span class='btn'>上一页</span>";
    }

    if (currentPage > 5 && currentPage < (totalPage -5)) {
        for(var pageIndex= currentPage - 5; pageIndex<currentPage+5;pageIndex++){
            tempStr += "<a class='"+ (pageIndex=== currentPage? 'active' : '') +"' href="+ pageUrl + '_' + pageIndex + '.html' + pageSearch +">"+ pageIndex +"</a>";
        }
    } else if (currentPage > (totalPage -5) && totalPage >= 10){
        for(var pageIndex= (totalPage - 9); pageIndex < totalPage+1;pageIndex++){
            tempStr += "<a class='"+ (pageIndex=== currentPage? 'active' : '') +"' href="+ pageUrl + '_' + pageIndex + '.html' + pageSearch +">"+ pageIndex +"</a>";
        }
    } else if (currentPage <= 5 && totalPage > 10) {
        for(var pageIndex= 1; pageIndex <= 10;pageIndex++){
            tempStr += "<a class='"+ (pageIndex=== currentPage? 'active' : '') +"' href="+ pageUrl + '_' + pageIndex + '.html' + pageSearch +">"+ pageIndex +"</a>";
        }
    } else {
        for(var pageIndex= 1; pageIndex <= totalPage;pageIndex++){
            tempStr += "<a class='"+ (pageIndex=== currentPage? 'active' : '') +"' href="+ pageUrl + '_' + pageIndex + '.html' + pageSearch +">"+ pageIndex +"</a>";
        }
    }

    if(currentPage<totalPage){
        tempStr += "<a href="+ pageUrl + '_' + (currentPage+1) + '.html' + pageSearch +">下一页</a>";
        tempStr += "<a href="+ pageUrl + '_' + totalPage + '.html' + pageSearch +">尾页</a>";
    }else{
        tempStr += "<span class='btn'>下一页</span>";
        tempStr += "<span class='btn'>尾页</span>";
    }

    return tempStr;
}

// 视频详情
router.get('/detail/:type/:id', function (req, res) {
    // var sql = 'SELECT * FROM ' + req.body.title + 'detail where createTime = ' + id;
    var id = req.params.id || '';
    var sql = 'SELECT * FROM list_data where create_time = ' + '"' + id +'"';
    var listObj = {
        pageTitle: '没找到数据-韩国伦理',
        pageKeyword: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        pageDescrition: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        host: 'http://'+req.headers['host'],
        menu: menu,
        type: req.params.type,
        result: '',
        list: []
    }
    if (!Number(id.replace('.html', ''))) {
        res.render('detail', listObj);
        return;
    }
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> detail" + err);
        conn.query(sql, function (err, result) {
            var obj = {
                content: '',
                video: result[0] ? result[0].video : ''
            }
            listObj.result = obj;
            listObj.pageTitle = result[0] ? result[0].title : '';
            // 获取推荐
            var countSql = 'SELECT COUNT(1) FROM list_data';
            var sql = '';
            var count = 6;
            var reNUm = 0;
            conn.query(countSql, function (err1, total) {
                count = (Number(total[0]['COUNT(1)']) || 6) - 6;
                reNUm = Math.floor(Math.random()*(1 - count) + count);//10000
                sql = 'SELECT * FROM list_data order by create_time desc limit ' + (reNUm + ',' + 6);
                conn.query(sql, function (err2, recommond) {
                    listObj.list = recommond;
                    res.render('detail', listObj);
                    conn.release();
                })
            })
        });
    })
})

router.get('*', function (req, res, next) {
    var listObj = {
        pageTitle: '韩国伦理404页面',
        pageKeyword: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        pageDescrition: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        host: 'http://'+req.headers['host']
    }
    res.status(404);
    res.render('404', listObj);
});

module.exports = router;
