/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-20 21:42:17
 * @Description: 百度翻译
 */

const service = require('../service/trans')

trans = async (department = null) => {


    diseases = await service.selectDisease(department)

    for (let [index, item] of diseases.entries()) {

        setTimeout(() => {
            console.log('---------------------------------')
             
            let chinese_name=item.name
            // chinese_name=item.chinese_name

            console.log(chinese_name)

            service.trans(chinese_name, 'zh', 'en').then(async res => {

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
        }, index * 1500); 

    }

}




module.exports = trans
