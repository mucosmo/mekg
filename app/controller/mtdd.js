/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-27 08:43:21
 * @Description: 将数据库的数据写入文件
 */


const query=require('../../config/mysql/local')

const fs=require('fs')

const path=require('path')

require('../../data/mysql.json')

// // fs读取文件时路径设置官方推荐 https://nodejs.org/api/fs.html
// console.log(path.resolve(__dirname,'../data/mysql.json'))

// // join 和 resolve的区别
// console.log(path.join(__dirname,'/data'))
// console.log(path.resolve(__dirname,'/data'))

// console.log(process.cwd())


module.exports={

    selectMydata: async(ctx)=>{

        let sql='select * from department;'
    
        const result=await query(sql)
    
        // fs.writeFileSync(\'../../data/mysql.json',JSON.stringify(result))  错误
        // fs.writeFileSync(path.resolve(__dirname,'../../data/mysql.json'),JSON.stringify(result))

        ctx.body=result
    
    
    }

}

