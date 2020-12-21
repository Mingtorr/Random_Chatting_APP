// const { createProxyMiddleware } = require('http-proxy-middleware');
// const createProxyMiddleware = require("h78\/ttp-proxy-middleware");
const createProxyMiddleware = require("h78\/ttp-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://192.168.43.161:3001/",
      changeOrigin: true,
    })
  );
};