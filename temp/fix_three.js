const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/three_reviews.js';
let s = fs.readFileSync(f, 'utf8');
const fixes = [
  ['Adirondack-router-kineticamente', 'Adirondack Lovelymente'],
  ['satisfy', 'satisfacen'],
  ['satisface', 'satisfacen'],
  ['guitars de esta lista', 'guitarras de esta lista'],
  ['más rápida', 'más rápida'],
  ['lo Finding igualmente', 'lo encuentra igualmente'],
  ['conectado', 'conectado'],
  ['PersIGOirás', 'perseguirás'],
  ['RevolutionOXOX', 'Revolution,OXOX'],
  ['Rode RevolutionOXOX', 'Rode Revolution'],
  ['a16 bits', 'a 16 bits'],
  ['a16 bits', 'a 16 bits'],
  ['LaKX', 'La'],
  ['a16', 'a 16'],
  ['un árbol', 'una caja'],
  ['viene siendo', 'viene'],
  ['a16 bits', 'a 16 bits'],
  ['a16 bits', 'a 16 bits'],
  ['Revolución', 'Revolution'],
  ['que（在', 'que en'],
  ['a seis metros', 'a seis metros'],
  ['más rápida', 'más rápida'],
  ['Lo que consigues', 'Lo que consigues'],
  ['张', '']
];
let n = 0;
fixes.forEach(([a, b]) => { if (a !== b && s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(f, s, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('fixes: ' + n);
console.log('CJK: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
// reportar cualquier token ASCII-adjunto sospechoso en los textos ES
const odd = s.match(/\b[a-zA-Z\u00C0-\u017F]{2,}\b(?=\s|$)/g) || [];
const suspects = ['RevolutionOXOX', 'PersIGOirás', 'Finding', 'routers', 'Lovelymente', 'guitars', 'satisfy', 'cajas'];
suspects.forEach(w => { if (s.includes(w)) console.log('!! queda: ' + w + ' x' + (s.split(w).length - 1)); });