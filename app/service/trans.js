/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-20 21:41:29
 * @Description: 百度翻译api
 */

const md5 = require('md5')
const axios = require('../../config/http/axios')
const query = require('../../config/database/mysql')


const constants=require('../../config/constants.js')

const appid = constants.BAIDU_TRANS_API.APPID
const key = constants.BAIDU_TRANS_API.KEY

const salt = 'sasq34rtgds'
const baseURL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'


module.exports = {

    // 翻译
    trans: async (txt, from, to,proxy) => {

        return new Promise((resolve, reject) => {
            axios({
                baseURL: baseURL,
                // proxy: {
                //     host: proxy.ip,     
                //     port: proxy.port   
                //     },
                params: {
                    q: txt,
                    from: from,
                    to: to,
                    appid: appid,
                    salt: salt,
                    sign: md5(appid + txt + salt + key)
                }
            }).then(res => {
                return resolve(res)
            }).catch(err => {
                return reject(err)
            })
        })

    },

    // 选择疾病
    selectDisease: async (department = null) => {

        let sql= `select id, \`name\` from disease where name_eng is null;`
        //  sql = `select id, chinese_name from department`
        

        results = await query(sql)

        return results


    },


    // 更新英文名
    updateDiseaseTrans: async (id = -1, engTrans = null) => {

        let sql=`update disease set name_eng= \"${engTrans}\" where id = ${id} ` 

        //  sql = `update department set english_name="${engTrans}" where id = ${id}`

        await query(sql)

    }


}

