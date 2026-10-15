const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const g = guides.find(x => x.id === 'yamaha-mg-vs-behringer-xenyx');
const c = g.comparison;
console.log('### ' + g.title);
console.log('headers (' + c.headers.length + '): ' + JSON.stringify(c.headers));
console.log('\nTODAS LAS FILAS con sus 2 valores:');
c.rows.forEach((r, i) => {
  const v1 = r.val !== undefined ? r.val : '(SIN val)';
  const v2 = r.val2 !== undefined ? r.val2 : '(SIN val2)';
  console.log('\n  [' + i + '] ' + r.label + ' / ' + r.label_es);
  console.log('      val1 = ' + JSON.stringify(v1));
  console.log('      val2 = ' + JSON.stringify(v2));
  console.log('      val1_es = ' + JSON.stringify(r.val_es));
  console.log('      val2_es = ' + JSON.stringify(r.val2_es));
});

// celdas vacias o ausentes
console.log('\n\n=== CELDAS VACIAS O AUSENTES ===');
c.rows.forEach((r, i) => {
  ['val','val2'].forEach((k, j) => {
    const v = r[k];
    const quien = j === 0 ? c.headers[0] : c.headers[1];
    if (v === undefined) console.log('  fila "' + r.label + '" x ' + quien + ': SIN VALOR');
    else if (v === null) console.log('  fila "' + r.label + '" x ' + quien + ': null');
    else if (String(v).trim() === '') console.log('  fila "' + r.label + '" x ' + quien + ': VACIA ("' + v + '")');
    else if (String(v).trim() === '-' || String(v).trim() === '—') console.log('  fila "' + r.label + '" x ' + quien + ': guion (' + v + ')');
  });
});