/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:32:28
 * @Description: 连接mysql数据库本地服务器
 * @FilePath: /jh_mekg_api/config/mysql/local.js
 */


var mysql = require('mysql');

// 连接池
var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jh31415!',
    // database: 'medical_data',
    database: 'health39',
    port: '3306',
    charset: 'utf8mb4'
});

// 连接器
let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

module.exports=query