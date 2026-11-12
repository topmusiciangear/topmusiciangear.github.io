const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// Buscar el texto exacto
const old = '"val2": "24.75\\"';
const new_ = '"val2": "22.8\\"';
const count = (t.match(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log('Occurrences of val2 24.75:', count);

// Reemplazar solo las que están en contexto de Enya
// Por ahora, reemplazar todas (puede haber falsos positivos)
if (t.includes(old)) {
  t = t.split(old).join(new_);
  console.log('Replaced val2 24.75 -> 22.8');
} else {
  console.log('NOT FOUND');
}

// También en value_es
const old2 = '"val2_es": "24.75\\"';
const new2 = '"val2_es": "22.8\\"';
if (t.includes(old2)) {
  t = t.split(old2).join(new2);
  console.log('Replaced val2_es 24.75 -> 22.8');
} else {
  console.log('val2_es NOT FOUND');
}

try { JSON.parse(t); console.log('JSON parse OK'); } catch(e) { console.error('JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('data/guides.json actualizado');
