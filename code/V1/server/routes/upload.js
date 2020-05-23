//本馆风采展示
var express = require('express');
var router = express.Router();
var uploadDao = require('../dao/uploadDao');
var middleware = require('../dao/middleware');
var multer  = require('multer');
var upload = multer();

/**
 * @api {post} /upload/post-resource 上传资源
 * @apiVersion 0.1.0
 * @apiName uploadPostResource
 * @apiGroup upload
 *
 * @apiParam {File} file 资源名称
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "data": "http://localhost:3000/images/uploads/1575593733785szd-p3.jpg",
 *       "code": "200"
 *     }
 *
 */
router.post(
    '/post-resource',
    //middleware.isLogin,
    //middleware.checkPermission,//验证权限
    middleware.upload().single('file'),
    function(req, res, next) {
        uploadDao.postResource(req, res, next);
    }
);

module.exports = router;