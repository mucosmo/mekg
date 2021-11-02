/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-21 16:19:31
 * @Description: 代理ip
 */

const query = require('../../config/database/mysql')


module.exports = selectProxy = async () => {

    sql = `select * from ip_proxy where available=1`

    results = await query(sql)

    return results

}