/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-24 18:15:48
 * @Description: 连接mongodb数据库
 */

const { MongoClient } = require('mongodb');

const secretConstants = require('../secretConstants.js')



async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    // the following code examples can be pasted here...

    return 'done.';
}

module.exports = mongodb = async (env) => {

    const config = secretConstants.MONGODB[env]

 

    const uri = `mongodb://${config.username}:${config.password}@${config.url}/${config.databaseName}`;

 

    const client = new MongoClient(uri)



    await client.connect();

    const db = client.db()


    return db

    

    const collection = db.collection('test');

    collection.insertOne({a:1,b:23456543})


    console.log('Connected successfully to server');

    console.log(collection)

    // const db = client.db(config.dbName);

    // console.log(db)


    return client


}
