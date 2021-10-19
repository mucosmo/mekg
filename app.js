/*
 * @Author: mfuture@qq.com 
 * @Date: 2021-10-10 12:07:18 
 * @Last Modified by: mfuture@qq.com
 * @Last Modified time: 2021-10-11 07:19:27
 */

'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./app/router');


const noe4j=require('./config/neo4j/local')

return 

//crawler图谱知识爬取
const crawler = require('./app/lib/request')
crawler("药物")

//路由中间件
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
app.listen(3300, () => {
    console.log('App is listening to http://localhost:3300');
})