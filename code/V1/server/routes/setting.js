//日志
var express = require('express');
var router = express.Router();
var settingDao = require('../dao/settingDao');

/**
 * @api {get} /setting/all 系统设置信息
 * @apiVersion 0.1.0
 * @apiName settingAll
 * @apiGroup setting
 *
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "borrowing_list": {
 *           "nameZh": "借阅排行展示时间类型",
 *           "value": {
 *               "displayCount": "5"//展示的数量
 *           }
 *       },
 *       "library_opening_hours": {
 *           "nameZh": "图书馆开放时间",
 *           "value": {
 *               "openTime": "2019-12-19 07:52:40",//设置的开馆时间
 *               "closeTime": "2019-12-19 22:52:45"//设置的闭馆时间
 *           }
 *       },
 *       "reader_star": {
 *           "nameZh": "阅读之星配置",
 *           "value": {
 *               "timeValue": "2019-06-05 00:00:00@",//开始时间和结束时间，没有结束时间就表示查询到当前时间
 *               "displayCount": "7"//显示条数
 *           }
 *       },
 *       "borrowing_count": {
 *           "nameZh": "借阅量统计",
 *           "value": {
 *               "timeType": "week",//展示类型
 *               "timeValue": "201945@",
 *               "realStartTime": "2019-11-05 00:00:00",//开始时间
 *               "realEndTime": ""//结束时间，没有结束时间就表示查询到现在
 *           }
 *       }
 *   },
 *   "code": 200
 *}
 *
 */
router.get('/all', function(req, res, next) {
    settingDao.all(req, res, next);
});

module.exports = router;