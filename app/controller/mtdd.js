/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-27 08:43:21
 * @Description: 将数据库的数据写入文件
 */


const query=require('../../config/database/mysql')

const fs=require('fs')

const path=require('path')

// // fs读取文件时路径设置官方推荐 https://nodejs.org/api/fs.html
// console.log(path.resolve(__dirname,'../data/mysql.json'))

// // join 和 resolve的区别
// console.log(path.join(__dirname,'/data'))
// console.log(path.resolve(__dirname,'/data'))

// console.log(process.cwd())


module.exports={

    selectMydata: async(ctx)=>{

        // let sql=`select a.id,a.name_eng as \`name\` ,a.\`name\` as chinese_name, a.icd11_code as \`code\`,  a.introduction as intro,a.infective,a.alias,
        // b.english_name as category,b.chinese_name as category_chinese_name,a.prevention as prevent,a.common_treat as treat,a.identify,
        // a.create_time as create_timestamp,a.update_time as update_timestamp
        //  from disease a left join department b on a.department=b.pinyin where department="fuke" limit 10;`
    
        // const result=await query(sql)

        // // console.log(JSON.parse(result))
    
        // // // fs.writeFileSync(\'../../data/mysql.json',JSON.stringify(result))  错误
        // fs.writeFileSync(path.resolve(__dirname,'../../data/mysql.json'),JSON.stringify(result))

        // ctx.body=result


        let sql=`select * from department;`
    
        const result=await query(sql)

        // console.log(JSON.parse(result))
    
        // // fs.writeFileSync(\'../../data/mysql.json',JSON.stringify(result))  错误
        fs.writeFileSync(path.resolve(__dirname,'../../data/mysql.json'),JSON.stringify(result))

        ctx.body=result
    
    
    }

}

