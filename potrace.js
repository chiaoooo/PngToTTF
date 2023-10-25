var potrace = require('potrace');
var fs = require('fs');
var path = require('path');
var ProgressBar = require('progress');

var inputDir = 'K:/myfont/your_png/';
var outputDir = 'K:/myfont/svg_separate/';

// 讀取資料夾中的所有檔案
fs.readdir(inputDir, function(err, files) {
  if (err) throw err;

  var pngFiles = files.filter(function(file) {
    return path.extname(file) === '.png';
  });

  var totalFiles = pngFiles.length;
  var progressBar = new ProgressBar('轉換進度 [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: totalFiles
  });

  var startTime = Date.now(); // 記錄開始時間

  // 定义一个处理文件的函数
  function processFile(index) {
    if (index < totalFiles) {
      var file = pngFiles[index];
      var pngFilePath = path.join(inputDir, file);
      var svgFileName = path.basename(file, '.png') + '.svg';
      var svgFilePath = path.join(outputDir, svgFileName);

      // 使用 potrace 來轉換 PNG 到 SVG
      potrace.trace(pngFilePath, function(err, svg) {
        if (err) throw err;
        fs.writeFileSync(svgFilePath, svg);

        // 更新進度條
        progressBar.tick();

        // 继续处理下一个文件
        processFile(index + 1);
      });
    } else {
      var endTime = Date.now(); // 記錄完成時間
      var elapsedTime = (endTime - startTime) / 1000; // 計算耗時（秒）
      console.log('轉換完成，共耗時:', elapsedTime.toFixed(2), '秒');
    }
  }

  // 开始处理第一个文件
  processFile(0);
});
