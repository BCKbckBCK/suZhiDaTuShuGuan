//日志
var express = require('express');
var router = express.Router();
var logDao = require('../dao/logDao');

//var middleware = require('../dao/middleware');
/**
 * @api {get} /log/system 系统访问日志
 * @apiVersion 0.1.0
 * @apiName logSystem
 * @apiGroup log
 *
 * @apiParam {String} page 开始页
 * @apiParam {String} page_size 每页数据
 *
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "totalCount": 49422,
 *       "list": [
 *           {
 *               "ip": "192.168.0.1",
 *               "url": "http://localhost:3000/a.html",
 *               "content": "这是备注",
 *               "created_time": "2018-11-11 11:11:11"
 *           }
 *       ]
 *   },
 *   "code": 200
 *}
 *
 */
router.get('/system', function(req, res, next) {
    logDao.systemLog(req, res, next);
});
/**
 * @api {get} /log/operation 操作日志
 * @apiVersion 0.1.0
 * @apiName logOperation
 * @apiGroup log
 *
 * @apiParam {String} page 开始页
 * @apiParam {String} page_size 每页数据
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "totalCount": 284,
 *       "list": [
 *           {
 *               "operator_user": "郭老师",
 *               "ip": "192.168.0.1",
 *               "content": "郭老师上传了一张自己的自拍照",
 *               "created_time": "2018-11-11 11:11:11"
 *           }
 *       ]
 *   },
 *   "code": 200
 *}
 *
 */
router.get(
    '/operation',
    function(req, res, next) {
        logDao.operationLog(req, res, next);
    }
);
module.exports = router;