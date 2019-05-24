(function() {
  const querystring = require("querystring");

  // 形如这样的字符串就能被解析
  let query = "a=1&b=2&c=3";
  let obj = querystring.parse(query);
  console.log(obj, obj.a);

  // 如果参数重复，其所对应的值会变成数组
  query = "a=1&b=2&c=3&a=3";
  obj = querystring.parse(query);
  console.log(obj);

  // 相反的我们可以用 querystring.stringify() 把对象拼接成字符串
  query = querystring.stringify(obj);
  console.log(query);
})();
