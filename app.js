/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 09:53:56
 * @Description: koa框架入口文件
 */


'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./app/router');
const process=require('process')


// arangodb 数据库
const adb=require('./app/controller/arangodb')
// adb.createCol('dev','disease','fuke')


adb.createCmekg('dev')


// 百度接口翻译英文名词
// require('./app/controller/trans')();


// crawler图谱知识爬取
// const kg=require('./app/controller/cmekg')
// kg("icd10")

// 对cmekg原始数据进一步加工
const cmekgProcess=require('./app/controller/dataProcess/cmekgProcess')
// cmekgProcess()


process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack)

    process.exit(1)
});

 
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