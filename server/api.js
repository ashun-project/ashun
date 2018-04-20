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
// connection.connect();

router.get('/getList', function (req, res) {
    // var arg = url.parse(req.url, true).query;  获取参数
    // console.log(arg)
    var sql = 'SELECT * FROM sanjilist';
    //查
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
router.post('/getDetail', function (req, res) {
    console.log(req.body)
    var sql = 'SELECT * FROM sanjidetail where createTime = ' + parseInt(req.body.id);
    //查
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
router.get('/download',function(req, res, next){
    var currPath = "E:\\vue_node_mysql\\file\\",
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