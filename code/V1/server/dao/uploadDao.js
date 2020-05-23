const fn = require('./fn');

module.exports = {
    postResource:function (req,res,next) {
        if(!req.file){
            res.json(fn.jsonFail('缺少参数'));
            return;
        }
        res.json(fn.jsonSuccess('http://'+req.headers.host+'/images/uploads/'+req.file.filename));
    },
};