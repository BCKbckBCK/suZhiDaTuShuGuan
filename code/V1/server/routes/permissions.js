var express = require('express');
var router = express.Router();
var permissionsDao = require('../dao/permissionsDao');
var middleware = require('../dao/middleware');
var multer  = require('multer');
var upload = multer();

router.get('/',function(req, res, next) {
    res.send('permissions').end();
});
/**
 * @api {get} /permissions/permissions_list 系统权限列表
 * @apiVersion 0.1.0
 * @apiName permissionsList
 * @apiGroup permissions
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": [
 *       {
 *           "id": 673,
 *           "name": "添加用户"
 *       },
 *       {
 *           "id": 674,
 *           "name": "删除用户"
 *       },
 *       {
 *           "id": 675,
 *           "name": "重置密码"
 *       }
 *   ],
 *   "code": 200
 *}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */

router.get(
    '/permissions_list',
    //middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.permissionsList(req,res,next);
    }
);
/**
 * @api {get} /permissions/roles_list 系统角色列表
 * @apiVersion 0.1.0
 * @apiName rolesList
 * @apiGroup permissions
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": [
 *       {
 *           "id": 57,
 *           "name": "管理员"
 *       },
 *       {
 *           "id": 58,
 *           "name": "客服"
 *       }
 *   ],
 *   "code": 200
 *}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.get(
    '/roles_list',
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.rolesList(req,res,next);
    }
);
/**
 * @api {get} /permissions/user_has_roles 用户拥有的角色列表
 * @apiVersion 0.1.0
 * @apiName userHasRoles
 * @apiGroup permissions
 *
 * @apiParam {String} user_id 用户id.
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": [
 *       {
 *           "id": 57,
 *           "name": "管理员"
 *       },
 *       {
 *           "id": 58,
 *           "name": "客服"
 *       }
 *   ],
 *   "code": 200
 *}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.get(
    '/user_has_roles',
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.userHasRoles(req,res,next);
    }
);
/**
 * @api {get} /permissions/role_has_permissions 角色拥有的权限列表
 * @apiVersion 0.1.0
 * @apiName role_has_permissions
 * @apiGroup permissions
 *
 ** @apiParam {String} role_id 角色id.
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": [
 *       {
 *           "id": 673,
 *           "name": "添加用户",
 *           "action_url": "/users/add"
 *       },
 *       {
 *           "id": 674,
 *           "name": "删除用户",
 *           "action_url": "/users/delete"
 *       },
 *       {
 *           "id": 675,
 *           "name": "重置密码",
 *           "action_url": "/users/reset"
 *       }
 *   ],
 *   "code": 200
 *}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.get(
    '/role_has_permissions',
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.roleHasPermissions(req,res,next);
    }
);
/**
 * @api {post} /permissions/sync_permission_to_role 同步权限到角色
 * @apiVersion 0.1.0
 * @apiName syncPermissionToRole
 * @apiGroup permissions
 *
 * @apiParam {String} role_id 角色id.
 * @apiParam {Array} permissions_ids 权限id.
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data":"更新成功",
 *   "code": 200
 *}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/sync_permission_to_role',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.syncPermissionToRole(req,res,next);
    }
);
/**
 * @api {post} /permissions/sync_role_to_user 同步角色到用户
 * @apiVersion 0.1.0
 * @apiName syncRoleToUser
 * @apiGroup permissions
 *
 * @apiParam {String} user_id 用户id.
 * @apiParam {Array} roles_ids 角色id.
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "更新成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/sync_role_to_user',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.syncRoleToUser(req,res,next);
    }
);

/**
 * @api {post} /permissions/add_role 新建角色
 * @apiVersion 0.1.0
 * @apiName addRole
 * @apiGroup permissions
 *
 * @apiParam {String} role_name 角色名称.
 * @apiParam {Array} [permissions_ids=空] 权限id.
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/add_role',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.addRole(req,res,next);
    }
);

/**
 * @api {post} /permissions/delete_role 删除角色
 * @apiVersion 0.1.0
 * @apiName deleteRole
 * @apiGroup permissions
 *
 * @apiParam {String} role_id 角色名称.
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/delete_role',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        permissionsDao.deleteRole(req,res,next);
    }
);
module.exports = router;
