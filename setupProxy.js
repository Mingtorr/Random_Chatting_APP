// const { createProxyMiddleware } = require('http-proxy-middleware');
<<<<<<< HEAD
// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://192.168.200.193:3001',
//       changeOrigin: true,
//     })
//   );
// };

=======
// const createProxyMiddleware = require("h78\/ttp-proxy-middleware");
>>>>>>> won
const createProxyMiddleware = require("h78\/ttp-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
<<<<<<< HEAD
      target: "http://localhost:3001/",
=======
      target: "http://192.168.43.161:3001/",
>>>>>>> won
      changeOrigin: true,
    })
  );
};