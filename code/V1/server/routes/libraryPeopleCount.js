//到馆人数统计
var express = require('express');
var router = express.Router();
var libraryPeopleCountDao = require('../dao/libraryPeopleCountDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');
/**
 * @api {get} /library-people-count 到馆人数统计
 * @apiVersion 0.1.0
 * @apiName libraryPeopleCount
 * @apiGroup libraryPeopleCount
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
 *       "hoursCount": [ //每小时数据
 *           {
 *               "time": "2019-08-07 05:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 06:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 07:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 08:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 09:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 10:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 11:41:32",
 *               "count": 0
 *           },
 *           {
 *               "time": "2019-08-07 12:41:32",
 *              "count": 0
 *           }
 *       ],
 *       "weekCount": 7247,//每周数据
 *       "peopleInLibrary": "23",//在馆人数
 *       "totalCount": 7247//总人数
 *   },
 *   "code": 200
 *}
 *
 */
router.get('/', function(req, res, next) {
    libraryPeopleCountDao.query(req, res, next);
});
/**
 * @api {post} /library-people-count/set-closed-time 开闭馆时间设置
 * @apiVersion 0.1.0
 * @apiName setClosedTime
 * @apiGroup libraryPeopleCount
 *
 * @apiParam {String} open_time 开馆时间(格式：0831表示8点31分，一共4位)
 * @apiParam {String} close_time 闭馆时间(格式：2203表示晚上10点03分，一共4位)
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
    '/set-closed-time',upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        libraryPeopleCountDao.setClosedTime(req, res, next);
    }
);
module.exports = router;