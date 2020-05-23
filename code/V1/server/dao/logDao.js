// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var fn = require('./fn');
var moment = require('moment');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);


module.exports = {
    //查询
    systemLog: function (req, res, next) {
        var param = req.query || req.params;
        let pageSize = param.page_size?param.page_size:10;
        let page = param.page?(param.page-1)*pageSize:0;
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            let sql = 'select id,session,action_url,parameter,error_infomation,created_at,ip' +
                ' from system_log  order by id desc limit ?,?;';
            let totalSql = 'select count(*) totalCount from system_log;';
            connection.query(totalSql+sql,[+page,parseInt(pageSize)], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                let ret = {totalCount:0,list:[]};
                ret.totalCount = result[0][0].totalCount;
                result[1].forEach(function (item) {
                    ret.list.push({
                        ip:item.ip,
                        url:item.action_url,
                        content:'',
                        created_time:moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
                    });
                });
                // ret.list = [{
                //     'ip':"192.168.0.1",
                //     'url':'http://localhost:3000/a.html',
                //     'content':'这是备注',
                //     'created_time':'2018-11-11 11:11:11'
                // }];
                res.json(fn.jsonSuccess(ret));
                connection.release();
            });
        });
    },
    operationLog: function (req, res, next) {
        var param = req.query || req.params;
        let pageSize = param.page_size?param.page_size:10;
        let page = param.page?(param.page-1)*pageSize:0;
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            let sql = 'select id,session,action_url,parameter,created_at' +
                ' from operation_log  order by id desc limit ?,?;';
            let totalSql = 'select count(*) totalCount from operation_log;';
            connection.query(totalSql+sql,[+page,parseInt(pageSize)], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                let ret = {totalCount:0,list:[]};
                ret.totalCount = result[0][0].totalCount;
                result[1].forEach(function (item) {
                    let sessionObj =  JSON.parse(item.session);
                    ret.list.push({
                        'operator_user':sessionObj.user.username,
                        'ip':"",
                        'content':item.action_url+'===>'+item.parameter,
                        'created_time':moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
                    });
                });
                // ret.list = [{
                //     'operator_user':'郭老师',
                //     'ip':"192.168.0.1",
                //     'content':'郭老师上传了一张自己的自拍照',
                //     'created_time':'2018-11-11 11:11:11'
                // }];
                res.json(fn.jsonSuccess(ret));
                connection.release();
            });
        });
    },
};