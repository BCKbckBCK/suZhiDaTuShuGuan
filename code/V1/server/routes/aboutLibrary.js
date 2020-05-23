//本馆风采展示
var express = require('express');
var router = express.Router();
var aboutLibraryDao = require('../dao/aboutLibraryDao');
var middleware = require('../dao/middleware');
var multer  = require('multer');
var upload = multer();
/**
 * @api {get} /about-library 本馆风采展示
 * @apiVersion 0.1.0
 * @apiName aboutLibrary
 * @apiGroup aboutLibrary
 *
 * @apiDescription 不需要传参数，后台设置显示方式
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "items": [ //时间分段的借阅量
 *           {
 *               "count": 3982,
 *               "time_type": "day",
 *               "time_value": 20190508
 *           },
 *           {
 *               "count": 9341,
 *               "time_type": "day",
 *               "time_value": 20190513
 *           }
 *       ],
 *       "total": {
 *           "total": 28648 //总借阅量
 *       }
 *   },
 *   "code": 200
 *}
 *
 */
router.get('/', function(req, res, next) {
    aboutLibraryDao.allEnable(req, res, next);
});

/**
 * @api {get} /about-library/all 所有未删除的数据（后台）
 * @apiVersion 0.1.0
 * @apiName aboutLibraryAll
 * @apiGroup aboutLibrary
 *
 * @apiParam {String} [page=1] 第几页
 * @apiParam {String} [page_size=10] 每页显示多少
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "items": [ //时间分段的借阅量
 *           {
 *               "count": 3982,
 *               "time_type": "day",
 *               "time_value": 20190508
 *           },
 *           {
 *               "count": 9341,
 *               "time_type": "day",
 *               "time_value": 20190513
 *           }
 *       ],
 *       "total": {
 *           "total": 28648 //总借阅量
 *       }
 *   },
 *   "code": 200
 *}
 *
 */
router.get('/all', function(req, res, next) {
    aboutLibraryDao.all(req, res, next);
});

/**
 * @api {post} /about-library/post-resource 本馆风采---上传展示资源
 * @apiVersion 0.1.0
 * @apiName postResource
 * @apiGroup aboutLibrary
 *
 * @apiParam {String} resource_type 资源类型(picture-图片,video-视频,live-url-直播链接)
 * @apiParam {File} [resource] 资源--\<input type="file" name="resource" \/\>(和资源URL二选一)
 * @apiParam {String} [resource_url] 资源url(和资源二选一)
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "上传成功",
 *       "code": "200"
 *     }
 *
 */
router.post(
    '/post-resource',
    middleware.isLogin,
    middleware.upload().single('resource'),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        aboutLibraryDao.postResource(req, res, next);
    }
);
/**
 * @api {post} /about-library/update-resource 本馆风采---编辑资源
 * @apiVersion 0.1.0
 * @apiName updateResource
 * @apiGroup aboutLibrary
 *
 * @apiParam {String} resource_id 资源id
 * @apiParam {File} [resource] 资源--\<input type="file" name="resource"\/\>(和资源URL二选一)
 * @apiParam {String} [resource_url] 资源url(和资源二选一)
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "编辑成功",
 *       "code": "200"
 *     }
 *
 */
router.post(
    '/update-resource',
    middleware.isLogin,
    middleware.checkPermission,//验证权限
    middleware.upload().single('resource'),
    function(req, res, next) {
        aboutLibraryDao.updateResource(req, res, next);
    }
);
/**
 * @api {post} /about-library/delete-resource 本馆风采---删除资源
 * @apiVersion 0.1.0
 * @apiName deleteResource
 * @apiGroup aboutLibrary
 *
 * @apiParam {String} resource_id 资源id
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
 */
router.post(
    '/delete-resource',
    middleware.isLogin,
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        aboutLibraryDao.deleteResource(req, res, next);
    }
);

/**
 * @api {post} /about-library/set-resource 本馆风采---设置资源是否显示
 * @apiVersion 0.1.0
 * @apiName setResource
 * @apiGroup aboutLibrary
 *
 * @apiParam {String} resource_id 资源id
 * @apiParam {String} enable 0不显示，1显示
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
 */
router.post(
    '/set-resource',
    middleware.isLogin,
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        aboutLibraryDao.setResource(req, res, next);
    }
);
module.exports = router;