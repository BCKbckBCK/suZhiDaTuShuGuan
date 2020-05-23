//通知公告（活动预告）
var express = require('express');
var router = express.Router();
var noticeDao = require('../dao/noticeDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');
/**
 * @api {get} /notice/enable 通知公告--列表（首页前台）
 * @apiVersion 0.1.0
 * @apiName noticeEnable
 * @apiGroup notice
 *
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
router.get('/enable', function(req, res, next) {
    noticeDao.enable(req, res, next);
});
/**
 * @api {get} /notice 通知公告--列表（后台）
 * @apiVersion 0.1.0
 * @apiName notice
 * @apiGroup notice
 *
 * @apiParam {String} [page=1] 第几页
 * @apiParam {String} [page_size=10] 每页显示多少
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
router.get('/', function(req, res, next) {
    noticeDao.list(req, res, next);
});


/**
 * @api {post} /notice/add 通知公告--添加
 * @apiVersion 0.1.0
 * @apiName noticeAdd
 * @apiGroup notice
 *
 * @apiParam {String} [title] 标题
 * @apiParam {String} content 内容
 * @apiParam {String} [display=1] 是否显示（0不显示，1显示）
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
 */
router.post(
    '/add',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        noticeDao.add(req, res, next);
    }
);

/**
 * @api {post} /notice/display 通知公告--设置是否显示
 * @apiVersion 0.1.0
 * @apiName noticeDisplay
 * @apiGroup notice
 *
 * @apiParam {String} notice_id 公告id
 * @apiParam {String} [display=1] 是否显示（0不显示，1显示）
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "设置成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/display',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        noticeDao.display(req, res, next);
    }
);

/**
 * @api {post} /notice/delete 通知公告--删除
 * @apiVersion 0.1.0
 * @apiName noticeDelete
 * @apiGroup notice
 *
 * @apiParam {String} notice_id 公告id
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "删除成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/delete',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        noticeDao.delete(req, res, next);
    }
);

/**
 * @api {post} /notice/edit 通知公告--编辑
 * @apiVersion 0.1.0
 * @apiName noticeEdit
 * @apiGroup notice
 *
 * @apiParam {String} notice_id 公告id
 * @apiParam {String} notice_title 公告标题
 * @apiParam {String} notice_content 公告内容
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "修改成功",
 *       "code": "200"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 */
router.post(
    '/edit',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        noticeDao.edit(req, res, next);
    }
);


module.exports = router;