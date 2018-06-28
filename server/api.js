var express = require('express');
var url = require('url');
var fs = require('fs');
const path = require('path');
var router = express.Router();
var mysql = require('mysql');
var num = 0;
var getIp = function (req) {
    var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    num = num + 1;
    console.log('当前访问次数', num)
    return ip;
};
// // 所有请求配置
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");   
//     next();
// })

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ashun666',
    database: 'down_list'
});

// 获取所有列表
router.post('/api/getAllList', function (req, res) {
    var sql = 'SELECT * FROM ' + req.body.title + 'list';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('error');
            } else {
                res.json(result);
            }
            conn.release();
        });
    })
})
// 获取列表
router.post('/api/getList', function (req, res) {
    // console.log(html)
    var currentIp = getIp(req)
    console.log('getList----' + req.body.title + '=====', currentIp)
    if (currentIp.indexOf('195.201.218.75') > -1) {
        // console.log('getList----',currentIp)
        // res.send('who are you');
        // return;
    }
    var limit = ((req.body.current - 1) * 20) + ',' + 20;
    var sql = 'SELECT * FROM ' + req.body.title + 'list order by createTime desc limit ' + limit;
    var count = 'SELECT COUNT(*) FROM ' + req.body.title + 'list';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('error');
                conn.release();
            } else {
                // res.json({total:21, data:result});
                conn.query(count, function (err, num) {
                    if (err) {
                        res.send('error');
                    } else {
                        var arr = result.map(item => {
                            return {
                                id: item.createTime,
                                title: item.title,
                                img: item.img
                            }
                        })
                        res.json({
                            total: num[0]['COUNT(*)'],
                            list: arr
                        });
                    }
                    conn.release();
                })
            }
        });
    })
})

// 详情内容
router.post('/api/getDetail', function (req, res) {
    var id = req.body.id.toString();
    var currentIp = getIp(req)
    console.log('getDetail----' + req.body.title + '=====', currentIp)
    var sql = 'SELECT * FROM ' + req.body.title + 'detail where createTime = ' + id;
    var files = fs.readdirSync(__dirname + "\\" + req.body.title + "\\");
    var downFile = files.filter(function (item) {
        var spl = item.split('.')[0];
        return spl === id;
    });
    if (!downFile.length) {
        // 这里应该做进一步的处理 如：移除表里的这条数据
        console.log('没有查询到下载文件');
        var sql2 = "INSERT INTO notdata(id, title) VALUES (?, ?)";
        pool.getConnection(function (err, conn) {
            if (err) console.log("POOL ==> " + err);
            conn.query(sql2, [id, req.body.title], function (err, result) {
                res.send('error');
                conn.release();
            });
        })

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
})

// 视频详情
router.post('/api/getVideoDetail', function (req, res) {
    var id = req.body.id.toString();
    var currentIp = getIp(req)
    console.log('getDetail----' + req.body.title + '=====', currentIp)
    var sql = 'SELECT * FROM ' + req.body.title + 'detail where createTime = ' + id;
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('error');
            } else {
                res.json({
                    id: result[0] ? result[0].createTime : '',
                    content: result[0] ? result[0].content : '',
                    video: result[0] ? result[0].video : ''
                });
            }
            conn.release();
        });
    })
})

// 删除数据
router.post('/api/deteleRepeat', function (req, res) {
    var sql = 'DELETE FROM ' + req.body.title + 'list WHERE createTime = ' + req.body.id;
    var sql2 = 'DELETE FROM ' + req.body.title + 'detail WHERE createTime = ' + req.body.id;
    if (!req.body.id || Number(req.body.id) < 1500000000) {
        res.send('error');
        console.log('删除的id不正确')
        return;
    }

    var currPath = __dirname + "\\" + req.body.title + "\\",
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
    // "E:\\project\\ashun\\file\\"
    var currentIp = getIp(req)
    console.log('download-----' + req.query.dir + '=====', currentIp)
    var currPath = __dirname + "\\" + req.query.dir + "\\",
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

module.exports = router;
