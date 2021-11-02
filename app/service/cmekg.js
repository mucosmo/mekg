/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 12:50:20
 * @Description: 把从网页爬去的数据存储到数据库
 */


const query = require('../../config/database/mysql')

module.exports = {
    // 添加新的疾病到 icd10_cn 表
    addIcd10: async data => {
        let values = []
        data.nodes.forEach((ele, idx) => {
            const eleSplit = ele.name.split(" ")
            let isLetter = /^[a-zA-Z0-9\-\.]+$/.test(eleSplit[0]); // 是否全部为字母/数字/./- 这几种符号
            if (isLetter) { // 英文加数字编码
                if (eleSplit.length == 1) { // 也有可能是 全英文的name，且没有编码，比如 id=147583 的 DMD
                    values.push(`(${ele.id},null,${ele.pId},'${eleSplit[0]}','${ele.icon}')`)
                } else {
                    values.push(`(${ele.id},'${eleSplit[0]}',${ele.pId},'${eleSplit[1]}','${ele.icon}')`)
                }
            } else { // 没有编码
                if (eleSplit.length == 1) {// 只有一个中文名字
                    values.push(`(${ele.id},null,${ele.pId},'${eleSplit[0]}','${ele.icon}')`)
                } else {// 中文名被空格断开了
                    values.push(`(${ele.id},null,${ele.pId},'${eleSplit[0]}${eleSplit[1]}','${ele.icon}')`)
                }
            }

        });

        const sql = `insert into icd10_cn(id,\`code\`,pId,\`name\`,icon) values ${values.join(',')}`

        await query('TRUNCATE table icd10_cn') // 先截断表
        await query(sql)
        console.log('【ICD10_cn】数据保存成功');
    },



    // 添加 疾病（除了需要特殊处理的ICD10），药物，症状，诊疗清单
    addList: async data => {
        let values = []
        data.nodes.forEach((ele, idx) => {
            values.push(`(${ele.id},${ele.pId},'${ele.name}','${ele.icon}')`)
        });
        const sql = `insert into ${data.config.table}(id,pId,\`name\`,icon) values ${values.join(',')}`
        await query(`TRUNCATE table ${data.config.table}`) // 先截断表
        await query(sql)
        console.log(`【${data.config.tree_type}】数据保存成功`);
    },


    // 添加知识图谱
    addKG: async data => {

        const sql = `insert into ${data.config.table_kg}(id,\`name\`,tree_type,categories,link,node) values(?,?,?,?,?,?)`

        await query(sql, [data.id, `${data.name}`, `${data.tree_type}`, JSON.stringify(data.categories), JSON.stringify(data.link), JSON.stringify(data.node)])

        if (data.link.length == 0) {
            console.log(`${data.config.tree_type}-${data.id}: XX【${data.name}】没有知识图谱`);
        } else {
            console.log(`${data.config.tree_type}-${data.id}:【${data.name}】知识图谱保存成功`);
        }


    }



}