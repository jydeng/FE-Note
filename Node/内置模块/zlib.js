(function() {
  const fs = require("fs");
  const zlib = require("zlib");

  let rs = fs.createReadStream("text.txt");
  let gz = zlib.createGzip();
  let ws = fs.createWriteStream("text.txt.gz");

  rs.pipe(gz).pipe(ws); // 原始文件 => 压缩 => 写入

  rs.on("error", err => {
    console.log(err);
  });
  ws.on("finish", () => {
    console.log("成功");
  });
})();
