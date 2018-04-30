var express = require('express');
var url = require('url');
var fs = require('fs');
const path = require('path');
var router = express.Router();
var mysql = require('mysql');

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
    host     : 'localhost',
    user     : 'root',
    password : 'wangboshun',
    database : 'down_list'
});

// 获取所有列表
router.post('/getAllList', function (req, res) {
    var sql = 'SELECT * FROM sanjilist';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql,function(err,result){
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.send('error');
            } else {
                res.json(result);
            }
            conn.release();
        });
    }) 
})
// 获取列表
router.post('/getList', function (req, res) {
    var limit = ((req.body.current -1) * 20) + ',' + 20;
    var sql = 'SELECT * FROM sanjilist limit ' + limit;
    var count = 'SELECT COUNT(*) FROM sanjilist';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql,function(err,result){
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.send('error');
                conn.release();
            } else {
                // res.json({total:21, data:result});
                conn.query(count,function(err,num){
                    if(err){
                        res.send('error');
                    } else {
                        res.json({total:num[0]['COUNT(*)'], list:result});
                    }
                    conn.release();
                })
            }
        });
    }) 
})

// 详情内容
router.post('/getDetail', function (req, res) {
    var id = req.body.id.toString();
    var sql = 'SELECT * FROM sanjidetail where createTime = ' + id;
    var files = fs.readdirSync('E:\\ashun\\file\\');
    var downFile = files.filter(function (item) {
        var spl = item.split('.')[0];
        return spl === id;
    });
    if (!downFile.length) {
        // 这里应该做进一步的处理 如：移除表里的这条数据
        console.log('没有查询到下载文件');
        res.send('error');
    } else {
        pool.getConnection(function (err, conn) {
            if (err) console.log("POOL ==> " + err);
            conn.query(sql,function(err,result){
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    res.send('error');
                } else {
                    res.json(result);
                }
                conn.release();
            });
        }) 
    }
})

// 删除数据
router.post('/deteleRepeat', function (req, res) {
    var sql = 'DELETE FROM sanjilist WHERE createTime = '+ req.body.id;
    var sql2 = 'DELETE FROM sanjidetail WHERE createTime = '+ req.body.id;
    var currPath = "E:\\ashun\\file\\",
        allfiles = fs.readdirSync(currPath),
        currFile = currPath + allfiles.filter(function (item) {return item.indexOf(req.body.id) > -1;})[0];
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
        conn.query(sql,function(err,result){
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.send('error');
            } else {
                conn.query(sql2,function(err,result2){
                    if(err){
                        console.log('[SELECT ERROR]==sql2 - ',err.message);
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
router.get('/download',function(req, res, next){
    // "E:\\project\\ashun\\file\\"
    var currPath = "E:\\ashun\\file\\",
        allfiles = fs.readdirSync(currPath),
        fileName = req.query.name,
        currFile = currPath + allfiles.filter(function (item) {return item.indexOf(fileName) > -1;})[0],
        fReadStream;
    fs.exists(currFile,function(exist) {
        if(exist){
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+encodeURI(fileName)
            });
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
            fReadStream.on("end",function () {
                res.end();
            });
        }else{
            res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }
    });
});

module.exports = router;