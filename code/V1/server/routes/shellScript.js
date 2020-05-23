//借阅量数据展示
var express = require('express');
var router = express.Router();
var shellScriptDao = require('../dao/shellScriptDao');
var multer  = require('multer');
var upload = multer();
var middleware = require('../dao/middleware');

router.get('/', function(req, res, next) {
    res.json('这是什么');
});

//更新图书馆借阅排行榜
router.get(
    '/update-borrowing-list',
    function(req, res, next) {
        shellScriptDao.updateBorrowingList(req, res, next);
    }
);
//更新图书馆总借阅量
router.get(
    '/update-borrowing-count',
    function(req, res, next) {
        shellScriptDao.updateBorrowingCount(req, res, next);
    }
);
//更新读者借阅的书的数量
router.get(
    '/update-borrower-count',
    function(req, res, next) {
        shellScriptDao.updateBorrowerCount(req, res, next);
    }
);
//更新图书馆到馆人数
router.get(
    '/update-library-people-count',
    function(req, res, next) {
        shellScriptDao.updateLibraryPeopleCount(req, res, next);
    }
);
//更新公告
router.get(
    '/update-notice',
    function(req, res, next) {
        shellScriptDao.updateNotice(req, res, next);
    }
);

//更新新书籍推荐
router.get(
    '/update-new-book-recommend',
    function(req, res, next) {
        shellScriptDao.updateNewBookRecommend(req, res, next);
    }
);
// router.post(
//     '/upload',upload.array(),
//     middleware.checkPermission,//验证权限
//     function(req, res, next) {
//         borrowingCountDao.upload(req, res, next);
//     }
// );

module.exports = router;