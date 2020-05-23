// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var moment = require('moment');
const fn = require('./fn');
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
    //查询
	query: function (req, res, next) {
        //var param = req.query || req.params;
		pool.getConnection(function(err, connection) {
			connection.query($sql.configures.findConfigByName,['borrowing_count'], function(err, result) {
				if(err){
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }

				let timeValue = 'week';//展示类型
				let startTime = moment().format('YYYYww');//开始时间
				let endTime = startTime;//结束时间
				let realStartTime = fn.defaultTime().startTime;
				let realEndTime = fn.defaultTime().endTime;

				if(result.length>0){//如果找到了配置
					let configValue = JSON.parse(result[0].value);
					let customizeTime = configValue.timeValue.split('@');
					timeValue = configValue.timeType;
					startTime = customizeTime[0];
					realStartTime = configValue.realStartTime;
					if(!customizeTime[1] || !moment(customizeTime[1]).isValid()){//没有结束时间就取最新的时间
						realEndTime = moment().format('YYYY-MM-DD HH:mm:ss');
						endTime = formatTimeString(timeValue,realEndTime);
					}else{
						endTime = customizeTime[1];
						realEndTime = configValue.realEndTime;
					}
				}
				//---------------上面是配置信息
				let itemsCount = 'select SUM(`borrow_count`) items,any_value(btime) full_time,'+connection.escapeId(timeValue)+' as time_value from borrowing_count where '+connection.escapeId(timeValue)
					+' between ? and ?'
					+' group by '+connection.escapeId(timeValue)+';';//计算分段借阅量
				let totalCount = 'select SUM(`borrow_count`) total from borrowing_count where '+connection.escapeId(timeValue)+' between ? and ?';//计算总的借阅量
				connection.query(itemsCount+totalCount,[startTime,endTime,startTime,endTime], function(err, result) {
					if(err){
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					let timeType = timeValue;
					let ret = {items:[],total:0,time_type:formatDateString(timeType)};
					result[0].forEach(function (item) {
						ret.items.push({
							count:item.items,
							time_value:item.time_value,
							full_time:moment(item.full_time).format("YYYY-MM-DD HH:mm:ss")
						});
					});

					ret.total = result[1][0].total;
					ret.items = formatResult(
						{
							timeType:timeType,
							startTime:realStartTime,
							endTime:realEndTime
						},
						ret.items,
					);
					let finalSql = '';
					ret.items.forEach(function (item) {
						finalSql += 'select SUM(`borrow_count`) total from borrowing_count where `hour` <= '+moment(item.time_value).format("YYYYMMDDHH")+';';
					});

					//下面代码主要是为了把finalSql执行的结果放到相关的ret.items列表里面
					connection.query(finalSql,[], function(err, result) {
						result.forEach(function (item,key) {
							ret.items.forEach(function (item2) {
								if(item2.key == key){
									if(result.length>1){//兼容只查到一条数据的情况
										ret.items[key].total_count =  item[0].total;
									}else{
										ret.items[key].total_count =  item.total;
									}
								}
							});
						});
						res.json(fn.jsonSuccess(ret));
					})
				});
			});
			connection.release();
		});
	},
	setType:function (req,res,next) {
		var param = req.body;
		let realTime = '';
		if(!param.time_type || !param.time_value){
			res.json(fn.jsonFail('参数错误'));
			res.end();return;
		}
		//转换时间
		let startAndEndTime =  param.time_value.split('@');
		if(!startAndEndTime[0] || !moment(startAndEndTime[0]).isValid()){//没有开始时间或者样式不对
			res.json(fn.jsonFail('开始时间格式错误'));
			res.end();return;
		}

		startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYY-MM-DD HH:mm:ss');
		startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYY-MM-DD HH:mm:ss');
		if(!startAndEndTime[1] || !moment(startAndEndTime[1]).isValid()){//没有结束时间或者样式不对
			realTime = [startAndEndTime[0],''];
		}else{
			realTime = [startAndEndTime[0],startAndEndTime[1]];
		}
		switch (param.time_type) {
			case 'hour':
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYYMMDDHH');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYYMMDDHH');
				break;
			case 'day':
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYYMMDD');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYYMMDD');
				break;
			case 'week':
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYYww');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYYww');
				break;
			case 'month':
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYYMM');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYYMM');
				break;
			case 'season':
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYYQ');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYYQ');
			 	break;
			case 'year':
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYY');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYY');
				break;
			default:
				startAndEndTime[0] = moment(startAndEndTime[0]).format('YYYYMMDD');
				startAndEndTime[1] = moment(startAndEndTime[1]).format('YYYYMMDD');
				param.time_type = 'day';
		}
		if(!realTime[1]){//如果没有结束时间
			startAndEndTime[1] = '';
		}
		param.time_value = startAndEndTime.join('@');
		let  configValue = {
			timeType:param.time_type,
			timeValue:param.time_value,
			realStartTime:realTime[0],
			realEndTime:realTime[1],
			//displayCount:(param.display_count?param.display_count:20)
		};
		pool.getConnection(function(err, connection) {
			connection.query($sql.configures.findConfigByName,['borrowing_count'], function(err, result) {
                if(err){
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
				if(result.length<=0){//没有就创建
					connection.query($sql.configures.insertConfigures,['借阅量统计','borrowing_count',JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss")], function(err, result) {
                        if(err){
                            fn.insertSystemLog(connection,req,err);
                            res.json(fn.jsonFail('未知错误'));return;
                        }
						res.json(fn.jsonSuccess('设置成功'));
					});
				}else{
					connection.query($sql.configures.updateConfigures,[JSON.stringify(configValue),moment().format("YYYY-MM-DD HH:mm:ss"),'borrowing_count',], function(err, result) {
                        if(err){
                            fn.insertSystemLog(connection,req,err);
                            res.json(fn.jsonFail('未知错误'));return;
                        }
						res.json(fn.jsonSuccess('设置成功'));
					});
				}
				fn.insertOperationLog(connection,req);//日志
			});
			connection.release();
		});
	},
    upload:function (req,res,next) {
        var param = req.body;
        if(!param.time_value || !param.borrow_count){
            res.json(fn.jsonFail('参数错误'));
            res.end();return;
        }
        let addHour = moment(param.time_value).format('YYYYMMDDHH');//小时
        let addDay = moment(param.time_value).format('YYYYMMDD');//日
        let addWeek = moment(param.time_value).format('YYYYww');//星期
        let addMonth = moment(param.time_value).format('YYYYMM');//月
        let addSeason = moment(param.time_value).format('YYYYQ');//季
        let addYear = moment(param.time_value).format('YYYY');//年
        pool.getConnection(function(err, connection) {
            connection.query($sql.borrowingCount.hasRecord,[addHour],function (err,result) {
                if(err){
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                if(result.length>0){
                    var sql = $sql.borrowingCount.update;
                    var sqlParam = [param.borrow_count,fn.time(),result.shift().id];
                }else{
                    var sql = $sql.borrowingCount.add;
                    var sqlParam = [
                        param.borrow_count,
                        addHour,
                        addDay,
                        addWeek,
                        addMonth,
                        addSeason,
                        addYear,
                        moment(param.time_value).format("YYYY-MM-DD HH:mm:ss"),
                        fn.time(),fn.time(),
                    ];
                }
                connection.query(sql,sqlParam, function(err, result) {
                        if(err){
                            fn.insertSystemLog(connection,req,err);
                            res.json(fn.jsonFail('未知错误'));return;
                        }
                        fn.insertOperationLog(connection,req);//日志
                        res.json(fn.jsonSuccess('上传图书馆借阅排行榜成功'));
                }
                );
            });
            connection.release();
        });
    },
};

