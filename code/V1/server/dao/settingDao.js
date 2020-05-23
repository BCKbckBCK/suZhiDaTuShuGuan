// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var fn = require('./fn');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);


module.exports = {
    //查询
    all: function (req, res, next) {
        var param = req.query || req.params;
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            let sql = 'select name_zh,name,value from `configures`';
            connection.query(sql,'', function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                let ret = {};
                result.forEach(function (item) {
                    ret[item.name] = {nameZh:item.name_zh,value:JSON.parse(item.value)};
                });
                res.json(fn.jsonSuccess(ret));
                connection.release();
            });
        });
    },
};