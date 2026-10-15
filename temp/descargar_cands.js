const { execFileSync } = require('child_process');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';

function dl(url, name) {
  execFileSync('curl.exe', ['-s', '-L', '--max-time', '45', '-A', UA, '-o', OUT + name, url], { windowsHide: true });
  const b = fs.readFileSync(OUT + name);
  const esJpeg = b[0] === 0xFF && b[1] === 0xD8 && b[b.length - 2] === 0xFF && b[b.length - 1] === 0xD9;
  console.log(name.padEnd(22) + b.length + ' bytes   cabecera=' + b.slice(0, 4).toString('hex') +
    '   jpeg_integro=' + (esJpeg ? 'si' : 'NO/partial'));
  return OUT + name;
}

dl('https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg', 'keeley_zzounds.jpg');
dl('https://r2.gear4music.com/media/112/1126877/1200/preview.jpg', 'shure_mv6.jpg');
dl('https://static.flymusic.ro/img/p/1/0/0/8/2/4/100824-superlarge_default.jpg', 'sennheiser_mkh50.jpg');
