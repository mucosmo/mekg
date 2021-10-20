/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-20 21:41:29
 * @Description: 百度翻译api
 * @FilePath: /jh_mekg_api/app/service/trans.js
 */

const md5 = require('md5')
const axios = require('../../config/http/axios')
const query = require('../../config/mysql/local')

const appid = '20190911000333757'
const key = 'LK3pBIW7x4ZFZD_Z_c7n'
const salt = 'sasq34rtgds'
const baseURL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'


module.exports = {

    // 翻译
    trans: async (txt, from, to) => {

        return new Promise((resolve, reject) => {
            axios({
                baseURL: baseURL,
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

        let sql= `select id, \`name\` from disease where department = '${department}'`

        results = await query(sql)

        return results

    },


    // 更新英文名
    updateDiseaseTrans: async (id = -1, engTrans = null) => {

        await query(`update disease set name_eng= "${engTrans}" where id = ${id} `)

    }


}
