(function() {
  const fs = require("fs");

  // 读取流：fs.createReadStream();
  // 写入流：fs.createWriteStream();
  let rs = fs.createReadStream("text.txt"); // 要读取的文件
  let ws = fs.createWriteStream("aa.txt"); // 输出的文件

  rs.pipe(ws); // 用 pipe 将 rs 和 ws 衔接起来，将读取流的数据传到输出流（就是这么简单的一句话就能搞定）

  rs.on("error", err => {
    console.log(err);
  });
  ws.on("finish", () => {
    console.log("成功");
  });
})();
