const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const scraped = JSON.parse(fs.readFileSync(B + 'temp/pb_eur_live.json', 'utf8'));
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const eur2us = v => (v / 1.0084).toFixed(2);
const eur2uk = v => ((v / 1.0084) * 0.7959).toFixed(2);

// ids cuyo pbCur hay que recalcular tras cambiar el precio EU
const cambios = [1001,1002,1003,1004,1005,1006,1022,1025,1030,1034,1036,1038,1039];
let n = 0;
cambios.forEach(id => {
  const s = scraped.find(x => x.id === id);
  if (!s || !s.actual) return;
  const e = parseFloat(s.actual.replace(/[^\d.]/g, ''));
  const re = new RegExp('(\\n\\s*' + id + ': \\{prices:\\{pluginboutique:"\\u20AC[\\d.]+")(,[^\\n]*?)(,pbCur:\\{us:)"[^"]+"(,uk:)"[^"]+"');
  const m = bg.match(re);
  if (!m) { console.log(id + ': patron pbCur no encontrado'); return; }
  // conserva las otras tiendas (m[2]) y solo actualiza us/uk
  const nuevo = '\n' + id + ': {prices:{pluginboutique:"\u20AC' + e.toFixed(2) + '"' + m[2] + ',pbCur:{us:"$' + eur2us(e) + '",uk:"\u00A3' + eur2uk(e) + '"}}';
  bg = bg.replace(m[0], nuevo);
  n++;
});
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('pbCur recalculados: ' + n);

// verificar las 2 promos nuevas en el mapa
[1005, 1036].forEach(id => {
  const m = bg.match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  ' + id + ': ' + (m ? m[0].replace(/^\n/, '').trim() : 'NO'));
});