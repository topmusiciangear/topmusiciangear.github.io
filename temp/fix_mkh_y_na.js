// 1) Verificar que la fila na del Eris sale en gris (rama na funcionando)
// 2) Aplicar la foto del Sennheiser MKH 50-P48
const fs = require('fs');
const raiz = 'C:/Users/Daniel/projects/topmusiciangear/';

// ── 1) estado de la fila zZounds del Eris ──
const html = fs.readFileSync(raiz + 'guides/best-monitors-for-small-rooms_es.html', 'utf8');
const m = html.indexOf('openReviewModal(684)');
const seg = html.slice(m, m + 20000);
const zi = seg.indexOf('data-store="zzounds"');
const ini = seg.lastIndexOf('<a ', zi);
const fila = seg.slice(ini, seg.indexOf('</a>', zi) + 4);
console.log('=== fila zZounds del Eris Studio 5 ===');
console.log('  gris (#262626) : ' + (/background:#262626/.test(fila) ? 'SI  -> la rama na SI funciona' : 'NO  -> la rama na NO se dispara'));
console.log('  texto          : "' + fila.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '"');
console.log('  href           : ' + ((fila.match(/href="([^"]+)"/) || [])[1] || '').slice(0, 70) + '...');

// ── 2) MKH 50-P48 ──
const F = raiz + 'data/products.json';
const NUEVA = 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg';
const p = JSON.parse(fs.readFileSync(F, 'utf8'));
const x = p.find(y => y.id === 360);
if (!x) { console.log('\n  360 NO ENCONTRADO'); process.exit(1); }
console.log('\n=== 360 ' + x.title + ' ===');
console.log('  antes  : ' + x.img);
x.img = NUEVA;
if ('image' in x) x.image = NUEVA;
console.log('  despues: ' + x.img);
fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');

const raw = fs.readFileSync(F, 'utf8');
console.log('\n=== CONTROL ===');
console.log('  mojibake          : ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  productos         : ' + JSON.parse(raw).length);
console.log('  quedan flymusic   : ' + (raw.match(/static\.flymusic\.ro/g) || []).length);
console.log('  360.img           : ' + JSON.parse(raw).find(y => y.id === 360).img);
