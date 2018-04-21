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

// 获取列表
router.get('/getList', function (req, res) {
    // var arg = url.parse(req.url, true).query;  获取参数
    // console.log(arg)
    var sql = 'SELECT * FROM sanjilist limit 30';
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

// 文件下载
router.get('/download',function(req, res, next){
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