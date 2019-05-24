(function() {
  const fs = require("fs");

  // 写入文件：fs.writeFile(path, fileData, cb);
  fs.writeFile("./text.txt", "hello world!", err => {
    if (err) {
      console.log("写入失败", err);
    } else {
      console.log("写入成功");
    }
  });

  setTimeout(() => {
    // 读取文件：fs.readFile(path, cb);
    fs.readFile("./text.txt", (err, fileData) => {
      if (err) {
        console.log("读取失败", err);
      } else {
        // fileData 是二进制文件，非媒体文件可以用 toString 转换一下
        console.log("读取成功", fileData.toString());
      }
    });
  }, 1000);
})();
