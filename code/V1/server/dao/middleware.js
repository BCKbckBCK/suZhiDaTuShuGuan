var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var fn = require('./fn');
var multer = require('multer');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
module.exports={
    isLogin:function (req,res,next) {
        if (req.session.user) {
            next();
        } else {
            res.json(fn.jsonFail('请先登录'));
        }
    },
    checkPermission:function (req,res,next) {
        if (!req.session.user) {
            res.json(fn.jsonFail('请先登录'));
            return;
        }

        let resource = req.baseUrl;
        if (req.route) { // 正常在control中使用有route属性 但是使用app.use则不会有
            resource = resource + req.route.path;
        }
        console.log('resource', resource);

        // 容错 如果访问的是 /admin/sign/ 后面为 /符号认定也为过
        if (resource[resource.length - 1] === '/') {
            resource = resource.slice(0, -1);
        }
        //查权限
        //let userId = req.body.user_id || req.query.user_id || req.session.user.id;
        pool.getConnection(function(err, connection) {
            connection.query($sql.permissions.userHasHolesIds, [req.session.user.id], function(err, result) {
                if(err) throw err;
                if(result.length<=0){
                    res.json(fn.jsonFail('没有权限'));
                    return;
                }
                let rolesIds = [];
                for (let i=0;i<result.length;i++){
                    rolesIds.push(result[i].role_id);
                }
                connection.query($sql.permissions.roleHasPermissionsIds, [rolesIds], function(err, result) {
                    if(err) throw err;
                    if(result.length<=0){
                        res.json(fn.jsonFail('没有权限'));
                        return;
                    }
                    let permissionsIds = [];
                    for (let i=0;i<result.length;i++){
                        permissionsIds.push(result[i].permission_id);
                    }
                    connection.query($sql.permissions.permissionsInfo, [permissionsIds], function(err, result) {
                        if(err) throw err;
                        for (let i=0;i<result.length;i++){
                            if(result[i].action_url == resource){
                                return next();
                            }
                        }
                        res.json(fn.jsonFail('没有权限'));
                        return;
                    });
                });
            });
            connection.release();
        });
    },
    upload:function () {
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './public/images/uploads/');
                },
                filename: function (req, file, cb) {
                    //file.originalname上传文件的原始文件名
                    var changedName = (new Date().getTime())+'szd-'+file.originalname;
                    cb(null, changedName);
                }
            })
        });
    }
};