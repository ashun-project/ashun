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
    {url: '/list/lingleivideo.html', name: '另类视频'}
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
    host: 'localhost',
    user: 'root',
    password: 'ashun666',
    database: 'down_list'
});

// 首页
router.get('/', function (req, res) {
    var sql = 'select a.* from (select * from youmavideolist order by createTime desc limit 4) a union all select b.* from (select * from zipaivideolist order by createTime desc limit 4) b union all select c.* from (select * from dongmanvideolist order by createTime desc limit 4) c';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL-index ==> " + err);
        conn.query(sql, function (err, result) {
            var listObj = {
                pageTitle: '韩国伦理',
                pageKeyword: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
                pageDescrition: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
                host: 'http://'+req.headers['host'],
                menu: menu,
                result: ''
            }
            if (err) {
                res.render('index', listObj);
            } else {
                var obj = {
                    youmavideo: [],
                    zipaivideo: [],
                    dongmanvideo: [],
                }
                var arr = [];
                for (var i = 0; i < result.length; i++) {
                    obj[result[i].type].push(result[i]);
                }
                arr = [
                    {type: 'youmavideo', list: obj.youmavideo, name: '有码性爱'},
                    {type: 'zipaivideo', list: obj.zipaivideo, name: '网友自拍'},
                    {type: 'dongmanvideo', list: obj.dongmanvideo, name: '卡通动漫'}
                ]
                listObj.result = arr;
                res.render('index', listObj);
            }
            conn.release();
        });
    })
})

// 获取列表
router.get('/list/:type', function getList (req, res) {
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
        type: type[0],
        result: []
    }
    if (params.length < 2) {
        res.render('list', listObj);
        return;
    } 
    var numL = Number(type[1]) || 1;
    var limit = ((numL - 1) * 12) + ',' + 12;
    var sql = 'SELECT * FROM ' + type[0] + 'list order by createTime desc limit ' + limit;
    var count = 'SELECT COUNT(*) FROM ' + type[0] + 'list';
    if (search[1]) {
        sql = 'SELECT * FROM ' + type[0] + 'list where title like "' +'%'+ decodeURI(search[1]) +'%'+ '" order by createTime desc limit ' + limit;
        count = 'SELECT COUNT(*) FROM ' + type[0] + 'list where title like "' +'%'+ decodeURI(search[1]) +'%'+ '"';
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
                                id: item.createTime,
                                title: item.title,
                                img: item.img.replace(/https:/g, '').split(',')[0]
                            }
                        })
                        listObj.result = arr;
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
    } else if (currentPage < 5 && totalPage > 10) {
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
    var sql = 'SELECT '+ req.params.type +'list.title, '+ req.params.type +'detail.* FROM '+ req.params.type +'list LEFT JOIN '+ req.params.type +'detail ON '+ req.params.type +'list.createTime = '+ req.params.type +'detail.createTime WHERE '+ req.params.type +'detail.createTime = '+ id.replace('.html', '');
    // var sql = 'select a.title from '+ req.params.type +'list a left join '+ req.params.type +' b where b.good_status=0 group by a.shop_id order by count(1) desc limit 1,10;'
    // var sql  = 'SELECT zipaivideolist.title,zipaivideodetail.* FROM zipaivideolist LEFT JOIN zipaivideodetail ON zipaivideolist.createTime = zipaivideodetail.createTime WHERE zipaivideodetail.createTime = 1528256305'
    var listObj = {
        pageTitle: '',
        pageKeyword: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        pageDescrition: '阿顺/阿顺520,ashun520.com有你, ady, ady在线, 韩国伦理, 奸臣 韩国在线观看, 韩国表妹2017在线观看',
        host: 'http://'+req.headers['host'],
        menu: menu,
        type: req.params.type,
        result: ''
    }
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> detail" + err);
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - detail', err.message);
                res.render('list', listObj);
            } else {
                var obj = {
                    content: result[0] ? result[0].content : '',
                    video: result[0] ? result[0].video : ''
                }
                listObj.result = obj;
                listObj.pageTitle = result[0]? result[0].title+'-韩国伦理' : '韩国伦理';
                res.render('detail', listObj);
            }
            conn.release();
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

