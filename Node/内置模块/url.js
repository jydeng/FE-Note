(function() {
  const url = require("url");

  let site = "http://www.baidu.com/a/b/index.html?a=1&b=2";
  // url.parse() 解析网址，true 的意思是把参数解析成对象
  let { pathname, query } = url.parse(site, true);

  console.log(pathname, query);
})();
