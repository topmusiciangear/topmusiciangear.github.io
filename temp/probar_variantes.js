const { execFileSync } = require('child_process');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';
const HASH = 'SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg';
const BASE = 'https://cf1.zzounds.com/media/productmedia/';

// Leer dimensiones de un JPEG
function dims(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const variantes = [
  'fit,1200by1200/quality,85/' + HASH,
  'fill,1200by1200/quality,85/' + HASH,
  'fit,1000by1000/quality,85/' + HASH,
  'fit,1200by900/quality,85/' + HASH
];

variantes.forEach(v => {
  const u = BASE + v;
  const f = OUT + 'v_' + v.split('/')[0].replace(/,/g, '_') + '.jpg';
  try {
    execFileSync('curl.exe', ['-s', '-L', '--max-time', '40', '-A', UA, '-o', f, u], { windowsHide: true });
    const b = fs.readFileSync(f);
    const d = dims(b);
    const esJpeg = b[0] === 0xFF && b[1] === 0xD8;
    console.log('  ' + (esJpeg ? 'OK  ' : 'MAL ') + (d ? d.w + 'x' + d.h : '?').padEnd(12) +
      (b.length + 'b').padEnd(10) + v.split('/')[0]);
  } catch (e) { console.log('  ERR  ' + v); }
});
