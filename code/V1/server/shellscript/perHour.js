/*
const mysql = require('mysql');
const $conf = require('../conf/db');
const fn = require('../dao/fn');
const moment = require('moment');

// 使用连接池，提升性能
const pool  = mysql.createPool($conf.mysql);


function executeBorrowingCountSql(timeObject) {
    let useTime = moment(timeObject).subtract(1,'hour');
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
                        fn.jsonSuccess('上传图书馆借阅排行榜成功');
                        //connection.release();
                        //connection.end();
                        //process.exit(0);
                        throw '正常退出';
                    }
                );
                //connection.end();
            });
            connection.release();
            pool.end();
        });
    });
}

function executeBorrowingListSql(timeObject) {
    let useTime = moment(timeObject).subtract(1,'hour');
    //let bTime = useTime.format("YYYY-MM-DD HH:mm:ss");
    let hourTime = useTime.format("YYYYMMDDHH");

    let startTime = useTime.format("YYYY-MM-DDHH:00:00");
    let endTime = useTime.format("YYYY-MM-DDHH:59:59");

    pool.getConnection(function(err, connection) {
        let sql = 'select count(1) borrowingCount,trim(M_ISBN) book_isbn,TRIM(M_TITLE) book_name from library.VLEND_ALL  where ' +
            '`LEND_DATE` between ? and ? ' +
            'GROUP by M_TITLE ' +
            'ORDER by borrowingCount desc limit 5';
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
                            fn.jsonSuccess('上传图书馆借阅排行榜成功');
                            //connection.release();
                            //connection.end();
                            //process.exit(0);
                            //throw '正常退出';
                        }
                    );
                    //connection.end();
                });
            });
            //connection.release();
        });
    });
}

function pppppppp(){
    //process.exit(0);
    //throw '正常退出';
    executeBorrowingListSql(new Date('2013-12-13 15:30:00'));
    executeBorrowingCountSql(new Date('2013-12-13 15:30:00'));

}

executeBorrowingListSql(new Date('2013-12-13 15:30:00'));
//executeBorrowingCountSql(new Date('2013-12-13 15:30:00'));
*/






