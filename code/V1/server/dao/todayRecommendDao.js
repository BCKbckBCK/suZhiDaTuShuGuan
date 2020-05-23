// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
const moment = require('moment');
var fn = require('./fn');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
    //前台展示
	show: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.selectClass,[], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
                let rt = [{name:'热门图书',id:1,list:[]},{name:'新书推荐',id:2,list:[]}];
                if(result.length>0){
					rt[0].id = result[0].id;
					rt[0].name = result[0].name;
					rt[1].id = result[1].id;
					rt[1].name = result[1].name;
				}
                let sql = $sql.todayRecommend.selectShow+';'
					+$sql.todayRecommend.selectShow;
                connection.query(sql,[rt[0].id,rt[1].id],function (err,result) {
					if (err){//错误
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					rt[0].list = result[0];
					rt[1].list = result[1];
                	res.json(fn.jsonSuccess(rt));
				});
				connection.release();
			});
		});
	},
	selectAll:function (req,res,next) {
		let param = req.query;
		let pageSize = param.page_size?param.page_size:10;
		let page = param.page?(param.page-1)*pageSize:0;
		let recommendType = param.type?param.type:0;
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			let sql = $sql.todayRecommend.totalCount+';'
				+$sql.todayRecommend.selectAll;
			connection.query(sql,[recommendType,recommendType,+page,+pageSize], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				let ret = {totalCount:0,list:[]};
				ret.totalCount = result[0][0].totalCount;
				ret.list = result[1];
				res.json(fn.jsonSuccess(ret));
				connection.release();
			});
		});
	},
	add:function (req,res,next) {
		let param = req.body;
		//if(!param.book_id || !param.recommend_type){
		if(!param.book_id){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.add,[param.book_id], function(err, result) {
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
	delete:function (req,res,next) {
		let param = req.body;
		if(!param.book_id){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.delete,[param.book_id], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('设置成功'));
				connection.release();
			});
		});
	},
	forceDelete:function (req,res,next) {
		let param = req.body;
		if(!param.book_id){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.forceDelete,[moment().format("YYYY-MM-DD HH:mm:ss"),param.book_id], function(err, result) {
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
	 sort:function (req,res,next) {
		let param = req.body;
		if(!param.book1_id || !param.book2_id){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.sorts+';'+$sql.todayRecommend.sorts,[param.book1_id,param.book2_id], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				let sql = $sql.todayRecommend.setSort+';'
					+$sql.todayRecommend.setSort;
				let updateData = [
					result[0][0].sort,result[1][0].id,
					result[1][0].sort,result[0][0].id,
				];
				connection.query(sql,updateData,function (err,result) {
					if (err){//错误
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					//操作日志
					fn.insertOperationLog(connection,req);
					res.json(fn.jsonSuccess('设置成功'));
				});
				connection.release();
			});
		});
	},
	updateDownloadCount:function (req,res,next) {
		let param = req.body;
		if(!param.book_id || !param.download_count){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.setDownloadCount,[param.download_count,param.book_id], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('设置成功'));
				connection.release();
			});
		});
	},
	upload:function (req,res,next) {
		if(!req.body.book_id || !req.body.book_name || !req.body.book_type){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		//if(!req.files['book_cover'] || !req.files['book_qrcode']){
		if(!req.body.book_cover_url || !req.body.book_qrcode_url){
			//res.json(fn.jsonFail('请上传封面和二维码图片地址'));
			//return;
		}
		let time_to_market = req.body.time_to_market?req.body.time_to_market:'';
		let insertData = [
			req.body.book_name,
			//req.files['book_cover'][0].filename,
			req.body.book_cover_url,
			//req.files['book_qrcode'][0].filename,
			req.body.book_qrcode_url,
			req.body.customize_download_count?req.body.customize_download_count:0,
			req.body.real_download_count?req.body.real_download_count:0,
			time_to_market,
			moment().format("YYYY-MM-DD HH:mm:ss"),
			moment().format("YYYY-MM-DD HH:mm:ss"),
			req.body.book_id,
			req.body.book_type
		];
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.selectExists,[req.body.book_id], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result[0].num>0){
					res.json(fn.jsonSuccess('已存在该书籍ID'));
				}else{
					connection.query($sql.todayRecommend.insert,insertData, function(err, result) {
						if (err){//错误
							fn.insertSystemLog(connection,req,err);
							res.json(fn.jsonFail('未知错误'));return;
						}
						//操作日志
						fn.insertOperationLog(connection,req);
						res.json(fn.jsonSuccess('上传成功'));
					});
				}
				connection.release();
			});
		});
	},
    types:function (req,res,next) {
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.todayRecommend.selectClass,[], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }

                res.json(fn.jsonSuccess(result));
                connection.release();
            });
        });
    },
	update:function (req,res,next) {//修改
		if(!req.body.book_id || !req.body.book_name || !req.body.book_type){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		//if(!req.files['book_cover'] || !req.files['book_qrcode']){
		if(!req.body.book_cover_url || !req.body.book_qrcode_url){
			//res.json(fn.jsonFail('请上传封面和二维码图片地址'));
			//return;
		}
		let time_to_market = req.body.time_to_market?req.body.time_to_market:moment().format("YYYY-MM-DD HH:mm:ss");
		let updateData = [
			req.body.book_name,
			//req.files['book_cover'][0].filename,
			req.body.book_cover_url,
			//req.files['book_qrcode'][0].filename,
			req.body.book_qrcode_url,
			req.body.customize_download_count?req.body.customize_download_count:0,
			req.body.real_download_count?req.body.real_download_count:0,
			moment(time_to_market).format("YYYY-MM-DD"),
			moment().format("YYYY-MM-DD HH:mm:ss"),
			req.body.book_type,
			req.body.book_id,
		];
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.todayRecommend.update,updateData, function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				//操作日志
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('编辑成功'));
			});
			connection.release();
		});
	},
 
};