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
	query: function (req, res, next) {
		let param = req.query || req.params;
		let showType = 'week';
		if(param.show_type && param.show_type != undefined){
			showType = param.show_type;
		}
		pool.getConnection(function(err, connection) {
			connection.query($sql.configures.findConfigByName,['borrowing_list'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
                let showCount = 20;
				let selectParam = [];
				if(result.length<=0){//找不到配置

				}else{//找到了配置
					let configValue = JSON.parse(result[0].value);
					showCount = (configValue.displayCount)*1;
				}
				let startTimeAndEndTime = fn.defaultTime();//本周第一天和最后一天
				if(showType == 'week'){//周

					selectParam.push(moment(startTimeAndEndTime.startTime).format('YYYYMMDDHH'));//周
					selectParam.push(moment(startTimeAndEndTime.endTime).format('YYYYMMDDHH'));//周
					selectParam.push(showCount);
				}
				if(showType == 'month'){
					let monthFirstDay = new Date();
					monthFirstDay.setDate(1); //第一天
					let monthLastDay = new Date(monthFirstDay);
					monthLastDay.setMonth(monthFirstDay.getMonth()+1);
					monthLastDay.setDate(0);

					selectParam.push(moment(monthFirstDay).format('YYYYMMDD00'));//本月第一天
					selectParam.push(moment(monthLastDay).format('YYYYMMDD24'));//本月最后一天
					selectParam.push(showCount);
				}

				if(showType == 'year'){
					selectParam.push((new Date()).getFullYear()+'010100');//本年第一年
					selectParam.push((new Date()).getFullYear()+'123024');//本年最后一天
					selectParam.push(showCount);
				}
				//console.log(selectParam);
				connection.query(
					$sql.borrowingList.query,
					selectParam,
					function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						res.json(fn.jsonSuccess(result));
				});
				connection.release();
			});
		});
	},
	setShowCount:function (req,res,next) {
		var param = req.body;
		if(!param.display_count){
			res.json(fn.jsonFail('参数错误'));
			res.end();return;
		}
		let  configValue = {displayCount:param.display_count};
		pool.getConnection(function(err, connection) {
			connection.query($sql.configures.findConfigByName,['borrowing_list'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length<=0){//没有就创建
					connection.query($sql.configures.insertConfigures,['借阅排行展示时间类型','borrowing_list',JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss")], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('设置成功'));
					});
				}else{
					connection.query($sql.configures.updateConfigures,[JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss"),'borrowing_list',], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('设置成功'));
					});
				}
			});
			connection.release();
		});
	},
	upload:function (req,res,next) {
		var param = req.body;
		if(!param.book_name || !param.book_id || !param.time_value || !param.book_borrow_count){
			res.json(fn.jsonFail('参数错误'));
			res.end();return;
		}
		let addHour = moment(param.time_value).format('YYYYMMDDHH');
		pool.getConnection(function(err, connection) {
			connection.query($sql.borrowingList.hasRecord,[addHour,param.book_id],function (err,result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length>0){
					var sql = $sql.borrowingList.update;
					var sqlParam = [param.book_borrow_count,fn.time(),result.shift().id];
				}else{
					var sql = $sql.borrowingList.add;
					var sqlParam = [
						param.book_name,
						param.book_borrow_count,
						addHour,
						param.book_id,
						fn.time(),fn.time(),
					];
				}
				connection.query(sql,sqlParam, function(err, result) {
					if (err){//错误
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					//操作日志
					fn.insertOperationLog(connection,req);
					res.json(fn.jsonSuccess('上传图书馆借阅排行榜成功'));
				});
			});
			connection.release();
		});
	},
 
};