const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();
const API_URL = process.env.API_URL || 'https://api.mydomain.com';

export default function (req, res, next) {
    console.log('>>>>>>>>>>>>>>>>>> serverMiddleware1 process.env.NODE_ENV:', process.env.NODE_ENV);
    // only proxy for development
    if (process.env.NODE_ENV === 'development') {
        console.log('serverMiddleware2 process.env.NODE_ENV:', process.env.NODE_ENV);
        proxy.web(req, res, {
            // referto nuxt.config.js
            // target: process.env.API_URL
            target: 'https://dev-api.baitsbite.com/api/v1/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    }
    // next();
}