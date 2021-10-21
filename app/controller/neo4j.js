/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 17:46:26
 * @Description: neo4j 测试
 */


let neo4j= require('../service/neo4j')



let test=async (cql,params)=>{
    let records=await neo4j.addOne(cql,params)

    console.log(records[0].get(0))
}



const cql = 'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)'
const params = { message: 'hello, neo4j' }

test(cql,params)