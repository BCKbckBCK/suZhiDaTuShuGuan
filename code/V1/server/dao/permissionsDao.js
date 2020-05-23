// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var fn = require('./fn');
var moment = require('moment');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
module.exports = {
    permissionsList:function (req, res, next) {
        var param = req.query || req.params;
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.permissions.permissionsList, [], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                res.json(fn.jsonSuccess(result));
                connection.release();
            });
        });
    },
    rolesList:function (req, res, next) {
        var param = req.query || req.params;
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.permissions.rolesList, [], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                res.json(fn.jsonSuccess(result));
                connection.release();
            });
        });
    },
    userHasRoles:function (req, res, next) {
        let param = req.query || req.params;
        if(!param.user_id){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.permissions.userHasHolesIds, [param.user_id], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                let rolesIds = [];
                if(result.length<=0){
                    res.json(fn.jsonSuccess([]));
                    return;
                }
                for (let i=0;i<result.length;i++){
                    rolesIds.push(result[i].role_id);
                }
                connection.query($sql.permissions.rolesInfo, [rolesIds], function(err, result) {
                    if (err){//错误
                        fn.insertSystemLog(connection,req,err);
                        res.json(fn.jsonFail('未知错误'));return;
                    }
                    res.json(fn.jsonSuccess(result));
                });
            });
            connection.release();
        });
    },
    roleHasPermissions:function (req, res, next) {
        let param = req.query || req.params;
        if(!param.role_id){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.permissions.roleHasPermissionsIds, [param.role_id], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                let permissionsIds = [];
                if(result.length<=0){
                    res.json(fn.jsonSuccess([]));
                    return;
                }
                for (let i=0;i<result.length;i++){
                    permissionsIds.push(result[i].permission_id);
                }
                connection.query($sql.permissions.permissionsInfo, [permissionsIds], function(err, result) {
                    if (err){//错误
                        fn.insertSystemLog(connection,req,err);
                        res.json(fn.jsonFail('未知错误'));return;
                    }
                    res.json(fn.jsonSuccess(result));
                });
            });
            connection.release();
        });
    },
    syncPermissionToRole:function (req, res, next) {
        let param = req.body;
        if(!param.role_id){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            let sql =  'delete from role_has_permissions where role_id='+connection.escape(param.role_id)+';';
            if(param.permissions_ids && param.permissions_ids.length && param.permissions_ids.filter(function(n){return n})){
                for (let i=0; i<param.permissions_ids.length;i++){
                    sql += 'insert into `role_has_permissions`(role_id,permission_id)values('+connection.escape(param.role_id)+','+connection.escape((param.permissions_ids)[i])+');';
                }
            }
            connection.query(sql, [], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                //操作日志
                fn.insertOperationLog(connection,req);
                res.json(fn.jsonSuccess('更新成功'));
            });
            connection.release();
        });
    },
    syncRoleToUser:function (req, res, next) {
        let param = req.body;
        if(!param.user_id){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            let sql =  'delete from model_has_roles where model_id='+connection.escape(param.user_id)+';';
            if(param.roles_ids && param.roles_ids.length && param.roles_ids.filter(function(n){return n})){//如果传了权限id
                for (let i=0; i<param.roles_ids.length;i++){
                    sql += 'insert into `model_has_roles`(model_id,role_id)' +
                        'values(' +
                        connection.escape(param.user_id)+','+connection.escape((param.roles_ids)[i])+
                        ');';
                }
            }
            connection.query(sql, [], function(err, result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                //操作日志
                fn.insertOperationLog(connection,req);
                res.json(fn.jsonSuccess('更新成功'));
            });
            connection.release();
        });
    },
    addRole:function (req, res, next) {
        let param = req.body;
        if(!param.role_name){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.permissions.findRoleByName,[param.role_name],function (err,result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                if(result.length>0){
                    res.json(fn.jsonFail('角色名已经存在'));
                    return;
                }
                connection.query($sql.permissions.addRole,[param.role_name,fn.time(),fn.time(),req.session.user.id],function (err,result) {
                    if (err){//错误
                        fn.insertSystemLog(connection,req,err);
                        res.json(fn.jsonFail('未知错误'));return;
                    }
                    let roleId = result.insertId;
                    let sql = '';
                    if(param.permissions_ids && param.permissions_ids.length && param.permissions_ids.filter(function(n){return n})){
                        for (let i=0; i<param.permissions_ids.length;i++){
                            sql += 'insert into `role_has_permissions`(role_id,permission_id)values('+roleId+','+connection.escape((param.permissions_ids)[i])+');';
                        }
                    }
                    if(sql == ''){sql = 'select 1+1'}
                    connection.query(sql, [], function(err, result) {
                        if (err){//错误
                            fn.insertSystemLog(connection,req,err);
                            res.json(fn.jsonFail('未知错误'));return;
                        }
                        //操作日志
                        fn.insertOperationLog(connection,req);
                        res.json(fn.jsonSuccess('添加角色成功'));
                    });
                });
                connection.release();
            });
        });
    },
    deleteRole:function (req, res, next) {
        let param = req.body;
        if(!param.role_id){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        pool.getConnection(function(err, connection) {
            if (err){//错误
                fn.insertSystemLog(connection,req,err);
                res.json(fn.jsonFail('未知错误'));return;
            }
            connection.query($sql.permissions.deleteRole,[param.role_id,param.role_id,param.role_id],function (err,result) {
                if (err){//错误
                    fn.insertSystemLog(connection,req,err);
                    res.json(fn.jsonFail('未知错误'));return;
                }
                res.json(fn.jsonSuccess('删除成功'));
                connection.release();
            });
        });
    },
};