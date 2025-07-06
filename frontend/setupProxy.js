const { createProxymiddleware } = require("http-proxy-middleware");

module.exports = function (root) {
  root.use(
    "/api",
    createProxymiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      secure: false,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
  );
};
