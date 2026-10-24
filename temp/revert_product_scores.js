// Revierte los scores globales de products.json a sus valores originales (solo los 11 tocados).
// Los scores finales del usuario quedan SOLO en la guía (score_overrides.js → GUIDE_SCORES).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const backupDir = B + 'temp/smallrooms_fix/';
fs.mkdirSync(backupDir, { recursive: true });
fs.copyFileSync(B + 'data/products.json', backupDir + 'products.before.json');
fs.copyFileSync(B + 'data/guides.json', backupDir + 'guides.before.json');
console.log('backups written to temp/smallrooms_fix/');

let raw = fs.readFileSync(B + 'data/products.json', 'utf8');
const origLen = raw.length;

// [id, scoreActual, scoreOriginal]
const reverts = [
  [116, '8.7', '9.2'],   // JBL 305P MkII
  [303, '9.4', '9.5'],   // Genelec 8010A
  [305, '9.8', '9.7'],   // Neumann KH 80 DSP
  [306, '8.9', '9'],     // ADAM Audio D3V
  [307, '8.9', '9'],     // Kali Audio LP-UNF
  [308, '9.3', '9.2'],   // IK Multimedia iLoud MTM MKII
  [371, '8.6', '8.9'],   // ADAM Audio T5V
  [372, '9.0', '9.8'],   // Genelec 8030C
  [632, '8.4', '8.9'],   // Yamaha HS5
  [633, '9.2', '8.7'],   // KRK Rokit 5 G5
  [684, '8.8', '8.9']    // PreSonus Eris Studio 5
];

let changes = 0;
reverts.forEach(([id, oldS, newS]) => {
  const idRe = new RegExp('"id": ' + id + '[,\\n]');
  const m = idRe.exec(raw);
  if (!m) throw new Error('producto no encontrado: ' + id);
  const from = m.index;
  const nextId = raw.indexOf('"id":', from + 5);
  const segEnd = nextId === -1 ? raw.length : nextId;
  const seg = raw.slice(from, segEnd);
  const esc = oldS.replace('.', '\\.');
  const scoreRe = new RegExp('("score": )' + esc + '([,\\n])');
  if (!scoreRe.test(seg)) throw new Error('score ' + oldS + ' no encontrado en producto ' + id + ' | contexto: ' + seg.slice(0, 160));
  const fixed = seg.replace(scoreRe, '$1' + newS + '$2');
  raw = raw.slice(0, from) + fixed + raw.slice(segEnd);
  changes++;
  console.log('revertido id ' + id + ': ' + oldS + ' → ' + newS);
});

// validación: JSON válido, longitud idéntica (solo cambian dígitos), scores finales correctos
const parsed = JSON.parse(raw);
const byId = {};
parsed.forEach(p => { byId[p.id] = p.score; });
const expect = { 116: '9.2', 302: 9.6, 303: '9.5', 305: '9.7', 306: 9, 307: 9, 308: '9.2', 371: '8.9', 372: '9.8', 632: '8.9', 633: '8.7', 684: '8.9', 117: 9.5 };
let ok = true;
Object.keys(expect).forEach(id => {
  const got = String(byId[id]);
  const want = String(expect[id]);
  if (got !== want) { console.log('MISMATCH id ' + id + ': ' + got + ' != ' + want); ok = false; }
});
if (raw.length !== origLen) { console.log('AVISO: longitud cambió', origLen, '→', raw.length); }
if (!ok) throw new Error('validación de scores falló');

fs.writeFileSync(B + 'data/products.json', raw);
console.log('OK: ' + changes + ' scores revertidos y verificados en data/products.json');
