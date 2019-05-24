(function() {
  const path = require("path");

  let str = "D:/FE-Note/txt.txt";
  // 取出路径
  console.log(path.dirname(str));
  // 取出后缀名
  console.log(path.extname(str));
  // 取出文件名
  console.log(path.basename(str));

  // 拼凑路径
  let pathOne = path.resolve("D:/", "FE-Note", "txt.txt");
  console.log(pathOne);

  // 绝对路径，相对于当前目录的
  let pathTwo = path.resolve(__dirname, "test");
  console.log(pathTwo);
})();
