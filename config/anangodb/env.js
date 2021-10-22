/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:26:30
 * @Description: arangodb服务器，不同的en
 */

const { Database } = require("arangojs");

const secretConstants=require('../secretConstants.js')


module.exports=arangodb=(env=null)=>{

    const config=secretConstants.ARANGODB[env]

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



