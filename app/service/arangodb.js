/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:43:50
 * @Description: arangodb数据库服务层
 */

const { aql } = require("arangojs");

const fs = require('fs')

const path = require('path')

let arangodb = require('../../config/anangodb/arangodb')

const query = require('../../config/mysql/local')




module.exports = {

    // 选择疾病
    selectDisease: async (department) => {

        let sql = `select a.id,a.name_eng as \`name\` ,a.\`name\` as chinese_name, a.icd11_code as \`code\`,  a.introduction as intro,a.infective,a.alias,
        b.english_name as category,b.chinese_name as category_chinese_name,a.prevention as prevent,a.common_treat as treat,a.identify,
        a.create_time as create_timestamp,a.update_time as update_timestamp
         from disease a left join department b on a.department=b.pinyin where department='${department}';`

        results = await query(sql)

        return results

    },

    // 选择cmekg节点
    selectNode: async (nodeName) => {

        let sql = `select * from icd10_cn_kg where \`name\`='${nodeName}' limit 1;`

         sql = `select * from icd10_cn_kg;`




        result = await query(sql)


        fs.writeFileSync(path.resolve(__dirname, '../../data/mysql.json'), JSON.stringify(result))


        return result

    },

    // 创建集合
    createCollection: async (env, colName, data, type = null) => {

        let db = arangodb(env)

        let col = db.collection(colName);

        // await col.exists() ? await col.truncate() : type ? await col.create({ type: type }) : await col.create()

        await col.saveAll(data)

        console.log(`===========================\nDone.\nCollection ${colName} was created in ArangoDB.`)

        return col

    },

    // 创建图像
    createGraph: async (env, graphName, edgeCol, verticesFrom, verticesTo) => {



        let db = arangodb(env)

        //  定义图
        let graph = db.graph(graphName)

        // 由定义好的顶点和边集合创建图
        let exists = await graph.exists()

        if (exists) {
            await graph.drop()
        }

        await graph.create([
            {
                collection: edgeCol.name,
                from: verticesFrom,
                to: verticesTo,
            },
        ])

        console.log(`===========================\nDone.\nGraph ${graphName} was created in ArangoDB.`)

        return graph

    },



    // 查询图像
    queryGraph: async (env, graph) => {

        let info = await graph.get()

        // console.log(info)

        const db = arangodb(env)

        const now = Date.now();



        const cursor = await db.query(aql`
        RETURN ${now}
      `);
        const result = await cursor.next()

        console.log(result)


        return

        // const result = await graph.traversal("vertices/a", {
        //     direction: "outbound",
        //     init: "result.vertices = [];",
        //     visitor: "result.vertices.push(vertex._key);",
        // });
        // console.log(result.vertices);




    }




}



