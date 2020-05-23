//阅读之星
var express = require('express');
var router = express.Router();
var readerStarDao = require('../dao/readerStarDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');
/**
 * @api {get} /reader-star 阅读之星--列表页展示
 * @apiVersion 0.1.0
 * @apiName readerStar
 * @apiGroup readerStar
 *
 * @apiParam {String} show_type 显示类型（read_count-按阅读数量,read_duration-按阅读时长）
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": [
 *       {
 *           "id": 1,
 *           "reader_name": "李小萌",
 *           "reader_uuid": "123",
 *           "read_duration": 5,
 *           "read_count": 12
 *       },
 *       {
 *           "id": 2,
 *           "reader_name": "王超",
 *           "reader_uuid": "263",
 *           "read_duration": 6,
 *           "read_count": 26
 *       }
 *   ],
 *   "code": 200
 *}
 *
 */
router.get('/', function(req, res, next) {
    readerStarDao.query(req, res, next);
});

/**
 * @api {get} /reader-star/borrower-count 阅读之星--读者借阅量展示（前台）
 * @apiVersion 0.1.0
 * @apiName readerStarBorrowerCount
 * @apiGroup readerStar
 *

 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": [
 *       {
 *           "borrower_number": 1552,//借阅数量
 *           "borrow_name": "张三" //借阅人
 *       },
 *       {
 *           "borrower_number": 254,
 *           "borrow_name": "张六"
 *       },
 *       {
 *           "borrower_number": 225,
 *           "borrow_name": "李四"
 *       },
 *       {
 *           "borrower_number": 24,
 *           "borrow_name": "郭莹"
 *       },
 *       {
 *           "borrower_number": 21,
 *           "borrow_name": "王五"
 *       }
 *   ],
 *   "code": 200
 *}
 *
 */
router.get('/borrower-count', function(req, res, next) {
    readerStarDao.borrowerCount(req, res, next);
});


/**
 * @api {post} /reader-star/set-show-type 阅读之星--设置显示类型
 * @apiVersion 0.1.0
 * @apiName readerStarSetShowType
 * @apiGroup readerStar
 *
 * @apiParam {String} time_value 时间区间值（如2019-07-26 08:36:12@2019-08-03 15:50:56）
 * @apiParam {String} [display_count=20] 显示数量
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "设置成功",
 *   "code": 200
 *}
 *
 */
router.post('/set-show-type',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        readerStarDao.setType(req, res, next);
    }
);
module.exports = router;