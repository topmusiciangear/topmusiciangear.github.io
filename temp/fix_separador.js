const fs = require('fs');
const GF = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(GF, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const filaT = guia.productTable.rows.find(r => r.label === 'Total');

filaT.values.forEach((v, c) => {
  const n = Number(String(v.value).replace(/[^0-9]/g, ''));
  if (n > 999) {
    v.value = '~$' + n.toLocaleString('en-US');        // EN: coma de miles
    v.value_es = '~$' + n.toLocaleString('es-ES');       // ES: punto de miles
  }
  console.log('  col ' + (c + 1) + ': EN "' + v.value + '"  |  ES "' + v.value_es + '"');
});

fs.writeFileSync(GF, JSON.stringify(g, null, 2) + '\n', 'utf8');

// comprobar la regla en toda la guia: ningun importe de 4+ digitos sin separador
const json = JSON.stringify(g.find(x => x.id === 'starter-studio'));
const malos = [...json.matchAll(/[$£€][0-9]{4,}(?![0-9,.])/g)].map(m => m[0]);
console.log('\n  importes de 4+ digitos SIN separador: ' + (malos.length ? malos.join(', ') : 'ninguno'));
