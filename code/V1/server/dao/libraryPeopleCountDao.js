// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
const fn = require('./fn');
const moment = require('moment');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
    //查询
	query: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.configures.findConfigByName,['library_opening_hours'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				let opening = true;
				let configValue = JSON.parse(result[0].value);
				if(result.length>0){
					let thisHour = moment().format('HHmm');
					if(configValue.openTime>thisHour || configValue.closeTime<thisHour){
						opening = false;
					}
				}
				//if(!opening){
				if(false){
					res.json(fn.jsonFail('现在是闭馆时间'));
				}else{
					let sql = $sql.libraryPeopleCount.recently+';'//
						+$sql.libraryPeopleCount.thisPeriod+';'//本周数据
						+$sql.libraryPeopleCount.totalCount+';'//总数据
						+'select SUM(`count`) total from library_people_count where `hour` between ' +
						moment().format("YYYYMMDD00")+' and '+moment().format("YYYYMMDD23");//今日在馆人数
					//今日开馆时间段
					let todayOpenTime = moment().format('YYYYMMDD')+moment(configValue.openTime).format('HH');
					let todayCloseTime = moment().format('YYYYMMDD')+moment(configValue.closeTime).format('HH');
					//本周开始和结束时间
					let defaultTime = fn.defaultTime();
					let thisWeekStartTime = moment(defaultTime.startTime).format("YYYYMMDDHH");
					let thisWeekEndTime = moment(defaultTime.endTime).format("YYYYMMDDHH");

					connection.query(sql,[todayOpenTime,todayCloseTime,thisWeekStartTime,thisWeekEndTime], function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						let ret = {hoursCount:[],weekCount:0,peopleInLibrary:0,totalCount:0};
						//每小时数据
						//let recentlyHours = fn.startSomeHourAgo(14);
						let startOpenTime = moment().format('YYYY-MM-DD ')+moment(configValue.openTime).format('HH:mm:ss');
						let endCloseTime = moment().format('YYYY-MM-DD ')+moment(configValue.closeTime).format('HH:mm:ss');
						let recentlyHours = fn.getDuration('hour',startOpenTime,endCloseTime);
						recentlyHours.forEach(function (item) {
							//let data = {time:moment(item).format('YYYY-MM-DD HH:mm:ss'),count:0};
							let data = {time:moment(item).format('H:00'),count:0};
							for (let hourCount of result[0]){
								if(hourCount.hour == moment(item).format('YYYYMMDDHH')){
									data.count = hourCount.count;
									break;
								}
							}

							ret.hoursCount.push(data);
						});
						//本周数据
						ret.weekCount = result[1][0].count;
						ret.totalCount = result[2][0].count;
						ret.peopleInLibrary = result[3][0].total;
						res.json(fn.jsonSuccess(ret));
					});
				}

			});
			connection.release();
		});
	},
	setClosedTime:function (req, res, next) {
		let param = req.body;
		if(!param.open_time || !param.close_time){
			res.json(fn.jsonSuccess('缺少参数'));
			return;
		}
		if(!moment(param.open_time).isValid() || !moment(param.close_time).isValid()){
			res.json(fn.jsonSuccess('参数错误'));
			return;
		}
		let open_time = moment(param.open_time).format('YYYY-MM-DD HH:mm:ss');
		let close_time = moment(param.close_time).format('YYYY-MM-DD HH:mm:ss');
		let configValue = {openTime:open_time,closeTime:close_time};
		pool.getConnection(function(err, connection) {
			connection.query($sql.configures.findConfigByName,['library_opening_hours'], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length<=0){
					connection.query($sql.configures.insertConfigures,['图书馆开放时间','library_opening_hours',JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss")], function(err, result) {
						if(err) throw err;
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('设置成功'));
					});
				}else{
					connection.query($sql.configures.updateConfigures,[JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss"),'library_opening_hours',], function(err, result) {
						if(err) throw err;
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('设置成功'));
					});
				}
			});
			connection.release();
		});
	},
};