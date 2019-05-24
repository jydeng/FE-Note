(function() {
  const http = require("http");
  http
    .createServer((req, res) => {
      console.log("收到一个请求");
      res.write("hello world");
      res.end();
    })
    .listen(8888);
})();
