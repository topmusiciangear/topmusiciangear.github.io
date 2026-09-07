const fs = require('fs');
let s = fs.readFileSync('js/app.min.js', 'utf8').replace(/^\uFEFF/, '').replace(/\uFEFF$/, '');
const cp1252 = {
  '0x20AC':0x80,'0x201A':0x82,'0x0192':0x83,'0x201E':0x84,'0x2026':0x85,'0x2020':0x86,'0x2021':0x87,
  '0x02C6':0x88,'0x2030':0x89,'0x0160':0x8A,'0x2039':0x8B,'0x0152':0x8C,'0x017D':0x8E,
  '0x2018':0x91,'0x2019':0x92,'0x201C':0x93,'0x201D':0x94,'0x2022':0x95,'0x2013':0x96,'0x2014':0x97,
  '0x02DC':0x98,'0x2122':0x99,'0x0161':0x9A,'0x203A':0x9B,'0x0153':0x9C,'0x017E':0x9E,'0x0178':0x9F
};
const map = {};
for (const k of Object.keys(cp1252)) map[String.fromCodePoint(parseInt(k, 16))] = cp1252[k];
let hi = 0; const bad = [];
for (const ch of s) { const c = ch.codePointAt(0); if (c > 0xFF) { hi++; if (!(ch in map)) bad.push('U+' + c.toString(16).toUpperCase()); } }
console.log('after BOM strip — chars>0xFF:', hi, '| bad:', bad.join(' ') || 'none');
const bytes = Buffer.from([...s].map(ch => ch in map ? map[ch] : (ch.codePointAt(0) & 0xFF)));
const repaired = bytes.toString('utf8');
try { new Function(repaired); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX FAIL', e.message); }
console.log('samples:', JSON.stringify(repaired.slice(repaired.indexOf('está') - 12, repaired.indexOf('está') + 30)));
console.log('   … present:', /…/.test(repaired), '| “ present:', /“/.test(repaired), '| — present:', /—/.test(repaired));
fs.writeFileSync('temp/_appmin_repaired.js', repaired);
console.log('wrote', Buffer.byteLength(repaired, 'utf8'), 'bytes');