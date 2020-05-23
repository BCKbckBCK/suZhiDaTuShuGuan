//图书借阅排行展示
var express = require('express');
var router = express.Router();
var borrowingListDao = require('../dao/borrowingListDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');
/**
 * @api {get} /borrowing-list 图书借阅排行榜
 * @apiVersion 0.1.0
 * @apiName borrowingList
 * @apiGroup borrowingList
 *
 * @apiParam {String} show_type 时间类型(hour,day,week-周,month-月,season,year-年,customize)
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *      "data": [
 *       {
 *           "book_name": "nodeJS从入门到精通",
 *           "book_borrow_count": 236 //借阅量
 *       },
 *       {
 *           "book_name": "PHP从入门到精通",
 *           "book_borrow_count": 5534
 *       }
 *   ],
 *   "code": 200
 *  }
 *
 */
router.get('/', function(req, res, next) {
    borrowingListDao.query(req, res, next);
});
/**
 * @api {post} /borrowing-list/set-show-count 图书借阅排行榜--显示数据设置
 * @apiVersion 0.1.0
 * @apiName borrowingListSetShowCount
 * @apiGroup borrowingList
 *
 * @apiParam {String} display_count 显示数量
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
    '/set-show-count',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        borrowingListDao.setShowCount(req, res, next);
    }
);

/**
 * @api {post} /borrowing-list/upload 图书借阅排行榜--上传图书借排行榜情况【后台】
 * @apiVersion 0.1.0
 * @apiName borrowingListUpload
 * @apiGroup borrowingList
 *
 * @apiParam {String} book_name 书名
 * @apiParam {String} book_id 书籍唯一识别号
 * @apiParam {String} time_value 时间值（如2019-07-26 08:36:12）
 * @apiParam {String} book_borrow_count 借阅量
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
    '/upload',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        borrowingListDao.upload(req, res, next);
    }
);
module.exports = router;