const { execFileSync } = require('child_process');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';
const U = 'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg';

function dims(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC)
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const r = execFileSync('curl.exe', ['-s', '-L', '-o', OUT + 'at875r.jpg', '--max-time', '45',
  '-w', '%{http_code}|%{content_type}|%{size_download}', '-A', UA, U], { windowsHide: true }).toString();
const [c, t, s] = r.split('|');
const b = fs.readFileSync(OUT + 'at875r.jpg');
const d = dims(b);
const jpeg = b[0] === 0xFF && b[1] === 0xD8 && b[b.length - 2] === 0xFF && b[b.length - 1] === 0xD9;

console.log('  http      : ' + c);
console.log('  tipo      : ' + t + '   ' + (String(c).startsWith('2') && /^image\//i.test(t) ? 'OK' : 'MAL'));
console.log('  bytes     : ' + s);
console.log('  cabecera  : ' + b.slice(0, 4).toString('hex') + (jpeg ? '  (JPEG integro)' : '  (RARO/roto)'));
console.log('  dimensiones: ' + (d ? d.w + ' x ' + d.h + '   ratio ' + (d.w / d.h).toFixed(3) + (d.h > d.w ? '  (vertical)' : d.w > d.h ? '  (horizontal)' : '  (cuadrada)') : '?'));

// ficha actual
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const x = p.find(y => y.id === 358);
console.log('\n  ficha 358 ' + x.title);
console.log('  img actual: ' + x.img);
