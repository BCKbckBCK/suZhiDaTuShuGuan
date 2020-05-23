var express = require('express');
var router = express.Router();
var usersDao = require('../dao/usersDao');
var middlewareDao = require('../dao/middleware');
var fn = require('../dao/fn');
var multer  = require('multer');
var upload = multer();
/**
 * @api {get} /users 用户列表
 * @apiVersion 0.1.0
 * @apiName UserList
 * @apiGroup User
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *  "data": [
 *       {
 *          "id": 1,
 *          "username": "aaa",//用户名
 *          "enable": 1,
 *          "created_at": "2019-07-31T07:40:00.000Z"
 *      },
 *      {
 *          "id": 2,
 *          "username": "bbb",
 *          "enable": 1,
 *          "created_at": "2019-07-31T07:49:41.000Z"
 *      }
 *  ],
 *  "code": 200
 *}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "data": "用户名已经存在",
 *       "code": "400"
 *     }
 */
router.get('/',function(req, res, next) {
  usersDao.userList(req,res,next);
});

/**
 * @api {post} /users/add 添加（注册）用户
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} username 用户账号
 * @apiParam {String} password 用户密码
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "添加成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "data": "用户名已经存在",
 *       "code": "400"
 *     }
 */
router.post('/add',upload.array(),middlewareDao.checkPermission, function(req, res, next) {
  usersDao.addUser(req,res,next);
});


/**
 * @api {post} /users/delete 删除用户
 * @apiVersion 0.1.0
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiParam {String} user_id 用户id
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "删除成功",
 *       "code": "200"
 *     }
 */
router.post('/delete',upload.array(),middlewareDao.checkPermission,function(req, res, next) {
  usersDao.delete(req,res,next);
});

/**
 * @api {post} /users/login 登录
 * @apiVersion 0.1.0
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户名
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code  返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "id": 10,
 *       "username": "lei",
 *       "enable": 1,
 *       "created_at": "2019-08-13T01:41:18.000Z",
 *       "deleted_at": null
 *   },
 *   "code": 200
 *}
 */
router.post('/login',upload.array(),function(req, res, next) {
  usersDao.login(req,res,next);
});


/**
 * @api {get} /users/logout 退出登录
 * @apiVersion 0.1.0
 * @apiName logout
 * @apiGroup User
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code  返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "退出成功",
 *   "code": 200
 *}
 */
router.get('/logout',function(req, res, next) {
  req.session.destroy(function(){
    res.json(fn.jsonSuccess('退出成功'));
  });
});

/**
 * @api {post} /users/reset_password 重置密码
 * @apiVersion 0.1.0
 * @apiName resetPassword
 * @apiGroup User
 *
 * @apiParam {String} user_id 用户名
 * @apiParam {String} password 用户名
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code  返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "设置成功",
 *   "code": 200
 *}
 */
router.post('/reset_password',upload.array(),middlewareDao.checkPermission,function(req, res, next) {
  usersDao.resetPassword(req,res,next);
});
module.exports = router;
