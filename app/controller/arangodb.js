/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:41:43
 * @Description: arangodb数据库操作控制器层
 */


const service = require('../service/arangodb')



module.exports = {


    // 在arangodb中创建疾病集合
    createCol: async (env,colName,department) => {


        let disease = await service.selectDisease(department)


        await service.createCollection(env,colName, disease)



    },

        // 在arangodb中创建cmekg知识图谱
        createCmekg: async (env,colName,department) => {


            let disease = await service.selectDisease(department)
    
    
            await service.createCollection(env,colName, disease)
    
    
    
        },



}
