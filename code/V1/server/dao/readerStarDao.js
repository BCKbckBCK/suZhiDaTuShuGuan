// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var moment = require('moment');
var fn = require('./fn');
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
module.exports = {
    //查询
	query: function (req, res, next) {
		var param = req.query || req.params;
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.configures.findConfigByName,['reader_star'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length<=0){//找不到配置
					//默认从昨天开始
					let yesterdayTime = moment((new Date()).getTime()-24*60*60*1000);
					let startTime = yesterdayTime.format('YYYYMMDD00');
					let endTime = yesterdayTime.format('YYYYMMDD23');
					let sql = 'SELECT SUM('+connection.escapeId((param.show_type?param.show_type:'read_count'))+') show_number,any_value(`reader_name`) reader_name from reader_star ' +
						'where `hour` between ? and ? ' +
						'GROUP BY reader_uuid ORDER BY show_number desc';
					connection.query(sql,[startTime,endTime], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						res.json(fn.jsonSuccess(result));
					});
				}else {//找到了配置
					let configValue = JSON.parse(result[0].value);
					let limitNumber = configValue.displayCount?configValue.displayCount:10;
					let customizeTime = configValue.timeValue.split('@');
					if(!customizeTime[1] || !moment(customizeTime[1]).isValid()){//没有结束时间就表示到目前时间点
						customizeTime[1] = moment().format('YYYY-MM-DD HH:mm:ss');
					}
					let startTimeAndEndTime = {startTime:moment(customizeTime[0]).format('YYYYMMDDHH'),endTime:moment(customizeTime[1]).format('YYYYMMDDHH')};
					let sql = 'SELECT SUM('+connection.escapeId((param.show_type?param.show_type:'read_count'))+') show_number,any_value(reader_name) reader_name from library.reader_star ' +
						'where `hour` between ? and ? ' +
						'GROUP BY reader_uuid ORDER BY show_number desc limit ?';
					connection.query(sql,[startTimeAndEndTime.startTime,startTimeAndEndTime.endTime,+limitNumber], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						res.json(fn.jsonSuccess(result));
					});
				}
				connection.release();
			});

		});
	},
	borrowerCount: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.configures.findConfigByName,['reader_star'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length<=0){//找不到配置
					//默认从昨天开始
					let yesterdayTime = moment((new Date()).getTime()-24*60*60*1000);
					let startTime = yesterdayTime.format('YYYYMMDD00');
					let endTime = yesterdayTime.format('YYYYMMDD23');
					let sql = 'SELECT SUM(read_count) borrower_number,any_value(`borrow_name`) borrow_name from borrower_star ' +
						'where `hour` between ? and ? ' +
						'GROUP BY borrow_uuid ORDER BY borrower_number desc';
					connection.query(sql,[startTime,endTime], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						res.json(fn.jsonSuccess(result));
					});
				}else {//找到了配置
					let configValue = JSON.parse(result[0].value);
					let limitNumber = configValue.displayCount?configValue.displayCount:10;
					let customizeTime = configValue.timeValue.split('@');
					if(!customizeTime[1] || !moment(customizeTime[1]).isValid()){//没有结束时间就表示到目前时间点
						customizeTime[1] = moment().format('YYYY-MM-DD HH:mm:ss');
					}
					let startTimeAndEndTime = {startTime:moment(customizeTime[0]).format('YYYYMMDDHH'),endTime:moment(customizeTime[1]).format('YYYYMMDDHH')};
					let sql = 'SELECT SUM(`read_count`) borrower_number,any_value(borrow_name) borrow_name from borrower_star ' +
						'where `hour` between ? and ? ' +
						'GROUP BY borrow_uuid ORDER BY borrower_number desc limit ?';
					connection.query(sql,[startTimeAndEndTime.startTime,startTimeAndEndTime.endTime,+limitNumber], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						res.json(fn.jsonSuccess(result));
					});
				}
				connection.release();
			});

		});
	},
	setType:function (req,res,next) {
		var param = req.body;
		let realTime = '';
		if(!param.time_value){
			res.json(fn.jsonFail('参数错误'));
			res.end();return;
		}
		let startAndEndTime =  param.time_value.split('@');
		if(!startAndEndTime[0] || !moment(startAndEndTime[0]).isValid()){//没有开始时间或者样式不对
			res.json(fn.jsonFail('开始时间格式错误'));
			res.end();return;
		}
		if(!startAndEndTime[1] || !moment(startAndEndTime[1]).isValid()){//没有结束时间或者样式不对
			realTime = moment(startAndEndTime[0]).format("YYYY-MM-DD HH:mm:ss")+'@';
		}else{
			realTime = moment(startAndEndTime[0]).format("YYYY-MM-DD HH:mm:ss")+'@'+moment(startAndEndTime[1]).format("YYYY-MM-DD HH:mm:ss");
		}
		let  configValue = {timeValue:realTime,displayCount:(param.display_count?param.display_count:20)};
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.configures.findConfigByName,['reader_star'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length<=0){//没有就创建
					connection.query($sql.configures.insertConfigures,['阅读之星配置','reader_star',JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss")], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('设置成功'));
					});
				}else{
					connection.query($sql.configures.updateConfigures,[JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss"),'reader_star',], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('设置成功'));
					});
				}
				connection.release();
			});
		});
	},
 
};