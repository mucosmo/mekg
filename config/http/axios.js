/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-10 10:19:43
 * @Description: 配置axios 请求体
 */


const axios = require('axios');
const url = require('./url')

let instance = axios.create({
    method:"get", // 默认 get
    baseURL: url.cmekg_baseurl,
    timeout: 10000,
    withCredentials: false,
    data: {},
    responseType: 'json',
    headers: { 
        get: { 'Content-Type': 'application/x-www-form-urlencoded' } 
    }
});


//请求中间件
instance.interceptors.request
    .use(function (config) {
        //   if (config.data) config.data.token = '' || sessionStorage.getItem('token')
        //   else config.data = {token: sessionStorage.getItem('token')}
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

//响应中间件
instance.interceptors.response
    .use(function (response) {
        //   if (response.data.res_code < 0) {
        //     let code = response.data.res_code;
        //     if (code >= -903 && code <= -900) {
        //       sessionStorage.clear();
        //       vm.$router.push({path: '/login'});
        //     }
        //   }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });






module.exports = instance
