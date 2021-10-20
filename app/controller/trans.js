/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-20 21:42:17
 * @Description: 百度翻译
 * @FilePath: /jh_mekg_api/app/controller/trans.js
 */

const service = require('../service/trans')

trans = async (department = null) => {


    diseases = await service.selectDisease(department)

    for (let [index, item] of diseases.entries()) {

        setTimeout(() => {
            console.log('---------------------------------')
            console.log(item.name)
            service.trans(item.name, 'zh', 'en').then(async res => {

                trans_result = res.data.trans_result

                if (trans_result) {
                    name_eng = trans_result[0].dst.trim()
                    await service.updateDiseaseTrans(item.id, name_eng)
                    console.log(name_eng)
                } else {
                    console.log(res.data)
                }
            }).catch(err => {
                console.error(err)
            })
        }, index * 1500); // 是网络状态而定，15足矣

    }

}




module.exports = trans