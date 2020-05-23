const moment = require('moment');
//var mysql = require('mysql');
//var $conf = require('../conf/db');
//var pool  = mysql.createPool($conf.mysql);
var mysqlAsyn = require('./mysqlAsyn');
module.exports={
    jsonSuccess:function (message=null) {
        return {
            data:message,
            code:200
        }
    },
    jsonFail:function (message=null) {
        return {
            data:message,
            code:400
        }
    },
    defaultTime:function () {
        const now = new Date();
        const nowTime = now.getTime() ;
        const day = now.getDay();
        const oneDayTime = 24*60*60*1000 ;
        const MondayTime = nowTime - (day-1)*oneDayTime ;//显示周一
        const SundayTime =  nowTime + (7-day)*oneDayTime ;//显示周日
        //console.log(new Date(MondayTime));
        //console.log(new Date(SundayTime))
        return {
            startTime:moment(new Date(MondayTime)).format("YYYY-MM-DD 00:00:00"),
            endTime:moment(new Date(SundayTime)).format("YYYY-MM-DD 23:59:59"),
        }
    },
    mondayToSunday:function () {
        const now = new Date();
        const nowTime = now.getTime() ;
        const day = now.getDay();
        const oneDayTime = 24*60*60*1000 ;
        const ret = [];
        for (let i=1;i<8;i++){
            //console.log(moment(new Date(nowTime - (day-i)*oneDayTime)).format("YYYY-MM-DD 00:00:00"));
            ret.push(moment(new Date(nowTime - (day-i)*oneDayTime)).format("YYYY-MM-DD 00:00:00"));
        }
        return ret;
    },
    startSomeHourAgo:function (someHourAgo) {
        let ret  = [];
        for (let i = someHourAgo;i>0;i--){
            ret.push(new Date(new Date().getTime() - (i-1) * 60 * 60 * 1000));
        }
        return ret;
    },
    randomNum:function(minNum,maxNum){
        switch(arguments.length){
            case 1:
                return parseInt(Math.random()*minNum+1,10);
                break;
            case 2:
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                break;
            default:
                return 0;
        }
    },
    addSystemLog:function (connection,addData) {
        let sql = 'insert into system_log(`session`,`action_url`,`parameter`,`error_infomation`,`created_at`,`ip`)values' +
            ' (?,?,?,?,?,?)';
        connection.query(sql,addData,function (err,result) {
            if(err)throw err;
        });
    },
    addOperationLog:function (connection,addData) {
        let sql = 'insert into operation_log(`action_url`,`parameter`,`created_at`,`session`)values' +
            ' (?,?,?,?)';
        connection.query(sql,addData,function (err,result) {
            if(err)throw err;
        });
    },
    time:function () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    insertOperationLog:function (connection,req) {
        let operateData = [
            req.originalUrl,
            JSON.stringify(req.body || req.query || req.params),
            this.time(),
            JSON.stringify(req.session),
        ];
        setTimeout(this.addOperationLog,5000,connection,operateData);
    },
    insertSystemLog:function (connection,req,err) {
        let errData = [
            JSON.stringify(req.session),
            req.originalUrl,
            JSON.stringify(req.body || req.query || req.params),
            JSON.stringify(err),
            this.time(),
            req.id,
        ];
        setTimeout(this.addSystemLog,5000,connection,errData);
    },
    getDuration:function(type,start,stop){
        var $array = new Array();
        var current = new Date(start);
        stop  = new Date(stop);
        while (current <= stop) {
            $array.push( new Date (current) );
            if(type == undefined){//默认天
                current.setDate(current.getDate() + 1);
            }else if(type == 'hour'){//小时
                current.setHours(current.getHours() + 1);
            }else if(type == 'day'){//天
                current.setDate(current.getDate() + 1);
            }else if(type == 'week'){//周
                current.setDate(current.getDate() + 7);
            }else if(type == 'month'){//月
                current.setMonth(current.getMonth() + 1);
            }else{//默认天
                current.setDate(current.getDate() + 1);
            }
        }
        return $array;
    },
    insertActionLog:function (req) {
        let actionData = [
            JSON.stringify(req.session),
            req.originalUrl,
            JSON.stringify(req.body || req.query || req.params),
            '',
            this.time(),
            req.ip?req.ip:'空'
        ];
        let sql = 'insert into system_log(`session`,`action_url`,`parameter`,`error_infomation`,`created_at`,`ip`)values' +
            ' (?,?,?,?,?,?)';
        mysqlAsyn(sql,actionData);
    }
};