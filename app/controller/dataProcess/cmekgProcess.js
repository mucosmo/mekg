/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:42:01
 * @Description: 对mysql数据库的数据做一些预先处理
 */


const axios = require('../../../config/http/axios')

const service = require('../../service/cmekg')

const MySQL = require('../../../config/database/mysql')


const md5 = require('md5')


let mongoClient = require('../../../config/database/mongodb')(process.env.NODE_ENV)

let assert = require('assert')
const { ObjectId } = require('bson')



// 知识图谱分类
const configArr = [
    { tree_type: "常见病", "active": true, table_kg: "common_ailment_kg", table: "common_ailment" },
    { tree_type: "科室", "active": true, table_kg: "section_kg", table: "section" },
    { tree_type: "ICD10", "active": true, table_kg: "icd10_cn_kg", table: "icd10_cn" },
    { tree_type: "药物", "active": true, table_kg: "medicine_kg", table: "medicine" },
    { tree_type: "症状", "active": true, table_kg: "symptom_kg", table: "symptom" },
    { tree_type: "诊疗", "active": true, table_kg: "diagnosis_kg", table: "diagnosis" }
]


module.exports = cmekgPreprocess = async (env, database = null) => {


    const mysql = new MySQL(env, database)

    let sql0 = 'select * from category;'

    let category = await mysql.query(sql0)


    mongoPlayground(mongoClient, mysql)

    return

    db = mongoClient.db('cmekg')

    let kgs = ['diagnosis_kg', 'symptom_kg', 'icd10_cn_kg', 'medicine_kg']
    // kgs=['symptom_kg']

    let tableMap = {

        'diagnosis_kg': 'kg_diagnosis',
        'symptom_kg': 'kg_symptom',
        'icd10_cn_kg': 'kg_icd10',
        'medicine_kg': 'kg_medicine',
    }

    for (let tableName of kgs) {
        let sql = `select * from ${tableName};`
        let result = await mysql.query(sql)
        result = arangoFormat(result, category)
        collection = db.collection(tableMap[tableName])

        await collection.deleteMany({})

        await collection.insertMany(result)
    }

    console.log('到这里了--')


}

// 按照arangodb的格式格式化数据
arangoFormat = (result, category) => {

    let i = 0

    for (let item of result) {
        console.log(++i)

        // if(i>10) return

        let values = []

        let nodes = {}

        item.node.map(x => {

            filterItem = category.filter(y => {

                return y.name == item.categories[x.category].name
            })
            x.category = filterItem[0].vcode
            x.label = x.label.replace(/\"/g, '\'')

            if (x.label == '') {

                let filterItem = item.link.filter(y => {
                    return y.target == x.name
                })

                x.label = filterItem[0].value
            }

            nodes[x.name] = x.label


            x.name = md5(x.label)


            values.push(`("${x.label}","${x.category}",'["${tableName}"]')`)

            return x

        })

        item.link.map(x => {

            x._from = md5(nodes[x.source])
            x._to = md5(nodes[x.target])

            delete x.source
            delete x.target

            return x
        })

        delete item.link
        delete item.node
        delete item.create_time
        delete item.update_time
        delete item.categories

    }

    return result
}


//  mongodb的测试
mongoPlayground = async (client, mysql) => {


    let db = client.db('mtdd')


    let collection = db.collection('test');

    let arr = []



    for (let i = 0; i < 2000; i++) {
        arr.push({ a: Math.random(), b: Math.random(),c:new Array(20).fill('abc') })

    }



    collection.deleteMany({})
    let t1 = new Date()
     await collection.insertMany(arr, { ordered: false }) // 2453 ms
    console.log(new Date() - t1)




    arr = arr.map(x => {
        return `(${x.a},${x.b},'${JSON.stringify(x.c)}')`
    })




    arrStr = arr.join(',')

    mysql.query(`truncate test`)


    let t2 = new Date()
    sql = `insert into test(a,b,c) values ${arrStr}`
    await mysql.query(sql)

    console.log(new Date() - t2)







    // // 获取所有数据
    // let data=await collection.find()

    // console.log(await data.toArray())


    // // 会抛出错误，但是由于ordered设置成了false，会把没有重复的数据插入
    // collection.insertMany(data,{ordered:false})


    // // 最后一项upsert设置成true，则在id==3存在时，会进行更新
    // collection.updateOne({"id": 3132}, {"$set": {"name": "实验室键差"}}, {upsert:true})


}







