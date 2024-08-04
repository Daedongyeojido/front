/* eslint-disable no-undef */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    //일단 user만
    '/user',
    createProxyMiddleware({
      target: 'https://jykim1428.pythonanywhere.com',
      changeOrigin: true,
    })
  );
};

