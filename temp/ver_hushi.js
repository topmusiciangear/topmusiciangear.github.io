const { execFileSync } = require('child_process');
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const U = 'https://m.media-amazon.com/images/I/61MX8mAxVfL._AC_SY879_.jpg';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';

const r = execFileSync('curl.exe', ['-s', '-L', '-o', OUT + 'hushi.jpg', '--max-time', '45',
  '-w', '%{http_code}|%{content_type}|%{size_download}', '-A', UA, U], { windowsHide: true }).toString();
const parts = r.split('|');
console.log('http: ' + parts[0] + '  tipo: ' + parts[1] + '  bytes: ' + parts[2]);

const b = fs.readFileSync(OUT + 'hushi.jpg');
let dims = null, i = 2;
while (i < b.length - 9) {
  if (b[i] !== 0xFF) { i++; continue; }
  const m = b[i + 1];
  if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
    dims = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) }; break;
  }
  i += 2 + b.readUInt16BE(i + 2);
}
const jpeg = b[0] === 0xFF && b[1] === 0xD8 && b[b.length - 2] === 0xFF && b[b.length - 1] === 0xD9;
console.log('jpeg integro: ' + (jpeg ? 'si' : 'NO') + '   dimensiones: ' + (dims ? dims.w + 'x' + dims.h : '?'));

const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const x = p.find(y => y.id === 270);
console.log('\n270 ' + x.title);
console.log('img actual: ' + x.img);
