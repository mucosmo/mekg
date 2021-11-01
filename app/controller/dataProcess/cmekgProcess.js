/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:42:01
 * @Description: 对mysql数据库的数据做一些预先处理
 */


const axios = require('../../../config/http/axios')

const service = require('../../service/cmekg')

const query = require('../../../config/mysql/local')
const md5 = require('md5')


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

    


    let sql0='select * from category;'
    let category=await query(sql0)

    let kgs=['diagnosis_kg', 'symptom_kg', 'icd10_cn_kg', 'medicine_kg']
    // kgs=['symptom_kg']


    
    for (let tableName of kgs ) {
        let sql = `select * from ${tableName};`
        let result = await query(sql)
        let i = 0

        for (let item of result) {
            console.log(++i)

            // if(i>10) return


 
            // for (let v of item.categories) {
            //     // let sql=`insert into category(\`name\`,tree_type) values('${v.name}','${tableName}') on duplicate key update tree_type=values(tree_type);`


            //     let sql = `insert into medical_data.category(\`name\`,tree_type) values('${v.name}','["${tableName}"]') on 
            // duplicate key update 
            // tree_type= 
            // (select if
            //     (JSON_CONTAINS(tree_type, '"${tableName}"','$'), tree_type, JSON_ARRAY_APPEND(tree_type, '$', '${tableName}'))
            // );`

            //     await query(sql)
            // }

    

            let values=[]


            let nodes={}




            item.node.map(x=>{

                filterItem= category.filter(y=>{

                    return y.name==item.categories[x.category].name
                })
                x.category=filterItem[0].vcode
                x.label=x.label.replace(/\"/g,'\'')

                if(x.label==''){

                    let filterItem=item.link.filter(y=>{
                        return y.target==x.name
                    })

                    x.label=filterItem[0].value
                }

                nodes[x.name]=x.label


                x.name=md5(x.label)

    
                values.push(`("${x.label}","${x.category}",'["${tableName}"]')`)

                return x

            })




            item.link.map(x=>{

                x._from=md5(nodes[x.source])
                x._to=md5(nodes[x.target])

                delete x.source
                delete x.target

                return x
            })    
            
            sql=`update ${tableName} set link_arangodb=?, node_arangodb=? where id=?`

            // console.log(sql)
            await query(sql,[JSON.stringify(item.link),JSON.stringify(item.node),item.id])



        }
    }

    console.log('到这里了--')


}



module.exports = process






