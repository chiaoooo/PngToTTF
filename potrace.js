const potrace = require("potrace");
const fs = require("fs");
const path = require("path");
const ProgressBar = require("progress");
const inputDir = path.join(__dirname, "crop_v5");
const outputDir = path.join(__dirname, "svg_separate");

// 讀取資料夾中的所有檔案
fs.readdir(inputDir, function (err, files) {
  if (err) throw err;

  const pngFiles = files.filter(function (file) {
    return path.extname(file) === ".png";
  });

  const totalFiles = pngFiles.length;
  const progressBar = new ProgressBar("轉換進度 [:bar] :percent :etas", {
    complete: "=",
    incomplete: " ",
    width: 50,
    total: totalFiles,
  });

  const startTime = Date.now(); // 記錄開始時間

  function processFile(index) {
    if (index < totalFiles) {
      const file = pngFiles[index];
      const pngFilePath = path.join(inputDir, file);
      const svgFileName = path.basename(file, ".png") + ".svg";
      const svgFilePath = path.join(outputDir, svgFileName);

      // 使用 potrace 來轉換 PNG 到 SVG
      potrace.trace(pngFilePath, function (err, svg) {
        if (err) throw err;
        fs.writeFileSync(svgFilePath, svg);

        // 更新進度條
        progressBar.tick();

        // 继续处理下一个文件
        processFile(index + 1);
      });
    } else {
      const endTime = Date.now(); // 記錄完成時間
      const elapsedTime = (endTime - startTime) / 1000; // 計算耗時（秒）
      console.log("轉換完成，共耗時:", elapsedTime.toFixed(2), "秒");
    }
  }

  processFile(0);
});
