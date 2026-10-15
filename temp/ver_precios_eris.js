const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function get(u) { return execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-A', UA, u], { windowsHide: true, maxBuffer: 1 << 27 }).toString(); }
function code(u) { return execFileSync('curl.exe', ['-s', '-L', '-o', 'NUL', '--max-time', '50', '-w', '%{http_code}', '-A', UA, u], { windowsHide: true }).toString(); }

console.log('=== 1) zZounds: ¿existe la ficha? ===');
const zz = 'https://www.zzounds.com/item--PRSERISSTUDIO5?siid=340511';
const h = get(zz);
const c = code(zz);
console.log('  http ' + c + '   (' + h.length + ' bytes)');
console.log('  nombre en la pagina: ' + (((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').trim().slice(0, 90)));
const hayEris = /Eris Studio 5/i.test(h);
console.log('  menciona "Eris Studio 5": ' + (hayEris ? 'SI' : 'NO'));
console.log('  es pagina de error      : ' + (/not found|404|no longer available|sorry/i.test(h) ? 'POSIBLE ERROR' : 'no parece error'));

// precio
const precios = [...new Set([...h.matchAll(/\$\s?([0-9]{2,4}(?:\.[0-9]{2})?)/g)].map(m => m[0].trim()))];
console.log('  importes $ hallados: ' + (precios.length ? precios.slice(0, 12).join(' | ') : '(ninguno)'));
const usd = [...new Set([...h.matchAll(/data-price-amount="([0-9.]+)"|itemprop="price"[^>]*content="([0-9.]+)"|"price"\s*:\s*"?([0-9.]+)"?/g)].map(m => m[1] || m[2] || m[3]))];
if (usd.length) console.log('  precio estructurado : ' + [...new Set(usd)].slice(0, 8).join(' | '));
const eur = [...new Set([...h.matchAll(/€\s?([0-9]{2,4}(?:[.,][0-9]{2})?)/g)].map(m => m[0].trim()))];
if (eur.length) console.log('  importes € hallados : ' + eur.slice(0, 8).join(' | '));

console.log('\n=== 2) Gear4Music £115 ===');
try {
  const g = get('https://www.gear4music.de/en/Recording-and-Computers/PreSonus-Eris-Studio-5/5S8A');
  const j = [...new Set([...g.matchAll(/£\s?([0-9]{2,4}(?:\.[0-9]{2})?)/g)].map(m => m[0].replace(/\s/g, '')))];
  console.log('  http ' + code('https://www.gear4music.de/en/Recording-and-Computers/PreSonus-Eris-Studio-5/5S8A'));
  console.log('  importes £: ' + (j.length ? j.slice(0, 12).join(' | ') : '(ninguno)'));
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== 3) Music Store €138 ===');
try {
  const ms = get('https://www.musicstore.com/en_OE/EUR/PreSonus-Eris-Studio-5/art-REC0016445-000');
  const e2 = [...new Set([...ms.matchAll(/€\s?([0-9]{2,4}(?:[.,][0-9]{2})?)/g)].map(m => m[0].replace(/\s/g, '')))];
  console.log('  http ' + code('https://www.musicstore.com/en_OE/EUR/PreSonus-Eris-Studio-5/art-REC0016445-000'));
  console.log('  importes €: ' + (e2.length ? e2.slice(0, 12).join(' | ') : '(ninguno)'));
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== 4) Amazon $150 ===');
try {
  const az = get('https://www.amazon.com/dp/B0C88X4VB4');
  const dol = [...new Set([...az.matchAll(/\$\s?([0-9]{2,4}\.[0-9]{2})/g)].map(m => m[0].replace(/\s/g, '')))];
  console.log('  http ' + code('https://www.amazon.com/dp/B0C88X4VB4'));
  console.log('  importes $: ' + (dol.length ? dol.slice(0, 12).join(' | ') : '(ninguno)'));
} catch (e) { console.log('  error: ' + e.message); }
