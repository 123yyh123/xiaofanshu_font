const sqliteUtil = {
	dbName: 'xfsDB', // 数据库名称
	dbPath: '_doc/xfs.db', // 数据库地址,推荐以下划线为开头   _doc/xxx.db
//id，user_id，avatar_url，user_name，last_message，last_time，unread_num，stranger
	// 判断数据库是否打开
	isOpen() {
		// 数据库打开了就返回 true,否则返回 false
		var open = plus.sqlite.isOpenDatabase({
			name: this.dbName, // 数据库名称
			path: this.dbPath // 数据库地址
		})
		return open
	},
	// sd
	// 创建数据库 或 有该数据库就打开
	openSqlite() { 
		return new Promise((resolve, reject) => {
			// 打开数据库
			plus.sqlite.openDatabase({
				name: this.dbName,
				path: this.dbPath,
				success(e) {
					resolve(e) // 成功回调
				},
				fail(e) {
					reject(e) // 失败回调
				}
			})
		})
	},

	// 关闭数据库
	closeSqlite() {
		return new Promise((resolve, reject) => {
			plus.sqlite.closeDatabase({
				name: this.dbName,
				success(e) {
					resolve(e)
				},
				fail(e) {
					reject(e)
				}
			})
		})
	},


	// 数据库删表 sql:'DROP TABLE dbTable'
	dropTable(dbTable) {

		console.log(`DROP TABLE ${dbTable}`)
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: this.dbName,
				sql: `DROP TABLE ${dbTable}`,
				success(e) {
					resolve(e)
				},
				fail(e) {
					reject(e)
				}
			})
		})
	},

	//-----------------------js对象方法，简化操作-------------
	///原生的sql操作
	SqlExecute(sql) {
		console.log(sql)
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: this.dbName,
				sql: sql,
				success(e) {
					// console.log(e)
					resolve(e)
				},
				fail(e) {
					console.log(e)
					reject(e)
				}
			})
		})
	},
	//执行原生的select语句
	SqlSelect(sql) {
		console.log(sql)
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: this.dbName,
				sql: sql,
				success(e) {
					console.log(e)
					resolve(e)
				},
				fail(e) {
					console.log(e)
					reject(e)
				}
			})
		})
	},

	//通过对象创建数据表,使用对象参数
	JsCreateTable(dbTable, data) {
		data = Object.entries(data).map(item => {
			return item[0] + ' ' + item[1]
		}).join(',')
		var sql = `CREATE TABLE IF NOT EXISTS ${dbTable}("id" INTEGER PRIMARY KEY AUTOINCREMENT,${data})`
		return this.SqlExecute(sql)
	},
	//通过对象创建数据表,使用对象的数据类型
	JsCreateTableType(dbTable, data) {
		data = Object.entries(data).map(item => {
			var typeName = ''
			switch (item[1].constructor) {
				case Number:
					if (Math.floor(item[1]) == item[1]) {
						typeName = 'INTEGER'
					} else {
						typeName = 'REAL'
					}
					break
				case String:
					typeName = 'TEXT'
					break
				case Boolean:
					typeName = 'BOOLEAN'
					break
				case Date:
					typeName = 'TEXT'
					break
			}
			return item[0] + ' ' + typeName
		}).join(',')


		var sql = `CREATE TABLE IF NOT EXISTS ${dbTable}("id" INTEGER PRIMARY KEY AUTOINCREMENT,${data})`
		console.log(sql)
		return this.SqlExecute(sql)
	},
	//通过对象插入数据
	JsInsertTableData(dbTable, data) {
		var condition = []
		var sqlValue = []
		Object.entries(data).forEach(item => {
			condition.push(`'${item[0]}'`)
			if (item[1] != undefined) {
				if (item[1].constructor == String) {
					sqlValue.push(`'${item[1]}'`)
				} else if (item[1].constructor == Date) {

					sqlValue.push(`'${item[1].format('yyyy-MM-dd hh:mm:ss')}'`)
				} else {
					sqlValue.push(item[1])
				}
			}
		})
		condition = condition.join(',')
		sqlValue = sqlValue.join(',')
		var sql = `INSERT INTO ${dbTable} (${condition}) VALUES(${sqlValue})`
		return this.SqlExecute(sql)
	},
	//通过对象选择数据
	JsSelectTableData(dbTable, data) {
		var sql = ''
		var condition = []
		if (data == undefined || data == null || data == {}) {
			sql = `SELECT * FROM ${dbTable}`
		} else if(data.constructor == Number){
			sql = `SELECT * FROM ${daTable} where id = ${data}`
		} else {
			Object.entries(data).forEach(item => {
				if (item[1] != undefined && item[0] != 'id') {
					if (typeof(item[1] == 'string')) {
						condition.push(` ${item[0]} = '${item[1]}' `)
					} else {
						condition.push(` ${item[0]} = ${item[1]} `)
					}
				}
			})
			condition = condition.join('AND')
			sql = `SELECT * FROM ${dbTable} WHERE ${condition}`
		}
		return this.SqlSelect(sql)
	},
	//通过对象获取
	JsUpdate(dbTable, data) {
		try{
			var sql = ''
			var condition = []
			Object.entries(data).forEach(item => {
				if (item[1] != undefined && item[0] != 'id') {
					if (typeof(item[1] == 'string')) {
						condition.push(` ${item[0]} = '${item[1]}' `)
					} else {
						condition.push(` ${item[0]} = ${item[1]} `)
					}
				}
			})
			condition = condition.join(',')
			sql = `UPDATE ${dbTable} SET ${condition} where id = ${data.id}`
			return this.SqlExecute(sql)
		}catch(e){
			console.log(e)
			//TODO handle the exception
		}
		
	},
	JsDelete(dbTable,data){
		var sql = ''
		// debugger
		var condition = []
		try{
			if (data.constructor == Number) {
				sql = `DELETE FROM ${dbTable} where id = ${data}`
			} else {
				Object.entries(data).forEach(item => {
					if (item[1] != undefined && item[0] != 'id') {
						if (typeof(item[1] == 'string')) {
							condition.push(` ${item[0]} = '${item[1]}' `)
						} else {
							condition.push(` ${item[0]} = ${item[1]} `)
						}
					}
			
				})
				condition = condition.join('AND')
				sql = `Delete FROM ${dbTable} WHERE ${condition}`
			}
			return this.SqlExecute(sql)
		}catch(e){
			console.log(e)
		}
		
	}
}

module.exports = sqliteUtil

