/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 14:37:31
 * @Description: 连接图数据库neo4j本地服务器
 * @FilePath: /jh_mekg_api/config/neo4j/local.js
 */

const neo4j = require('neo4j-driver-lite')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'cosmo'))

const session = driver.session()

let query = async (cql, params) => {
    try {
        const result = await session.writeTransaction(tx => tx.run(cql, params))
        return result.records
    } catch (err) {
        return err
    } finally {
        await session.close()
    }
    // on application exit:
    await driver.close()
}


module.exports = query