router.post('/detail/:type/:id', function (req, res) {
    var id = req.body.id.toString();
    var sql = 'SELECT * FROM ' + req.body.title + 'detail where createTime = ' + id;
    var files = fs.readdirSync(__dirname + "\/" + req.body.title + "\/");
    var downFile = files.filter(function (item) {
        var spl = item.split('.')[0];
        return spl === id;
    });
    if (!downFile.length) {
        // 这里应该做进一步的处理 如：移除表里的这条数据
        console.log('没有查询到下载文件');
        res.send('error');
        // var sql2 = "INSERT INTO notdata(id, title) VALUES (?, ?)";
        // pool.getConnection(function (err, conn) {
        //     if (err) console.log("POOL ==> " + err);
        //     conn.query(sql2, [id, req.body.title], function (err, result) {
        //         res.send('error');
        //         conn.release();
        //     });
        // })

    } else {
        pool.getConnection(function (err, conn) {
            if (err) console.log("POOL ==> " + err);
            conn.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send('error');
                } else {
                    res.json({
                        id: result[0] ? result[0].createTime : '',
                        content: result[0] ? result[0].content : ''
                    });
                }
                conn.release();
            });
        })
    }
});

// 删除数据
router.post('/api/deteleRepeat', function (req, res) {
    var sql = 'DELETE FROM ' + req.body.title + 'list WHERE createTime = ' + req.body.id;
    var sql2 = 'DELETE FROM ' + req.body.title + 'detail WHERE createTime = ' + req.body.id;
    if (!req.body.id || Number(req.body.id) < 1500000000) {
        res.send('error');
        console.log('删除的id不正确')
        return;
    }

    var currPath = __dirname + "\/" + req.body.title + "\/",
        allfiles = fs.readdirSync(currPath),
        currFile = currPath + allfiles.filter(function (item) {
            return item.indexOf(req.body.id) > -1;
        })[0];
    fs.exists(currFile, function (exist) {
        if (exist) {
            fs.unlink(currFile, function (err) {
                if (err) return console.log(err);
                console.log('文件删除成功');
            })
        } else {
            console.log('文件不存在')
        }
    })
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('error');
            } else {
                conn.query(sql2, function (err, result2) {
                    if (err) {
                        console.log('[SELECT ERROR]==sql2 - ', err.message);
                        res.send('error');
                    } else {
                        res.json(result2);
                    }
                    conn.release();
                });
            }
        });
    })
})

// 文件下载
router.get('/api/download', function (req, res, next) {
    var currentIp = getIp(req)
    console.log('download-----' + req.query.dir + '=====', currentIp)
    var currPath = __dirname + "\/" + req.query.dir + "\/",
        allfiles = fs.readdirSync(currPath),
        fileName = req.query.name,
        filterName = allfiles.filter(function (item) {
            return item.indexOf(fileName) > -1;
        })[0],
        currFile = currPath + filterName,
        fReadStream;
    fs.exists(currFile, function (exist) {
        if (exist) {
            res.set({
                "Content-type": "application/octet-stream",
                "Content-Disposition": "attachment;filename=" + encodeURI(filterName)
            });
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data", (chunk) => res.write(chunk, "binary"));
            fReadStream.on("end", function () {
                res.end();
            });
        } else {
            res.set("Content-type", "text/html");
            res.send("file not exist!");
            res.end();
        }
    });
});

// ip屏蔽
router.post('/api/prohibitIp', function (req, res) {
    var sql2 = "INSERT INTO notdata(id, title) VALUES (?, ?)";
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        // console.log(req.body.id.toString(), req.body.title, '==========')
        conn.query(sql2, [req.body.id.toString(), req.body.title], function (err, result) {
            console.log(err, '=========')
            res.send('end');
            conn.release();
        });
    })
})

module.exports = router;
