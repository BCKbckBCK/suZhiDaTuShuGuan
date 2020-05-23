// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var moment = require('moment');
var hash = require('pbkdf2-password')();
var fn = require('../dao/fn');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
	addUser:function(req, res, next){
		var param = req.body;
		var user = {username:param.username};
		if(!param.username || !param.password){
			res.json(fn.jsonFail('用户名和密码不能为空'));
			res.end();return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.users.userExists,[param.username], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result[0].num){
					res.json(fn.jsonFail('用户名已经存在'));
					res.end();return;
				}
				hash({ password: param.password }, function (err, pass, salt, hash) {
					if (err){//错误
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					// store the salt & hash in the "db"
					user.salt = salt;
					user.password = hash;
					pool.getConnection(function(err, connection) {
						connection.query($sql.users.addUser,[user.username,user.password,moment().format("YYYY-M-D H:m:s"),user.salt], function(err, result) {
							if (err){//错误
								fn.insertSystemLog(connection,req,err);
								res.json(fn.jsonFail('未知错误'));return;
							}
							req.session.regenerate(function(){
								// Store the user's primary key
								// in the session store to be retrieved,
								// or in this case the entire user object
								req.session.user = user;
								res.json(fn.jsonSuccess('添加成功'));
								//res.send(rs);
								res.end();
							});
							//操作日志
							req.body.password='';
							fn.insertOperationLog(connection,req);
							connection.release();
						});
					});
				});
				connection.release();
			});
		});
	},
    //查询
	userList: function (req, res, next) {
        var param = req.query || req.params;
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.users.userList,[], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				res.json(fn.jsonSuccess(result));
                res.end();
				connection.release();
			});
		});
	},
	login:function (req, res, next) {
		var param = req.body;
		console.log(param);
		if(!param.username || !param.password){
			res.json(fn.jsonFail('用户名和密码不能为空'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.users.findUserByUserName,[param.username], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				if(result.length <= 0){
					res.json(fn.jsonFail('没有这个用户'));return;
				}else if(result[0].enable == 0){
					res.json(fn.jsonFail('该用户已经删除'));return;
				}
				hash({ password: param.password,salt:result[0].salt }, function (err, pass, salt, hash) {
					if (err){//错误
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					if(result[0].password !== hash){
						res.json(fn.jsonFail('用户名或者密码错误'));return;
					}{
						req.session.regenerate(function(err){
							// Store the user's primary key
							// in the session store to be retrieved,
							// or in this case the entire user object
							req.session.user = result[0];
							delete result[0].password;
							delete result[0].salt;
							res.json(fn.jsonSuccess(result[0]));
							res.end();
						});
					}
				});
				connection.release();
			});
		});
	},
	delete:function (req,res,next) {
		var param = req.body;
		if(!param.user_id){
			res.json(fn.jsonFail('参数错误'));
			return;
		}
		pool.getConnection(function(err, connection) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			connection.query($sql.users.deleteUser,[moment().format("YYYY-MM-DD HH:mm:ss"),param.user_id], function(err, result) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				fn.insertOperationLog(connection,req);
				res.json(fn.jsonSuccess('删除成功'));
				connection.release();
			});
		});
	},
	resetPassword:function (req,res,next) {
		var param = req.body;
		if(!param.user_id || !param.password){
			res.json(fn.jsonFail('缺少参数'));
			return;
		}
		hash({ password: param.password }, function (err, pass, salt, hash) {
			if (err){//错误
				fn.insertSystemLog(connection,req,err);
				res.json(fn.jsonFail('未知错误'));return;
			}
			// store the salt & hash in the "db"
			pool.getConnection(function(err, connection) {
				if (err){//错误
					fn.insertSystemLog(connection,req,err);
					res.json(fn.jsonFail('未知错误'));return;
				}
				connection.query($sql.users.resetPassword,[salt,hash,param.user_id], function(err, result) {
					if (err){//错误
						fn.insertSystemLog(connection,req,err);
						res.json(fn.jsonFail('未知错误'));return;
					}
					res.json(fn.jsonSuccess('设置成功'));
					//操作日志
					req.body.password = '';
					fn.insertOperationLog(connection,req);
					connection.release();
				});
			});
		});
	}
 
};