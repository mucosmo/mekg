/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-22 12:41:43
 * @Description: arangodb数据库操作控制器层
 */


const arangodb = require('../../config/database/arangodb')
const service = require('../service/arangodb')

const query = require('../../config/database/mysql')

const mongoClient = require('../../config/database/mongodb')(process.env.NODE_ENV)


module.exports = {

    // 在arangodb中创建疾病集合
    createCol: async (env, colName, department) => {

        // let disease = await service.selectDisease(department)
        // await service.createCollection(env, colName, disease)


        let data = await query('select * from department;')

        await service.createCollection(env, colName, data)


    },

    // 在arangodb中创建cmekg知识图谱
    createCmekg: async (env) => {


        return

        // mysql获取原始节点数据
        dbName = 'cmekg'  

        let db = mongoClient.db(dbName)

        const collections = await db.listCollections({ name: { $regex: /kg_/ } }).toArray()

        for (let collection of collections) {
            collectionName = collection.name
            let result = await service.selectNode(dbName, collectionName)
            // 初始化定点合集
            let vertexColName = "cmekg_vertices"
            let verticesFrom = [], verticesTo = []
            verticesFrom.push(vertexColName)
            verticesTo.push(vertexColName)
            let [vertices, edges] = parseVertexEdge(result, vertexColName)

            console.log('here it is--')

            await service.createCollection(env, vertexColName, vertices)

            // 初始化边合集
            const edgeColName = "cmekg_edges"

            const edgeCollection = await service.createCollection(env, edgeColName, edges, 3)

        }


        return



        // // 创建图
        // const graphName = 'cmekg'

        // const graph = await service.createGraph(env, graphName, edgeCollection, verticesFrom, verticesTo)

        // // 查询图
        // await service.queryGraph(env,graph)

    },



}


// -----------以下为辅助函数

// 处理原始关系数据，使其符合 arangodb格式
parseVertexEdge = (data, vertexColName) => {

    let vertices = [], edges = []

    for (let item of data) {
        // 自定义_key必须是显示字符串
        item.node_arangodb = item.node_arangodb.map(x => {
            x._key = String(x.name)
            return x
        })
        vertices = vertices.concat(item.node_arangodb)
    }

    for (let item of data) {
        item.link_arangodb = item.link_arangodb.map(x => {
            x._from = vertexColName + '/' + x._from
            x._to = vertexColName + '/' + x._to
            return x
        })
        edges = edges.concat(item.link_arangodb)
    }

    return [vertices, edges]

}
