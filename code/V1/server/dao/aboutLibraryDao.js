// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
const moment = require('moment');
const fn = require('./fn');
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
	allEnable: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.aboutLibrary.allEnable,[], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				let ret = [];
				for (let item of result){
					if(item.source_url.indexOf('http') != 0){
						item.source_url = 'http://'+req.headers.host+'/images/uploads/'+item.source_url;
					}
					ret.push(item);
				}
				res.json(fn.jsonSuccess(ret));
				connection.release();
			});
		});
	},
	postResource:function (req,res,next) {
		if(!req.body.resource_type || (!req.file && !req.body.resource_url)){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		let insertData = [
			req.body.resource_type,
			req.body.resource_url?req.body.resource_url:req.file.filename,
			req.session.user.id,
			moment().format("YYYY-MM-DD HH:mm:ss"),
			moment().format("YYYY-MM-DD HH:mm:ss")
		];
		pool.getConnection(function(err, connection) {
			connection.query($sql.aboutLibrary.addResource,insertData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				res.json(fn.jsonSuccess('添加成功'));

				//操作日志
				fn.insertOperationLog(connection,req);
				connection.release();
			});
		});
	},
	updateResource:function (req,res,next) {
		if(!req.body.resource_id || (!req.file && !req.body.resource_url)){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		let updateData = [
			req.body.resource_url?req.body.resource_url:req.file.filename,
			req.session.user.id,
			moment().format("YYYY-MM-DD HH:mm:ss"),
			req.body.resource_id
		];
		pool.getConnection(function(err, connection) {
			connection.query($sql.aboutLibrary.updateResource,updateData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}

				res.json(fn.jsonSuccess('修改成功'));

				//操作日志
				fn.insertOperationLog(connection,req);
				connection.release();
			});
		});
	},
	deleteResource:function (req,res,next) {
		if(!req.body.resource_id){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		let deleteData = [
			req.session.user.id,
			moment().format("YYYY-MM-DD HH:mm:ss"),
			req.body.resource_id
		];
		pool.getConnection(function(err, connection) {
			connection.query($sql.aboutLibrary.deleteResource,deleteData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				res.json(fn.jsonSuccess('删除成功'));

				//操作日志
				fn.insertOperationLog(connection,req);
				connection.release();
			});
		});
	},
	setResource:function (req,res,next) {
		if(!req.body.resource_id || req.body.enable === '' || req.body.enable === undefined){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		let setData = [
			req.body.enable?1:0,
			req.session.user.id,
			moment().format("YYYY-MM-DD HH:mm:ss"),
			req.body.resource_id
		];
		pool.getConnection(function(err, connection) {
			connection.query($sql.aboutLibrary.setResource,setData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}

				res.json(fn.jsonSuccess('设置成功'));

				//操作日志
				fn.insertOperationLog(connection,req);
				connection.release();
			});
		});
	},
    all: function (req, res, next) {
        var param = req.query || req.params;
        let pageSize = param.page_size?param.page_size:10;
        let page = param.page?(param.page-1)*pageSize:0;
        let sqlTotal = 'select count(*) totalCount from about_library al left join administrators a on al.`operator_id`=a.`id`' +
        'where al.deleted_at is null;';
        pool.getConnection(function(err, connection) {
            connection.query(sqlTotal+$sql.aboutLibrary.all,[+page,+pageSize], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }

                let ret = {totalCount:0,list:[]};
                ret.totalCount = result[0][0].totalCount;
                ret.list = result[1];
				result[1].forEach(function (item) {
					if(item.updated_at){
						item.updated_at = moment(item.updated_at).format("YYYY-MM-DD HH:mm:ss");
					}else{
						item.updated_at = '';
					}
					item.enable = Boolean(item.enable);
				});
                res.json(fn.jsonSuccess(ret));
                connection.release();
            });
        });
    },
};