function formatResult(listConfig,list) {
	let durations = fn.getDuration(listConfig.timeType,listConfig.startTime,listConfig.endTime);
	//console.log(durations);
	let resultList = [];
	let count = 0;
	let totalCount = 0;
	let timeFormat = '';
	let timeValue = '';
	durations.forEach(function (item,keys) {
		count = 0;
		if(listConfig.timeType == 'day'){
			for(let i = 0;i<list.length;i++) {
				if (moment(item).format('YYYYMMDD') == list[i].time_value) {
					count = list[i].count;
					break;
				}
			}
			timeFormat = moment(item).format("MM-DD");
			timeValue = moment(item).add(1,'day').format("YYYY-MM-DD HH:ss:mm");
		}else if(listConfig.timeType == 'hour'){
			for(let i = 0;i<list.length;i++) {
				if (moment(item).format('YYYYMMDDHH') == list[i].time_value) {
					count = list[i].count;
					break;
				}
			}
			timeFormat = moment(item).format("H");
			timeValue = moment(item).format("YYYY-MM-DD HH:ss:mm");
		}else if(listConfig.timeType == 'week'){
			for(let i = 0;i<list.length;i++) {
				if (moment(item).format('YYYYww') == list[i].time_value) {
					count = list[i].count;
					break;
				}
			}
			timeFormat = moment(item).format("MM-DD");
			timeValue = moment(item).format("YYYY-MM-DD HH:ss:mm");
		}else if(listConfig.timeType == 'month'){
			for(let i = 0;i<list.length;i++) {
				if (moment(item).format('YYYYMM') == list[i].time_value) {
					count = list[i].count;
					break;
				}
			}
			timeFormat = moment(item).format("M月");
			timeValue = moment(item).format("YYYY-MM-DD HH:ss:mm");
		}
		resultList.push({count:count,key:keys,total_count:totalCount,time_format:timeFormat,time_value:timeValue});
	});
	return resultList;
}

function formatDateString(tName) {
	switch (tName) {
		case 'hour':
			return '小时';
			break;
		case 'day':
			return '天';
			break;
		case 'week':
			return '周';
			break;
		case 'month':
			return '月';
			break;
		case 'season':
			return '季';
			break;
		case 'year':
			return '年';
			break;
		default:
			return '未知时间单位';
			break;
	}
}

function formatTimeString(timeType,timeValue) {
	let ret = '';
	switch (timeType) {
		case 'hour':
			ret = moment(timeValue).format('YYYYMMDDHH');
			break;
		case 'day':
			ret = moment(timeValue).format('YYYYMMDD');
			break;
		case 'week':
			ret = moment(timeValue).format('YYYYww');
			break;
		case 'month':
			ret = moment(timeValue).format('YYYYMM');
			break;
		case 'season':
			ret = moment(timeValue).format('YYYYQ');
			break;
		case 'year':
			ret = moment(timeValue).format('YYYY');
			break;
		default:
			ret = moment(timeValue).format('YYYYMMDD');
	}

	return ret;
}