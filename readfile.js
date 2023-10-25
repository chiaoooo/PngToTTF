const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const fs = require('graceful-fs');
const path = require('path');
const ProgressBar = require('progress');

const fontName = 'MyFont';
const outputSVGFontPath = 'final_font/fontpico.svg'; // 輸出SVG字體的路徑
const inputFolder = 'pico'; // 包含SVG檔案的資料夾路徑

const fontStream = new SVGIcons2SVGFontStream({
  fontName: fontName,
});

const files = fs.readdirSync(inputFolder);

const progressBar = new ProgressBar('[:bar] :percent :etas', {
  total: files.length,
  width: 40,
});

console.time('Font Generation Time');

fontStream
  .pipe(fs.createWriteStream(outputSVGFontPath))
  .on('finish', function () {
    console.log('\nFont successfully created!');
    console.timeEnd('Font Generation Time');
  })
  .on('error', function (err) {
    console.error(err);
  });

files.forEach((file) => {
  if (path.extname(file) === '.svg') {
    // 從檔名中提取Unicode
    const unicodeMatch = file.match(/U\+([0-9A-Fa-f]+)/);
    if (unicodeMatch) {
      const unicode = [String.fromCodePoint(parseInt(unicodeMatch[1], 16))];
      const name = 'icon_' + unicodeMatch[1]; // 使用Unicode的十六進位表示作為名稱
      const glyph = fs.createReadStream(path.join(inputFolder, file));
      glyph.metadata = { unicode, name };
      fontStream.write(glyph);
    }
  }
  progressBar.tick();
});

// 結束流
fontStream.end();
