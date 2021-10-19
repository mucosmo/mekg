/*
 * @Author: mfuture@qq.com 
 * @Date: 2021-10-10 12:08:44 
 * @Last Modified by:   mfuture@qq.com 
 * @Last Modified time: 2021-10-10 12:08:44 
 */

// 全局 routes 入口

const Router = require('koa-router');
const user = require('./user');
const cmekg = require('./cmekg');

const router = new Router();

// 指定一个url匹配
router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1> 全局 routes 入口</h1>';
})

router.use('/user', user.routes(), user.allowedMethods());
router.use('/cmekg', cmekg.routes(), cmekg.allowedMethods());

module.exports = router;