/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-20 21:42:17
 * @Description: 百度翻译
 */

const service = require('../service/trans')


const IP_PROXY=[
    {ip:'124.70.46.14',port:'3128'},
    {ip:'182.84.144.218',port:'3256'},
    {ip:'220.181.111.37',port:'80'},
    {ip:'101.133.152.90',port:'7788'}
]

trans = async () => {


    diseases = await service.selectDisease()

    for (let [index, item] of diseases.entries()) {

        setTimeout(() => {
            console.log('---------------------------------')
             
            let chinese_name=item.name
            // chinese_name=item.chinese_name

            console.log(chinese_name)

            proxy=IP_PROXY[index % IP_PROXY.length]
 
            service.trans(chinese_name, 'zh', 'en',proxy).then(async res => {

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
        }, index * 1500); // 标准免费版 QPS=1 

    }

}
 



module.exports = trans
