// const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://192.168.200.193:3001',
//       changeOrigin: true,
//     })
//   );
// };

const createProxyMiddleware = require("h78\/ttp-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    })
  );
};