/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 17:46:26
 * @Description: neo4j 测试
 * @FilePath: /jh_mekg_api/app/controller/neo4j.js
 */


let neo4j= require('../service/neo4j')


const cql = 'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)'
const params = { message: 'hello, neo4j' }


let test=async ()=>{
    let records=await neo4j.addOne(cql,params)

    console.log(records[0].get(0))
}

test()