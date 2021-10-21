/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:42:01
 * @Description: 本模块用于网络请求
 * @FilePath: /jh_mekg_api/app/controller/request.js
 */


const axios = require('../../config/http/axios')

const service = require('../service/cmekg')

const query = require('../../config/mysql/local')


// 知识图谱分类
const configArr = [
    { tree_type: "常见病", "active": true, table_kg: "common_ailment_kg", table: "common_ailment" },
    { tree_type: "科室", "active": true, table_kg: "section_kg", table: "section" },
    { tree_type: "ICD10", "active": true, table_kg: "icd10_cn_kg", table: "icd10_cn" },
    { tree_type: "药物", "active": true, table_kg: "medicine_kg", table: "medicine" },
    { tree_type: "症状", "active": true, table_kg: "symptom_kg", table: "symptom" },
    { tree_type: "诊疗", "active": true, table_kg: "diagnosis_kg", table: "diagnosis" }
]


// ICD-10 所有疾病
let getICD10 = async () => {

    await axios({ url: 'load_tree/ICD10' })
        .then(async res => {
            // console.log(`返回成功: load_tree/ICD10`);
            await service.addIcd10(res.data)
        }).catch(err => {
            console.log(`返回失败: load_tree/ICD10`);
            console.error(err.response.statusText);
        })
}


// 获取 疾病，药物，症状，诊疗清单
let getList = async (label) => {
    let config = configArr.filter(item => item.tree_type == label)[0]


    if (config == undefined) {
        throw new Error(`
        请从以下选择分类：
        常见病、科室、ICD10、药物、症状、诊疗
        `)
    }

    if (!config.active) return

    const url = `load_tree/${encodeURIComponent(config.tree_type)}`

    await axios({ url: url })
        .then(async res => {
            res.data.config = config
            await service.addList(res.data)
        }).catch(err => {
            console.log(`返回失败: ${url}`);
            console.error(err);
        })
}



// 加入知识图谱，fix代表查漏补缺，不需要每次都重新下载所有数据
let addKG = async (label, fix = true) => {
    let config = configArr.filter(item => item.tree_type == label)[0]

    if (!config.active) return  // 是否激活

    let items = await query(
        `select a.id, a.name from ${config.table} a 
    left join ${config.table_kg} b on a.id=b.id 
    where b.id is null`
    )

    // 重新请求所有数据
    if (!fix) {
        items = await query(`select id, name from ${config.table}`) // 查找来源
        await query(`truncate table ${config.table_kg}`) // 清空相应的知识图谱表格
    }

    // 记录并发错误id
    let errId = []

    // forEach 内部不易实现 await 
    for (let [index, item] of items.entries()) {
        let reqData = {
            url: 'knowledge',
            params: {
                name: item.name,
                tree_type: config.tree_type // 图谱分类 ， 包括 疾病-药物-症状-诊疗
            }
        }

        // 并发，防治过于拥挤
        setTimeout(() => {
            axios(reqData)
                .then(res => {
                    res.data.id = item.id
                    res.data.config = config
                    service.addKG(res.data) // 知识图谱
                }).catch(err => {
                    console.log(`${config.tree_type}查询返回错误：`);
                    // console.error(err);
                    errId.push(item.id)
                })
        }, index * 10); // 是网络状态而定，15足矣
        // console.log(`发生错误的ID有： ${errId.join('-') }`)
    }
}

/**
* @decsription 针对cmekg的爬虫
* @param label {String} 【常见病、科室、ICD10、药物、症状、诊疗]之一
* @param refresh {Boolean} 是否更新label的源数据列表，默认为 false
* @param fix {Boolean} 补足漏掉的知识图谱，默认 true
**/
let crawler = async (label, refresh = false, fix = true) => {
    label = label.toUpperCase()
    try {
        if (refresh) {
            if (label == 'ICD10') {
                await getICD10()
            } else {
                await getList(label)
            }
        }
        addKG(label, fix)
    } catch (error) {
        console.error(error);
    }

}


module.exports = crawler






