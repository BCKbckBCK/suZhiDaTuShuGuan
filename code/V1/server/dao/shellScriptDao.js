// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./librarySqlMapping');
var fn = require('./fn');
var moment = require('moment');
const request = require('request');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
module.exports = {
    updateBorrowingCount: function (req, res, next) {
        let useTime = moment().subtract(1,'hour');
        let bTime = useTime.format("YYYY-MM-DD HH:mm:ss");
        let hourTime = useTime.format("YYYYMMDDHH");
        let dayTime = useTime.format("YYYYMMDD");
        let weekTime = useTime.format("YYYYww");
        let monthTime = useTime.format("YYYYMM");
        let seasonTime = useTime.format("YYYYQ");
        let yearTime = useTime.format("YYYY");

        let startTime = useTime.format("YYYY-MM-DDHH:00:00");
        let endTime = useTime.format("YYYY-MM-DDHH:59:59");

        pool.getConnection(function(err, connection) {
            let sql = 'select count(1) amount from `VLEND_ALL` where LEND_DATE between ? and ?';
            connection.query(sql,[startTime,endTime], function(err, borrowingCountResult) {
                sql = 'select id from borrowing_count where `hour`=?';
                connection.query(sql,hourTime, function(err, hasRecordResult) {
                    let sqlParam = '';
                    if(hasRecordResult.length>0){//有就更新
                        sql = 'update borrowing_count set borrow_count=?,updated_at=? where id=?';
                        sqlParam = [
                            borrowingCountResult[0].amount,
                            moment().format("YYYY-MM-DD HH:mm:ss"),
                            hasRecordResult[0].id
                        ];
                    }else{//没有就插入
                        sql = 'insert into borrowing_count(`borrow_count`,`hour`,`day`,`week`,`month`,`season`,`year`,`btime`,`created_at`,`updated_at`) values' +
                            ' (?,?,?,?,?,?,?,?,?,?)';
                        sqlParam = [
                            borrowingCountResult[0].amount,
                            hourTime,
                            dayTime,
                            weekTime,
                            monthTime,
                            seasonTime,
                            yearTime,
                            bTime,
                            moment().format("YYYY-MM-DD HH:mm:ss"),
                            moment().format("YYYY-MM-DD HH:mm:ss"),
                        ];
                    }
                    connection.query(sql,sqlParam, function(err, result) {
                        if(err) throw err;
                        res.json(fn.jsonSuccess('更新图书馆借阅总量成功'));
                        //connection.release();
                        //connection.end();
                        //process.exit(0);
                        //throw '正常退出';
                        //connection.end();
                    });
                    //connection.end();
                });
                connection.release();
                //pool.end();
            });
        });
    },
    updateBorrowingList:function (req, res, next) {
        let useTime = moment().subtract(1,'hour');
        let hourTime = useTime.format("YYYYMMDDHH");

        let startTime = useTime.format("YYYY-MM-DDHH:00:00");
        let endTime = useTime.format("YYYY-MM-DDHH:59:59");

        let sql = 'select count(1) borrowingCount,trim(any_value(M_ISBN)) book_isbn,TRIM(M_TITLE) book_name from VLEND_ALL  where ' +
            '`LEND_DATE` between ? and ? ' +
            'GROUP by M_TITLE ';
            //'ORDER by borrowingCount desc limit 5';
        pool.getConnection(function(err, connection) {
            connection.query(sql,[startTime,endTime], function(err, borrowingListResult) {
                borrowingListResult.forEach(function (borrowingListItem) {
                    sql = 'select id from borrowing_list where `hour`=? and book_id=?';
                    connection.query(sql,[hourTime,borrowingListItem.book_name+borrowingListItem.book_isbn], function(err, hasRecordResult) {
                        let sqlParam = '';
                        if(hasRecordResult.length>0){//有就更新
                            sql = 'update borrowing_list set book_borrow_count=?,updated_at=? where id=?';
                            sqlParam = [
                                borrowingListItem.borrowingCount,
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                hasRecordResult[0].id
                            ];
                        }else{//没有就插入
                            sql = 'insert into borrowing_list(`book_name`,`book_borrow_count`,`hour`,`book_id`,`created_at`,`updated_at`) values' +
                                ' (?,?,?,?,?,?)';
                            sqlParam = [
                                borrowingListItem.book_name,
                                borrowingListItem.borrowingCount,
                                hourTime,
                                borrowingListItem.book_name+borrowingListItem.book_isbn,
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                            ];
                        }
                        connection.query(sql,sqlParam, function(err, result) {
                            if(err) throw err;
                        });
                        // connection.end();
                    });
                });
                res.json(fn.jsonSuccess('更新图书借阅排行成功'));
                connection.release();
            });
        });
    },
    updateBorrowerCount:function (req, res, next) {
        let useTime = moment().subtract(1,'hour');
        let hourTime = useTime.format("YYYYMMDDHH");

        let startTime = useTime.format("YYYY-MM-DDHH:00:00");
        let endTime = useTime.format("YYYY-MM-DDHH:59:59");

        let sql = 'select count(*) borrower_count,aa.user_card_id,aa.lend_name from (' +
                'select count(*) borrowingCount,trim(any_value(va.CERT_ID_F)) user_card_id,TRIM(any_value(va.NAME)) lend_name ' +
                ' from library.VLEND_ALL va ' +
                ' where va.`LEND_DATE` between ? and ? ' +
                ' GROUP by va.CERT_ID_F,va.M_ISBN ' +
            ') aa GROUP by aa.user_card_id';
        //'ORDER by borrowingCount desc limit 5';
        pool.getConnection(function(err, connection) {
            connection.query(sql,[startTime,endTime], function(err, borrowingListResult) {
                borrowingListResult.forEach(function (borrowerCountItem) {
                    sql = 'select id from borrower_star where `hour`=? and borrow_uuid=?';
                    connection.query(sql,[hourTime,borrowerCountItem.user_card_id], function(err, hasRecordResult) {
                        let sqlParam = '';
                        if(hasRecordResult.length>0){//有就更新
                            sql = 'update borrower_star set read_count=?,updated_at=? where id=?';
                            sqlParam = [
                                borrowerCountItem.borrower_count,
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                hasRecordResult[0].id
                            ];
                        }else{//没有就插入
                            sql = 'insert into borrower_star(`borrow_name`,`borrow_uuid`,`hour`,`read_count`,`created_at`,`updated_at`) values' +
                                ' (?,?,?,?,?,?)';
                            sqlParam = [
                                borrowerCountItem.lend_name,
                                borrowerCountItem.user_card_id,
                                hourTime,
                                borrowerCountItem.borrower_count,
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                            ];
                        }
                        connection.query(sql,sqlParam, function(err, result) {
                            if(err) throw err;
                        });
                        // connection.end();
                    });
                });
                res.json(fn.jsonSuccess('更新读者借阅书籍数量成功'));
                connection.release();
            });
        });
    },
    updateLibraryPeopleCount:function (req, res, next) {
        let useTime = moment().subtract(1,'hour');
        let bTime = useTime.format("YYYY-MM-DD HH:mm:ss");
        let hourTime = useTime.format("YYYYMMDDHH");

        let startTime = useTime.format("YYYY-MM-DD HH:00:00");
        let endTime = useTime.format("YYYY-MM-DD HH:59:59");


        pool.getConnection(function(err, connection) {
            let sql = 'select COUNT(distinct cStuID) amount from passRecord where dDate BETWEEN ? AND ?';
            //console.log(startTime);return;
            connection.query(sql,[startTime,endTime], function(err, libraryPeopleCountResult) {
                sql = 'select id from library_people_count where `hour`=?';
                let sqlParameter = '';
                connection.query(sql,hourTime,function (err,hasRecordResult) {
                    if(hasRecordResult.length>0){
                        sql = "update library_people_count set `count`=? where id=?";
                        sqlParameter = [
                            libraryPeopleCountResult[0].amount,
                            hasRecordResult[0].id
                        ];
                    }else{
                        sql = "insert into library_people_count(`hour`,`count`,`created_at`,`btime`)" +
                            "values(?,?,?,?)";
                        sqlParameter = [
                            hourTime,
                            libraryPeopleCountResult[0].amount,
                            moment().format("YYYY-MM-DD HH:mm:ss"),
                            bTime,
                        ];
                    }
                    //console.log(libraryPeopleCountResult);return;
                    connection.query(sql,sqlParameter,function (err,executeResult) {
                        if(err) throw err;
                        res.json(fn.jsonSuccess('更新图书到馆人数成功'));
                    });
                });
                connection.release();
            });
        });
    },
    updateNotice: function (req, response, next) {
        request.post('http://jssvclib.letoochina.cn/activity/current', {
            json: {
                //todo: 'Buy the milk'
            }
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            if(!body.data){
                return;
            }
            //console.log(`statusCode: ${res.statusCode}`)
            //console.log(body.message);
            let sql = '';
            pool.getConnection(function(err, connection) {
                body.data.forEach(function (item) {
                    sql = "select count(*) from notice where title=?";
                    connection.query(sql,item.title,function (err,hasRecord) {
                        if(hasRecord.length<=0){
                            sql = "insert into notice(`title`,`content`,`created_at`)";
                            connection.query(sql,[item.title,item.content,moment().format("YYYY-MM-DD HH:mm:ss"),function (err,executeResult) {
                                if(err) throw err;
                            }]);
                        }
                    });
                });
                response.json(fn.jsonSuccess('更新公告成功'));
                connection.release();
            });
        })
    },
    updateNewBookRecommend: function (req, response, next) {
        request.post('http://lib.jssvc.edu.cn/do/screen.php?pages=1&nums=5', {
            json: {
                //todo: 'Buy the milk'
            }
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }

            // if(!body.data){
            //     return;
            // }
            //console.log(`statusCode: ${res.statusCode}`)
            //console.log(body.message);
            let insertData = [];
            pool.getConnection(function(err, connection) {
                if(!body.data || !(body.data instanceof Array)){
                    return;
                }
                body.data.forEach(function (item) {
                    connection.query($sql.todayRecommend.selectExists,['bh-new-book-'+item.aid], function(err, result) {
                        if(err) throw err;
                        if(result[0].num>0){
                            //res.json(fn.jsonSuccess('已存在该书籍ID'));
                        }else{
                            insertData = [
                                item.title,
                                item.picurl,//书籍封面
                                '',//二维码图片
                                item.hits,//自定义下载量
                                item.hits,//真实下载量
                                item.publish?item.publish.replace(/<[^>]+>/g,"").trim():'',//出版时间
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                'bh-new-book-'+item.aid,
                                2
                            ];
                            connection.query($sql.todayRecommend.insert,insertData, function(err, result) {
                                if(err) throw err;
                                //res.json(fn.jsonSuccess('上传成功'));
                            });
                        }
                    });
                });
                response.json(fn.jsonSuccess('更新新书推荐成功'));
                connection.release();
            });
        })
    },
};