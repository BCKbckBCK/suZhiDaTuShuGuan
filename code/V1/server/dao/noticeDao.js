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
	enable: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			let sql = 'select * from notice where deleted_at is null and enable=1';
			connection.query(sql,[], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				res.json(fn.jsonSuccess(result));
				connection.release();
			});
		});
	},
	list: function (req, res, next) {
        var param = req.query || req.params;
		let pageSize = param.page_size?param.page_size:10;
		let page = param.page?(param.page-1)*pageSize:0;
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			let sql = $sql.notice.allCount+';'
				+$sql.notice.list;
			connection.query(sql,[+page,parseInt(pageSize)], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				let ret = {totalCount:0,list:[]};
				ret.totalCount = result[0][0].allCount;
				ret.list = result[1];
				ret.list.forEach(function (item) {
					item.enable = Boolean(item.enable);
				});
				res.json(fn.jsonSuccess(ret));
				connection.release();
			});
		});
	},
	add: function (req, res, next) {
		var param = req.body;
		if(!param.content){
			res.json(fn.jsonFail('参数错误'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			let addData = [param.title,param.content,param.display,moment().format("YYYY-MM-DD HH:mm:ss")];
			connection.query($sql.notice.addNotice,addData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('添加成功'));
				connection.release();
			});
		});
	},
	display: function (req, res, next) {
		var param = req.body;
		if(!param.notice_id){
			res.json(fn.jsonFail('参数错误'));
			return;
		}
		console.log(param.display);
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			let addData = [param.display?1:0,parseInt(param.notice_id)];
			connection.query($sql.notice.updateNotice,addData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('修改成功'));
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		var param = req.body;
		if(!param.notice_id){
			res.json(fn.jsonFail('参数错误'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.notice.delete,[moment().format("YYYY-MM-DD HH:mm:ss"),param.notice_id], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('删除成功'));
				connection.release();
			});
		});
	},
	edit: function (req, res, next) {
		var param = req.body;
		if(!param.notice_id){
			res.json(fn.jsonFail('参数错误'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			let updateData = [param.notice_content?param.notice_content:'',param.notice_title?param.notice_title:'',parseInt(param.notice_id)];
			connection.query($sql.notice.editNotice,updateData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('修改成功'));
				connection.release();
			});
		});
	},
};