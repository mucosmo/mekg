/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:43:50
 * @Description: arangodb数据库服务层
 */

const { aql } = require("arangojs");

let db = require('../../config/anangodb/arangodb')

const query = require('../../config/mysql/local')


module.exports = {

    // 选择疾病
    selectDisease: async (department) => {

        let sql = ` SELECT
            a.id, a.\`name\`, a.name_eng, a.alias,
            a.department as category, b.chinese_name as categiry_chinese_name,
            a.introduction as intro, a.infective, a.prevention,
            a.identify, a.common_treat, a.chinese_med_treat,
            a.create_time, a.update_time
            FROM disease as a 
            LEFT JOIN department as b 
            ON a.department=b.pinyin 
            WHERE department='${department}' limit 1`

        results = await query(sql)


        for(let [index,item] of results.entries()){

            console.log(item)

             
        }

        return results

    },

    // 创建集合
    createCollection: async (env,colName, data) => {

         db=db(env)

        let col = db.collection(colName);

        await col.exists() ? await col.truncate() : await col.create()


        for (let [index, item] of data.entries()) {

            console.log(item.name)
            console.log(typeof item.identify)
            item.identify=JSON.parse(item.identify).join('\r\n')
            await col.save(item)
        }

        console.log(`===========================\nDone.\nCollection ${colName} was created in ArangoDB.`)

    }


}



