/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 09:53:56
 * @Description: koa框架入口文件
 */


'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./app/router');


// const neo4j=require('./app/controller/neo4j.js')

const trans = require('./app/controller/trans')


 trans('fuke')





// //crawler图谱知识爬取
// const crawler = require('./app/controller/cmekgCrawler')
// crawler("药物")

return

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