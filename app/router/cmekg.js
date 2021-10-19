/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-12 10:34:05
 * @LastEditTime: 2021-10-12 10:42:26
 * @LastEditors: mfuture@qq.com
 * @Description: 中文医学知识图谱数据接口
 * @FilePath: /cmekg_api/app/router/cmekg.js
 */

const Router = require('koa-router');

const router = new Router();

router.post("/", async (ctx) => {
    console.log('查询参数', ctx.query);
    ctx.body = '获取中文知识图谱';
})
.get("/", async (ctx) => {
    ctx.body = '获取中文知识图谱';
})
    .get("/:id", async (ctx) => {
        const { id } = ctx.params
        ctx.body = `获取id为${id}的用户`;
    })
 

module.exports = router;