// MySQL数据库联接配置
module.exports = {
	mysql: {
        connectionLimit:10,
		host: '47.101.204.69', 
		user: 'root',
		password: 'CCk123456//',
		database:'library', 
        port: 3306,
        multipleStatements: true // 支持执行多条 sql 语句
	}
};