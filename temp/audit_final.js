const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
const cols = g.productTable.columns.map(c => c.title);
const R = {}; g.productTable.rows.forEach(r => { R[r.label] = r; });

console.log('=== PRECIO TABLA vs CATALOGO ===');
const byId = {}; JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8')).forEach(p => byId[p.id] = p);
const IDS = [194, 195, 286, 299, 3, 666, 670, 252, 291, 276];
let mism = 0;
IDS.forEach((id, i) => {
  const cat = '$' + byId[id].price;
  const tab = R['Estimated Price'].values[i].value;
  const ok = tab.replace('~', '') === cat;
  if (!ok) mism++;
  console.log('  ' + (ok ? 'OK  ' : '[!!] ') + cols[i].padEnd(32) + ' tabla=' + tab.padEnd(10) + ' catalogo=' + cat);
});
console.log('  desajustes: ' + mism);

console.log('\n=== FILAS: celdas vacias / sin ES ===');
let empt = 0;
g.productTable.rows.forEach(r => {
  if (r.values.length !== 10) { console.log('  [!!] ' + r.label + ' tiene ' + r.values.length + ' valores'); empt++; }
  r.values.forEach((v, i) => {
    if (!v || !v.value) { console.log('  [!!] ' + r.label + ' col' + i + ' vacio'); empt++; }
    if (!v || !v.value_es) { console.log('  [!!] ' + r.label + ' col' + i + ' sin ES'); empt++; }
  });
});
console.log('  problemas: ' + empt);

console.log('\n=== VPC: reglas 4/4 y alineacion EN/ES ===');
let vpcBad = 0;
g.verdictProsCons.forEach((v, i) => {
  const p = v.pros.length, c = v.cons.length, pe = (v.pros_es || []).length, ce = (v.cons_es || []).length;
  const ok = p >= 4 && c >= 4 && p === pe && c === ce;
  if (!ok) vpcBad++;
  console.log('  ' + (ok ? 'OK  ' : '[!!] ') + 'VPC' + i + ' ' + v.name.padEnd(32) + ' pros ' + p + '/' + pe + '  cons ' + c + '/' + ce);
  // frases que empiezan mal
  [].concat(v.pros, v.cons, v.pros_es || [], v.cons_es || []).forEach(t => {
    if (/^\s*([-—–])/.test(t) || /^[\s]/.test(t) || /\$\s*\$/.test(t)) { console.log('       [!!] frase mal formada: ' + JSON.stringify(t.slice(0, 80))); vpcBad++; }
  });
});
console.log('  problemas: ' + vpcBad);

console.log('\n=== Menciones de productos en la guia (conclusion/verdict/intro/faqs) ===');
const prose = g.conclusion + g.conclusion_es + g.verdict + g.verdict_es + g.intro + g.intro_es +
  JSON.stringify(g.featuredSnippet) + g.sections.map(s => s.content + ' ' + s.content_es).join(' ');
const NAMES = ['MV7+', 'Wave:3', 'AT2040USB', 'Profile Streaming Set', 'NT1 5th Generation', 'NT-USB+', 'NEOM USB', 'PodMic USB', 'AT2020USB-X', 'Q2U'];
NAMES.forEach(n => {
  const c = (prose.match(new RegExp(n.replace(/[+]/g, '\\+'), 'g')) || []).length;
  console.log('  ' + n.padEnd(24) + ' ' + c + (c === 0 ? '   [!!] nunca se menciona en el texto' : ''));
});

console.log('\n=== FAQ respuestas: formato de precio (coma de miles) ===');
const badPrice = prose.match(/(?<![,\d])\$\d{4,}(?!\.|\d)/g);
console.log('  precios sin coma de miles: ' + (badPrice ? Array.from(new Set(badPrice)).join(', ') : 'ninguno'));

console.log('\n=== CONCLUSIONES: los 10 productos? ===');
[cols.forEach(c => {
  const c2 = c.replace(/Audio-Technica /, '');
  const en = new RegExp(c2.replace(/[+()]/g, m => '\\' + m)).test(g.conclusion);
  const es = new RegExp(c2.replace(/[+()]/g, m => '\\' + m)).test(g.conclusion_es);
  console.log('  ' + c.padEnd(32) + ' EN=' + (en ? 'si' : '[!!] no') + '  ES=' + (es ? 'si' : '[!!] no'));
}).join('')];

console.log('\n=== "nueve"/"ten"/"cinco" en texto ES (regla: sin cuentas de productos) ===');
const esAll = g.intro_es + g.conclusion_es + g.verdict_es + g.sections.map(s => s.content_es).join(' ') + g.productTable.rows.map(r => r.values.map(v => v.value_es).join(' ')).join(' ');
['cinco', 'cinco ', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'diez ', '10'].forEach(w => {
  const m = esAll.match(new RegExp('\\b' + w.trim() + '\\b', 'gi'));
  if (m) console.log('  "' + w.trim() + '": ' + m.length + ' -> ' + Array.from(new Set(m)).join(', '));
});
console.log('  (revisar que no cuenten productos)');

console.log('\n=== TITLE / TAG formato ES ===');
console.log('  title    : ' + g.title);
console.log('  title_es : ' + g.title_es);
console.log('  tag      : ' + g.titleTag);
console.log('  tag_es   : ' + g.titleTag_es);