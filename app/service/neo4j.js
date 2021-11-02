/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 17:38:21
 * @Description: 
 */


const query=require('../../config/database/neo4j.js')



module.exports={
    addOne:async (cql,params)=>{
        let records= await query(cql, params)
        return records
    }
}