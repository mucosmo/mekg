/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-19 17:38:21
 * @Description: 
 * @FilePath: /jh_mekg_api/app/service/neo4j.js
 */


const query=require('../../config/neo4j/local.js')



module.exports={
    addOne:async (cql,params)=>{
        let result= await query(cql, params)
        return result
    }
}