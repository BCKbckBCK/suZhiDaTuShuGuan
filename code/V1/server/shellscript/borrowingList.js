const moment = require('moment');
//每次都创建一个连接,执行完就断开连接
var mysql_connection = require('./mysql_connection');
let getBorrowingCount = async function(timeObject){
    let sql = 'select count(1) amount from `VLEND_ALL` where LEND_DATE between ? and ?';
    let useTime = moment(timeObject).subtract(1,'hour');
    let startTime = useTime.format("YYYY-MM-DDHH:00:00");
    let endTime = useTime.format("YYYY-MM-DDHH:59:59");

    return await mysql_connection.query(sql,[startTime,endTime]);

};


let checkHasRecord = async function (timeObject) {
    //先查有无
    let sql = 'select id from borrowing_count where `hour`=?';
    return await mysql_connection.query(sql,moment(timeObject).subtract(1,'hour').format("YYYYMMDDHH"));//


};

function executeBorrowingCountSql(timeObject) {
    let useTime = moment(timeObject).subtract(1,'hour');
    let bTime = useTime.format("YYYY-MM-DD HH:mm:ss");
    let hourTime = useTime.format("YYYYMMDDHH");
    let dayTime = useTime.format("YYYYMMDD");
    let weekTime = useTime.format("YYYYww");
    let monthTime = useTime.format("YYYYMM");
    let seasonTime = useTime.format("YYYYQ");
    let yearTime = useTime.format("YYYY");
    
    let borrowingCountResult = getBorrowingCount(timeObject);
    borrowingCountResult.then(function (value) {

        if(value.status){//正常
            let sql = 'select id from borrowing_count where `hour`=?';
            let hasRecordResult = mysql_connection.query(sql,moment(timeObject).subtract(1,'hour').format("YYYYMMDDHH"));//
            console.log(value);
            //let hasRecordResult = checkHasRecord(timeObject);
            /*hasRecordResult.then(function (recordValue) {
                console.log(recordValue);
                if(recordValue.status && recordValue.data.length>0){//有就更新
                    let sql = 'update borrowing_count set borrow_count=?,updated_at=? where id=?';
                    mysql_connection.query(sql,recordValue.data.shift().id);//
                }else{//没有就插入
                    sql = 'insert into borrowing_count(`borrow_count`,`hour`,`day`,`week`,`month`,`season`,`year`,`btime`,`created_at`,`updated_at`) values' +
                        ' (?,?,?,?,?,?,?,?,?,?)';
                    let parameter = [
                        value.amount,
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
                    mysql_connection.query(sql,parameter);
                }
            },function (recordError) {

            });*/
        }else{//错误

        }
    },function (error) {
        
    });

}

//executeBorrowingCountSql(new Date('2013-12-13 15:30:00'));
var getInfo2 = async function(){
    var sql = 'select count(1) amount from `vlend_all` where LEND_DATE between ? and ?';
    let startTime = moment().subtract(1,'hour').format("YYYY-MM-DDHH:00:00");
    let endTime = moment().subtract(1,'hour').format("YYYY-MM-DDHH:59:59");
    var result = await mysql_connection.query(sql,[startTime,endTime]);
    console.log(result);
};
//当connection.end来关闭连接时,可以多次调用异步方法来进行多次数据库操作
//原因: 因为异步运行中,connection在完成数据库操作一次后,用connection.end来关闭连接时,不会关闭连接,而是返回错误


//这种方式不能进行多次查询 只能查询一次
//原因: 因为同步运行中,connection在完成数据库操作一次后就断开连接了
//var run1 = async function(){
//    await getInfo1();
//    await getInfo1();
//    await getInfo1();
//}
//
//run1();
var t = moment('2019-11-11 11:11:11').format();
let t2 = '2019-11-1111:11:10';
t = moment('2019-11-1111:11:11','YYYY-MM-DDHH:mm:ss').format("YYYY-MM-DDHH:mm:ss");
t = moment().subtract(1,'hour').format("YYYY-MM-DDHH:00:00");
console.log(t);