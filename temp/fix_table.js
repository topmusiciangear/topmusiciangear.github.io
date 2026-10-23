const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// 1. Corregir nombres de columnas (agregar Kali Audio)
g.productTable.columns = g.productTable.columns.map(col => {
  if (col.title === ' LP-6 V2') { col.title = 'Kali Audio LP-6 V2'; col.title_es = 'Kali Audio LP-6 V2'; }
  if (col.title === ' IN-8 V2') { col.title = 'Kali Audio IN-8 V2'; col.title_es = 'Kali Audio IN-8 V2'; }
  if (col.title === ' IN-UNF') { col.title = 'Kali Audio IN-UNF'; col.title_es = 'Kali Audio IN-UNF'; }
  if (col.title === ' LP-UNF') { col.title = 'Kali Audio LP-UNF'; col.title_es = 'Kali Audio LP-UNF'; }
  return col;
});

// 2. Corregir Row 2 - Woofer
g.productTable.rows[2].values[10].value = '4.5"';
g.productTable.rows[2].values[10].value_es = '4,5"';
g.productTable.rows[2].values[11].value = '6.5" Flax cone';
g.productTable.rows[2].values[11].value_es = '6,5" cono Flax';

// 3. Corregir Row 3 - Tweeter Focal
g.productTable.rows[3].values[11].value = '1" inverted dome';
g.productTable.rows[3].values[11].value_es = '1" cupula invertida';

// 4. Corregir Row 4 - Power
g.productTable.rows[4].values[10].value = '80W Class D';
g.productTable.rows[4].values[10].value_es = '80W Clase D';
g.productTable.rows[4].values[11].value = '105W (80W LF + 25W HF) Class AB';
g.productTable.rows[4].values[11].value_es = '105W (80W LF + 25W HF) Clase AB';

// 5. Corregir Row 6 - Max SPL Yamaha HS8
g.productTable.rows[6].values[3].value = '110 dB';
g.productTable.rows[6].values[3].value_es = '110 dB';

// 6. Corregir Row 7 - Dimensions
g.productTable.rows[7].values[10].value = '16.4 x 12.4 x 20.3 cm';
g.productTable.rows[7].values[10].value_es = '16,4 x 12,4 x 20,3 cm';
g.productTable.rows[7].values[11].value = '33 x 21 x 27 cm';
g.productTable.rows[7].values[11].value_es = '33 x 21 x 27 cm';

// 7. IN-UNF Type
g.productTable.rows[1].values[9].value = '3-piece system (sub + 2 satellites)';
g.productTable.rows[1].values[9].value_es = 'Sistema 3-piezas (sub + 2 satelites)';

// 8. IN-UNF Woofer
g.productTable.rows[2].values[9].value = '5.25" subwoofer + 2 x 3.5" satellite woofers';
g.productTable.rows[2].values[9].value_es = '5,25" subwoofer + 2 x 3,5" woofers satelites';

// 9. IN-UNF Power
g.productTable.rows[4].values[9].value = '100W (sub) + 2 x 20W (satellites) Class D';
g.productTable.rows[4].values[9].value_es = '100W (sub) + 2 x 20W (satelites) Clase D';

// 10. IN-UNF Dimensions
g.productTable.rows[7].values[9].value = 'Sub: 24 x 19 x 24 cm, Sat: 12 x 8 x 11 cm each';
g.productTable.rows[7].values[9].value_es = 'Sub: 24 x 19 x 24 cm, Sat: 12 x 8 x 11 cm c/u';

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Tabla corregida completamente con nombres Kali y specs correctas');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('Columnas:', g2.productTable.columns.map(c => c.title).join(' | '));
console.log('');
g2.productTable.rows.forEach((row, i) => {
  const label = row.label || row.label_es || '';
  const vals = row.values.map(v => v.value_es || v.value || '').join(' | ');
  console.log(i + ': ' + label + ' | ' + vals);
});