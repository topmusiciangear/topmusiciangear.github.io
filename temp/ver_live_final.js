const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/live_es.html', 'utf8');
console.log('=== PAGINA VIVA (ES) ===');
const m = d.indexOf('openReviewModal(684)');
const seg = d.slice(m, m + 20000);
const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
console.log('  filas del Eris Studio 5: ' + filas.length);
filas.forEach(x => {
  const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const gris = /background:#262626/.test(x[0]);
  console.log('    ' + x[1].padEnd(11) + (gris ? '[gris] ' : '[precio]') + t.slice(0, 44));
});
console.log('  fila zZounds en gris: ' + (filas.find(x => x[1] === 'zzounds') ? (filas.find(x => x[1] === 'zzounds')[0].includes('#262626') ? 'SI (mal)' : 'no, con precio (bien)') : 'no existe'));
console.log('  £115 presente : ' + /£115/.test(d));
console.log('  €138 presente : ' + /€138/.test(d));
console.log('  £117 residual : ' + (d.match(/£117/g) || []).length);
console.log('  €139 residual : ' + (d.match(/€139/g) || []).length);
console.log('  mojibake      : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
