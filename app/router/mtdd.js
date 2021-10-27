/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-12 10:34:05
 * @LastEditTime: 2021-10-27 09:46:05
 * @LastEditors: Please set LastEditors
 * @Description: 中文医学知识图谱数据接口
 */

const Router = require('koa-router');

const router = new Router();

const mtdd=require('../controller/mtdd')

router.post("/", async (ctx) => {
    console.log('查询参数', ctx.query);
    ctx.body = '获取中文知识图谱';
})

router.get("/", mtdd.selectMydata)

 

module.exports = router;