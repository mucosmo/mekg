/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:32:28
 * @Description: 连接mysql数据库本地服务器
 */


var mysql = require('mysql2');

const constants = require('../constants.js')


class MysqlQuery {

    constructor(env, database = null) {
        const config = constants.MYSQL[env]
        config.database = database ? database : config.database
        this.pool = mysql.createPool(config)

    }

    async query(sql, values) {

        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    }


}


module.exports = MysqlQuery
