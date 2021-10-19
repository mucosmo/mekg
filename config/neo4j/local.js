/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 14:37:31
 * @Description: 连接图数据库neo4j本地服务器
 * @FilePath: /jh_mekg_api/config/neo4j/local.js
 */

const neo4j = require('neo4j-driver-lite')

const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', '31415'))

const session = driver.session()

console.log(driver);

let test = function async() {
    try {
        const result = await session.writeTransaction(tx =>
            tx.run(
                'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)', { message: 'hello, world' }
            ))
        const singleRecord = result.records[0]
        const greeting = singleRecord.get(0)
        console.log(greeting)
    } finally {
        await session.close()
    }
    // on application exit:
    await driver.close()
}

test()

module.exports = test
