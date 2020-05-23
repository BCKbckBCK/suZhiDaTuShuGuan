//mysql_connection.js
var mysql = require('mysql');
var db_config = require('../conf/db');

var mysql_connection = {};
module.exports = mysql_connection;

var connection = mysql.createConnection(db_config.mysql);

mysql_connection.query = function(sql,parameter){
    return new Promise(function (resolve) {

        connection.query(sql, parameter,function (error, results, fields) {

            //当查询完毕,结束连接,这种方式比较推荐,会有回调函数
            connection.end(function(err) {
                // The connection is terminated now
                if(err){
                    console.log(err);
                }else {
                    console.log('end');
                }

            });

            //当查询完毕,结束连接,这种方式会立即断开连接,并不会有回调函数
            //connection.destroy();

            //打印数据
            //console.log(results);
            //console.log(fields);

            resolve(formatResult(error, results));
        });
    });
};

function formatResult(err, result){
    if (err){
        return {
            "status": false,
            "data" : err
        }
    }else {
        return {
            "status": true,
            "data" : result
        }
    }
}