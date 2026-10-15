const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const fila = guia.productTable.rows.find(r => r.label === 'Estimated Cost');

fila.values.forEach(v => {
  const n = Number(String(v.value).replace(/[^0-9]/g, ''));
  const en = n.toLocaleString('en-US');
  const es = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  v.value = '~$' + en;
  v.value_es = '~$' + es;
});
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

fila.values.forEach((v, i) => console.log('  col ' + (i + 1) + ':  EN "' + v.value + '"   ES "' + v.value_es + '"'));

// comprobar que la prosa usa los mismos numeros
const t = JSON.stringify(guia);
console.log('\n=== los numeros en toda la guia ===');
['$998', '$1,077', '$2,537', '$1.077', '$2.537'].forEach(p => {
  const n = (t.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log('  ' + String(n).padStart(3) + 'x  ' + p);
});
console.log('\n=== restos de los totales anteriores ===');
['$1,003', '$1,113', '$1,393', '$1.003', '$1.113', '$1.393', '$1,223', '$1.223'].forEach(p => {
  const n = (t.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n) console.log('  RESTA x' + n + '  ' + p);
});
console.log('\n  4+ digitos sin separador: ' + ([...t.matchAll(/[$£€][0-9]{4,}(?![0-9,.])/g)].map(m => m[0]).join(', ') || 'ninguno'));
