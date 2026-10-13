const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(44) + (extra || '')); };

console.log('=== ESTRUCTURA ===');
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
ck('16 filas x 10 columnas', g.productTable.rows.length === 16 && g.productTable.rows.every(r => r.values.length === 10));
ck('10 columnas', g.productTable.columns.length === 10);
ck('sin celdas vacias', g.productTable.rows.every(r => r.values.every(v => v.value && v.value_es)));
ck('eliminada Signal-to-Noise Ratio', !g.productTable.rows.some(r => r.label === 'Signal-to-Noise Ratio'));
ck('eliminada THD at Max SPL', !g.productTable.rows.some(r => /THD/i.test(r.label)));
ck('eliminada Dynamic Range', !g.productTable.rows.some(r => r.label === 'Dynamic Range'));
ck('anadida Headphone Monitoring', g.productTable.rows.some(r => r.label === 'Headphone Monitoring'));
ck('anadida Bit Depth / Sample Rate', g.productTable.rows.some(r => /Bit Depth/.test(r.label)));

let blanks = 0, total = 0;
g.productTable.rows.forEach(r => r.values.forEach(v => { total++; if (/^Not published|^No publicada/i.test((v.value || '').trim())) blanks++; }));
console.log('  celdas sin dato: ' + blanks + '/' + total + ' (' + Math.round(blanks / total * 100) + '%)   [antes 41/180 = 23%]');

console.log('\n=== RELLENADOS DE HOY ===');
const W = g.productTable.rows.find(r => r.label === 'Weight');
ck('MV7+ peso 574 g (ficha Shure)', W.values[0].value === '574 g', W.values[0].value);
const B = g.productTable.rows.find(r => /Bit Depth/.test(r.label));
ck('AT2040USB 16 o 24 bits', /16 or 24-bit/.test(B.values[2].value), B.values[2].value);
ck('AT2040USB 16 o 24 bits ES', /16 o 24 bits/.test(B.values[2].value_es), B.values[2].value_es);
const P = g.productTable.rows.find(r => /Pad &/.test(r.label));
ck('AT2040USB 18 dB/octave', /18 dB\/octave/.test(P.values[2].value), P.values[2].value);

console.log('\n=== HTML GENERADO ===');
['guides/usb-mics.html', 'guides/usb-mics_es.html'].forEach(function (f) {
  const h = fs.readFileSync(BASE + f, 'utf8');
  // Anclar en la etiqueta <table>, NO en "guide-comp-table" (que tambien aparece
  // en el bloque CSS y hace que el regex arrastre >100.000 caracteres).
  const tbl = (h.match(/<table[^>]*class="[^"]*guide-comp-table[\s\S]*?<\/table>/) || [])[0] || '';
  const rows = tbl.match(/<tr[\s\S]*?<\/tr>/g) || [];
  ck(f.replace('guides/', '') + ': 17 filas renderizadas', rows.length === 17, rows.length + ' filas');
  ck(f.replace('guides/', '') + ' sin "Signal-to-Noise" en la tabla', !/Signal-to-Noise|Ratio Señal/.test(tbl));
  ck(f.replace('guides/', '') + ' sin THD en la tabla', !/THD at Max SPL|THD a SPL/.test(tbl));
  ck(f.replace('guides/', '') + ' con Headphone Monitoring', /Headphone Monitoring|Monitorizaci/.test(tbl));
  ck(f.replace('guides/', '') + ' sin RGB en el Best For', !/RGB/.test(tbl));
});

console.log('\n' + (fail === 0 ? 'TODAS LAS COMPROBACIONES OK' : 'FALLOS: ' + fail));
process.exit(fail === 0 ? 0 : 1);