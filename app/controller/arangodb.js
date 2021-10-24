/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:41:43
 * @Description: arangodb数据库操作控制器层
 */


const service = require('../service/arrangodb')



module.exports = {


    // 在arangodb中创建疾病集合
    createCol: async (colName,department) => {


        let disease = await service.selectDisease(department)


        await service.createCollection(colName, disease)



    },

}
