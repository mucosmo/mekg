/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 17:38:21
 * @Description: 
 */


const query=require('../../config/neo4j/local.js')



module.exports={
    addOne:async (cql,params)=>{
        let records= await query(cql, params)
        return records
    }
}