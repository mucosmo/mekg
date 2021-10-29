/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:42:01
 * @Description: 本模块用于网络请求
 */


const axios = require('../../../config/http/axios')

const service = require('../../service/cmekg')

const query = require('../../../config/mysql/local')


// 知识图谱分类
const configArr = [
    { tree_type: "常见病", "active": true, table_kg: "common_ailment_kg", table: "common_ailment" },
    { tree_type: "科室", "active": true, table_kg: "section_kg", table: "section" },
    { tree_type: "ICD10", "active": true, table_kg: "icd10_cn_kg", table: "icd10_cn" },
    { tree_type: "药物", "active": true, table_kg: "medicine_kg", table: "medicine" },
    { tree_type: "症状", "active": true, table_kg: "symptom_kg", table: "symptom" },
    { tree_type: "诊疗", "active": true, table_kg: "diagnosis_kg", table: "diagnosis" }
]


process = async () => {
    for (let tableName of ['diagnosis_kg', 'symptom_kg', 'icd10_cn_kg', 'medicine_kg']) {
        let sql = `select * from ${tableName};`
        let result = await query(sql)
        let i = 0
        for (let item of result) {
            console.log(++i)
            for (let v of item.categories) {
                // let sql=`insert into category(\`name\`,tree_type) values('${v.name}','${tableName}') on duplicate key update tree_type=values(tree_type);`


                let sql = `insert into medical_data.category(\`name\`,tree_type) values('${v.name}','["${tableName}"]') on 
            duplicate key update 
            tree_type= 
            (select if
                (JSON_CONTAINS(tree_type, '"${tableName}"','$'), tree_type, JSON_ARRAY_APPEND(tree_type, '$', '${tableName}'))
            );`

                await query(sql)
            }
        }
    }

    console.log('到这里了--')


}



module.exports = process






