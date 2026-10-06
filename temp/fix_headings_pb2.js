const fs = require('fs');
const pFile = 'temp/pb_verify_data.js';
let s = fs.readFileSync(pFile, 'utf8');
console.log('eol:', s.includes('\r\n') ? 'crlf' : 'lf');
const ADDED_FROM = "'551', '552', '553', '554'";
const ADDED_TO = "'551', '552', '553', '554', '555', '556', '557', '558', '559', '560', '561', '563', '564', '565', '566', '567', '568', '569', '570', '571', '572'";
if (!s.includes(ADDED_FROM) || s.includes("'555', '556'")) { console.log('ADDED_OK already patched or pattern missing'); }
else { s = s.replace(ADDED_FROM, ADDED_TO); console.log('ADDED_OK patched'); }

const marker410 = "'410': { 'prices.zzounds'";
if (s.includes(marker410)) console.log('410 already approved');
else {
  const anchor = "'480': { 'prices.gear4music'";
  const ai = s.indexOf(anchor);
  if (ai < 0) throw new Error('480 anchor not found');
  const eol = s.includes('\r\n') ? '\r\n' : '\n';
  const lineEnd = s.indexOf(eol, ai);
  if (lineEnd < 0) throw new Error('line end not found');
  const ins = eol + "  '410': { 'prices.zzounds': ['$1,499.00', '$999.00'], 'prices.gear4music': ['£719.00', '£730.00'] },";
  s = s.slice(0, lineEnd) + ins + s.slice(lineEnd);
  console.log('410 approved inserted');
}
fs.writeFileSync(pFile, s);
require(pFile.endsWith('.js') ? 'fs' : 'fs');
const t = fs.readFileSync(pFile, 'utf8');
if (!t.includes("ADDED_OK = ['518'")) throw new Error('ADDED_OK missing');
if (!t.includes("'572'")) throw new Error('572 not in ADDED_OK');
if (!t.includes(marker410)) throw new Error('410 not inserted');
console.log('OK: verify file updated');
