//今日推荐
var express = require('express');
var router = express.Router();
var todayRecommendDao = require('../dao/todayRecommendDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');
/**
 * @api {get} /today-recommend 今日推荐--前台展示
 * @apiVersion 0.1.0
 * @apiName todayRecommend
 * @apiGroup todayRecommend
 *
 * @apiDescription 不需要传参数，后台设置显示方式
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
    todayRecommendDao.show(req, res, next);
});

/**
 * @api {get} /today-recommend/all 今日推荐---所有数据
 * @apiVersion 0.1.0
 * @apiName todayRecommendAll
 * @apiGroup todayRecommend
 *
 * @apiParam {String} type 推荐类型
 * @apiParam {String} page 第几页
 * @apiParam {String} page_size 每页显示多少条
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": {
 *       "totalCount": 2,
 *       "list": [
 *           {
 *               "id": 1,
 *               "book_name": "穿过你的头发的我的手",
 *               "book_cover_url": "http://www.baidu.com/asdf.jpg",
 *               "book_qrcode_url": "http://www.baidul.com/faewe.png",
 *               "customize_download_count": 26,
 *               "real_download_count": 63,
 *               "sort": 1,
 *               "is_show": 1,
 *               "time_to_market": "2019-07-12T03:07:34.000Z",
 *               "created_at": "2019-08-09T01:57:15.000Z",
 *               "recommend_type": "2"
 *           },
 *           {
 *               "id": 2,
 *               "book_name": "JAVA从入门到精通",
 *               "book_cover_url": "http://www.adf.cn/fad.jpg",
 *               "book_qrcode_url": "http://www.fasdfa.com/asdfwe.jpg",
 *               "customize_download_count": 26,
 *               "real_download_count": 25,
 *               "sort": null,
 *               "is_show": 1,
 *               "time_to_market": "2019-07-12T03:08:36.000Z",
 *               "created_at": "2019-08-09T01:57:18.000Z",
 *               "recommend_type": "1"
 *           }
 *       ]
 *   },
 *   "code": 200
 *}
 *
 */
router.get('/all', function(req, res, next) {
    todayRecommendDao.selectAll(req, res, next);
});

/**
 * @api {get} /today-recommend/types 今日推荐---推荐类型列表
 * @apiVersion 0.1.0
 * @apiName todayRecommendType
 * @apiGroup todayRecommend
 *

 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *  "data": [
 *       {
 *           "id": 2,
 *           "name": "新书推荐"
 *       },
 *       {
 *           "id": 3,
 *           "name": "电子书"
 *       }
 *   ],
 *   "code": 200
 *}
 *
 */
router.get('/types', function(req, res, next) {
    todayRecommendDao.types(req, res, next);
});

/**
 * @api {post} /today-recommend/add 今日推荐--设置前台为显示
 * @apiVersion 0.1.0
 * @apiName todayRecommendAdd
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book_id 书籍id
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "添加成功",
 *   "code": 200
 *}
 *
 */
router.post(
    '/add',
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        todayRecommendDao.add(req, res, next);
    }
);

/**
 * @api {post} /today-recommend/delete 今日推荐--设置前台不显示
 * @apiVersion 0.1.0
 * @apiName todayRecommendDelete
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book_id 书籍id
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
router.post(
    '/delete',
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        todayRecommendDao.delete(req, res, next);
    }
);


/**
 * @api {post} /today-recommend/sort 今日推荐--排序调整
 * @apiVersion 0.1.0
 * @apiName todayRecommendSort
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book1_id 书籍1id（和书籍2交换排序）
 * @apiParam {String} book2_id 书籍2id（和书籍1交换排序）
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "删除成功",
 *   "code": 200
 *}
 *
 */
router.post(
    '/sort',
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        todayRecommendDao.sort(req, res, next);
    }
);

/**
 * @api {post} /today-recommend/update-download-count 今日推荐--调整下载量显示
 * @apiVersion 0.1.0
 * @apiName updateDownloadCount
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book_id 书籍id
 * @apiParam {String} download_count 要设置的下载量
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "修改成功",
 *   "code": 200
 *}
 *
 */
router.post(
    '/update-download-count',
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        todayRecommendDao.updateDownloadCount(req, res, next);
    }
);


/**
 * @api {post} /today-recommend/upload 今日推荐--上传(添加)图书信息
 * @apiVersion 0.1.0
 * @apiName todayRecommendUpload
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book_id 书籍id
 * @apiParam {String} book_name 书籍名称
 * @apiParam {File} [book_cover] 书籍封面图
 * @apiParam {String} [book_cover_url] 书籍封面图地址
 * @apiParam {File} [book_qrcode] 书籍二唯码图
 * @apiParam {String} [book_qrcode_url] 书籍二唯码图
 * @apiParam {String} [customize_download_count] 自定义下载量
 * @apiParam {String} [real_download_count] 真实下载量
 * @apiParam {String} [time_to_market] 上市时间
 * @apiParam {String} book_type 书籍类型（1热门图书2新书推荐3电子图书）
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "上传成功",
 *   "code": 200
 *}
 *
 */
let multipleFields = middleware.upload().fields([
    {name:'book_cover'},
    {name:'book_qrcode'},
]);
router.post(
    '/upload',
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        //multipleFields(req,res,(err) => {
                todayRecommendDao.upload(req, res, next);
           // }
        //);
    },
);

/**
 * @api {post} /today-recommend/update 今日推荐--修改图书信息（后台）
 * @apiVersion 0.1.0
 * @apiName todayRecommendUpdate
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book_id 书籍id（后台返回的ID）
 * @apiParam {String} book_name 书籍名称
 * @apiParam {File} [book_cover] 书籍封面图
 * @apiParam {String} [book_cover_url] 书籍封面图地址
 * @apiParam {File} [book_qrcode] 书籍二唯码图
 * @apiParam {String} [book_qrcode_url] 书籍二唯码图
 * @apiParam {String} [customize_download_count] 自定义下载量
 * @apiParam {String} [real_download_count] 真实下载量
 * @apiParam {String} [time_to_market] 上市时间
 * @apiParam {String} book_type 书籍类型（1热门图书2新书推荐3电子图书）
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "上传成功",
 *   "code": 200
 *}
 *
 */
/*let multipleFields = middleware.upload().fields([
    {name:'book_cover'},
    {name:'book_qrcode'},
]);*/
router.post(
    '/update',
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        //multipleFields(req,res,(err) => {
        todayRecommendDao.update(req, res, next);
        // }
        //);
    },
);

/**
 * @api {post} /today-recommend/force-delete 今日推荐--删除书籍
 * @apiVersion 0.1.0
 * @apiName todayRecommendForceDelete
 * @apiGroup todayRecommend
 *
 * @apiParam {String} book_id 书籍id(后台传过来的id)
 *
 * @apiSuccess {String} data  返回信息.
 * @apiSuccess {Number} code   返回码.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "data": "删除成功",
 *   "code": 200
 *}
 *
 */
router.post(
    '/force-delete',
    upload.array(),
    middleware.checkPermission,//验证权限
    function(req, res, next) {
        todayRecommendDao.forceDelete(req, res, next);
    }
);
module.exports = router;