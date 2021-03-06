/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:26:30
 * @Description: 在不同的env下构造arangodb的 database 并输出
 */

const { Database } = require("arangojs");

const constants=require('../constants.js')


module.exports=arangodb=(env=null)=>{

    const config=constants.ARANGODB[env]

    const db = new Database({
        url: config.url,
        databaseName: config.databaseName,
        auth: { username: config.username, password: config.password},
      });
      
    //   // The database can be swapped at any time
    //   db.database("waffles");
    //   db.useBasicAuth("admin", "maplesyrup");

      return db

}



