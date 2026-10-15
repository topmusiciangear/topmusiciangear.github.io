const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const f = s.productTable.rows.find(r => r.label === 'Total');

f.values.forEach(v => {
  const n = Number(String(v.value).replace(/[^0-9]/g, ''));
  if (n > 999) {
    const miles = ','.repeat(1);
    v.value = '~$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, miles);
    v.value_es = '~$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
});
fs.writeFileSync(p, JSON.stringify(g, null, 2) + '\n', 'utf8');

f.values.forEach((v, i) => console.log('  col ' + (i + 1) + ':  EN "' + v.value + '"   ES "' + v.value_es + '"'));

const json = JSON.stringify(JSON.parse(fs.readFileSync(p, 'utf8')).find(x => x.id === 'starter-studio'));
const malos = [...json.matchAll(/[$£€][0-9]{4,}(?![0-9,.])/g)].map(m => m[0]);
console.log('\n  importes de 4+ digitos sin separador: ' + (malos.length ? malos.join(', ') : 'ninguno'));
