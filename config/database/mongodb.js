/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-24 18:15:48
 * @Description: 连接mongodb数据库
 */

const MongoClient = require('mongodb').MongoClient;

const constants = require('../constants.js')


module.exports = connect =  (env) => {

    const config = constants.MONGODB[env]


    let uri = `mongodb://${config.username}:${config.password}@${config.url}/${config.databaseName}`;

    uri=`mongodb://root:31415@localhost:27017/?retryWrites=true&writeConcern=majority`

    // "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

    const client = new MongoClient(uri)

    client.connect();

    // const db = client.db('mtdd')

    return client

  

}

 

 