const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const T = g.productTable;

// Eliminar fila 0 (Precio)
T.rows.shift();

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('Fila de precio eliminada. Filas restantes:');
T.rows.forEach((r, i) => console.log('  ' + i + ': ' + r.label_es));