/*
 * @Author: mfuture@qq.com 
 * @Date: 2021-10-10 12:07:18 
 * @Last Modified by: mfuture@qq.com
 * @Last Modified time: 2021-10-10 22:43:44
 */

'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./app/router');

//cmgk图谱知识爬取
const cmgk=require('./app/lib/request')
cmgk("症状")

//路由中间件
app.use(async (ctx, next) => {
console.log(`${ctx.request.method} ${ctx.request.url}`);
await next();
});
 
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务监听本地3000端口
app.listen(3000, () => {
    console.log('App is listening to http://localhost:3000');
})