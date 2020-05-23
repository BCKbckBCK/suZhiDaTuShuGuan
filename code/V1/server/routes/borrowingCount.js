//借阅量数据展示
var express = require('express');
var router = express.Router();
var borrowingCountDao = require('../dao/borrowingCountDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');

/**
 * @api {get} /borrowing-count 本（日/星期/月/季/年）借阅量统计
 * @apiVersion 0.1.0
 * @apiName borrowingCount
 * @apiGroup borrowingCount
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
    borrowingCountDao.query(req, res, next);
});
/**
 * @api {post} /borrowing-count/set-type 图书借阅量统计--展示类型选择
 * @apiVersion 0.1.0
 * @apiName borrowingCountSetType
 * @apiGroup borrowingCount
 *
 * @apiParam {String} time_type 时间类型(hour,day,week,month,year,customize-自定义)
 * @apiParam {String} time_value 时间区间值（如2019-07-26 08:36:12@2019-08-03 15:50:56）
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
    '/set-type',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        borrowingCountDao.setType(req, res, next);
    }
);

/**
 * @api {post} /borrowing-count/upload 图书借阅量统计--上传（后台）
 * @apiVersion 0.1.0
 * @apiName borrowingCountUpload
 * @apiGroup borrowingCount
 *
 * @apiParam {String} time_value 时间值（如2019-07-26 08:36:12）
 * @apiParam {String} borrow_count 借阅量
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
 */
router.post(
    '/upload',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        borrowingCountDao.upload(req, res, next);
    }
);

module.exports = router;