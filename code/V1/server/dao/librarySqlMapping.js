var librarySqlMapping = {
	users:{
		userExists:'SELECT count(1) num FROM administrators WHERE username=?',//用户是否存在
		addUser:'INSERT INTO administrators(`username`,`password`,`created_at`,`salt`) VALUES (?,?,?,?)',//添加用户
		deleteUser:'UPDATE administrators set enable=0,deleted_at=? WHERE id=?',//删除用户
		checkUser:'SELECT * FROM administrators WHERE username=? and `password`=?',//验证用户
		findUserByUserName:'SELECT * FROM administrators WHERE username=? limit 1',//查找用户
		userList:'SELECT id,username,enable,created_at FROM administrators where `enable`=1',//查找用户
		resetPassword:'update administrators set salt=?,password=? where id=?',//重设密码
	},
	//图书借阅排行榜
	borrowingList:{
		//query: 'select book_name,book_borrow_count from borrowing_list where `hour` between ? and ? order by  book_borrow_count desc  limit ?',
		query: 'select any_value(book_name) AS book_name,SUM(book_borrow_count) AS book_borrow_count from borrowing_list where `hour` between ? and ? GROUP BY  book_id ORDER by book_borrow_count desc limit ?;',
		add:'insert into borrowing_list(`book_name`,`book_borrow_count`,`hour`,`book_id`,`created_at`,`updated_at`) values' +
			' (?,?,?,?,?,?)',
		hasRecord:'select id from borrowing_list where `hour`=? and book_id=?',
		update:'update borrowing_list set book_borrow_count=?,updated_at=? where id=?',
	},
	borrowingCount:{
		//itemsCount: 'select SUM(`borrow_count`) items from borrowing_count where `week` between ? and ? group by `day`',//计算分段借阅量
		//totalCount: 'select SUM(`borrow_count`) total from borrowing_count where `week` between ? and ?',//计算总的借阅量
		add:'insert into borrowing_count(`borrow_count`,`hour`,`day`,`week`,`month`,`season`,`year`,`btime`,`created_at`,`updated_at`) values' +
			' (?,?,?,?,?,?,?,?,?,?)',
		hasRecord:'select id from borrowing_count where `hour`=?',
		update:'update borrowing_count set borrow_count=?,updated_at=? where id=?',
	},
	libraryPeopleCount:{
		recently:'select `count`,`hour` from library_people_count where `hour` between ? and ?',//
		thisPeriod:'select SUM(`count`) count from library_people_count where `hour` between ? and ?',//本周、本月、本年等
		totalCount:'select SUM(`count`) count from library_people_count',//总到馆人数
	},
	aboutLibrary:{
		allEnable:'select ' +
			'al.`id`,al.`source_type`,al.`source_url`,al.`operator_id`,al.`updated_at`,a.username ' +
			'from about_library al left join administrators a on al.`operator_id`=a.`id`' +
			'where al.enable=1 and al.deleted_at is null',//所有可用的
		all:'select ' +
			'al.`id`,al.`source_type`,al.`source_url`,al.`operator_id`,al.`updated_at`,a.username,al.enable ' +
			'from about_library al left join administrators a on al.`operator_id`=a.`id`' +
			'where al.deleted_at is null order by al.enable=0,al.updated_at desc,al.created_at desc limit ?,?',//所有没删除的
		addResource:'insert into about_library(`source_type`,`source_url`,`operator_id`,`created_at`,`updated_at`) values (?,?,?,?,?)',
		updateResource:'update `about_library` set `source_url`=?,`operator_id`=?,`updated_at`=? where id=?',
		deleteResource:'update `about_library` set `enable`=0,`operator_id`=?,`deleted_at`=? where id=?',
		setResource:'update `about_library` set `enable`=?,`operator_id`=?,`updated_at`=? where id=?',
	},
	todayRecommend:{
		selectAll:'select * from today_recommend where deleted_at is null and  recommend_type=? order by `is_show`=0,sort desc,created_at desc,updated_at desc limit ?,?',
		//totalCount:'select COUNT(1) totalCount from today_recommend',//总数量
		totalCount:'select COUNT(1) totalCount from today_recommend where deleted_at is null and recommend_type=?',//总数量
		selectShow:'select * from today_recommend where deleted_at is null and is_show=1 and recommend_type=? order by sort desc,created_at desc,updated_at desc',
		setSort:'update today_recommend set sort=? where id=?',
		setId:'update today_recommend set id=? where id=?',
		//add:'update today_recommend set is_show=1,recommend_type=?,sort=(select t.sort from (select MAX(sort) sort  from today_recommend) as t)+1 where id=?',
		add:'update today_recommend set is_show=1 where id=?',
		delete:'update today_recommend set is_show=0 where id=?',
		setDownloadCount:'update today_recommend set customize_download_count=? where id=?',
		selectClass:'select id,`name` from today_recommend_class where enable=1',
		sorts:'select id,sort from today_recommend where id in(?)',
        selectExists:'select count(1) num from today_recommend where book_id=?',
		insert:'insert into today_recommend(`is_show`,`book_name`,`book_cover_url`,`book_qrcode_url`,`customize_download_count`,' +
            '`real_download_count`,`time_to_market`,`created_at`,`updated_at`,`book_id`,`recommend_type`,`sort`)' +
			'values(1,?,?,?,?,?,?,?,?,?,?,(select MAX(bb.sort) from today_recommend bb)+1)',
		update:'update today_recommend set `book_name`=?,`book_cover_url`=?,`book_qrcode_url`=?,`customize_download_count`=?,' +
			'`real_download_count`=?,`time_to_market`=?,`updated_at`=?,`recommend_type`=? where id=?',
		forceDelete:'update today_recommend set is_show=0, deleted_at=? where id=?'

	},
	notice:{
		list:'select * from notice where deleted_at is null  order by enable desc  limit ?,?',
		allCount:'select count(1) allCount from notice where deleted_at is null',
		updateNotice:'update notice set enable=? where id=?',
		editNotice:'update notice set content=?,title=? where id=?',
		addNotice:'insert into notice(`title`,`content`,`enable`,`created_at`)'
			+'values(?,?,?,?)',
		delete:'update notice set deleted_at=? where id=?',

	},
	readerStar:{
		//query:'select id,reader_name,reader_uuid,read_duration,read_count from reader_star where `hour` between ? and ? order by ?',
	},
	operationLog:{
		insert: 'insert into `operation_log`(`action`,`action_type`,`old_type`,`new_type`,`created_at`)values(?,?,?,?,?)',
		query: 'select * from operation_log where id=?',
		operationList: 'select id,action_url,parameter,create from operation_log limit ?,?',
	},
	cache:{
		borrowingList: 'select `value` from cache where `key`=\'borrowing_list\'',
	},
	permissions:{
		permissionsList:'select id,`name` from permissions',
		rolesList:'select id,`name` from roles',
		userHasHolesIds:'select role_id from model_has_roles where model_id=?',
		rolesInfo:'select id,`name` from roles where id in(?)',
		roleHasPermissionsIds:'select permission_id from role_has_permissions where role_id in(?)',
		permissionsInfo:'select id,`name`,action_url from permissions where id in(?)',
		//roleHasPermissionExists:'select count(1) num from role_has_permissions where permission_id=? and role_id=?',
		//givePermissionToRole:'insert into `role_has_permissions`(permission_id,role_id)values(?,?)',
		//userHasRoleExists:'select count(1) num from model_has_roles where model_id=? and role_id=?',
		//giveRoleToUser:'insert into `model_has_roles`(model_id,role_id)values(?,?)',
		//deleteUsersRoles:'delete from model_has_roles where model_id=?',
		//deleteRolesPermissions:'delete from role_has_permissions where role_id=?',
		findRoleByName:'select `name` from roles where `name`=? limit 1',
		addRole:'insert into roles(`name`,created_at,updated_at,created_by)values(?,?,?,?)',
		deleteRole:'delete from model_has_roles where role_id=?;' +
			'delete from role_has_permissions where role_id=?;' +
			'delete from roles where id=?;'
	},
	configures:{
		findConfigByName:"select name_zh,`name`,`value` from configures where `name`=?",
		insertConfigures:"insert into `configures`(`name_zh`,`name`,`value`,`created_at`) values (?,?,?,?)",
		updateConfigures:"update configures set `value`=?,updated_at=? where `name`=?",
	}
};
 
module.exports = librarySqlMapping;