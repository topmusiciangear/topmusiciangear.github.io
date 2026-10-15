const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/v6.html', 'utf8');
console.log('=== PAGINA VIVA · starter-studio ES ===\n');

// totales
const tbl = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
[...tbl.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
  const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  if (c.length && /Inversión/.test(c[0])) console.log('  ' + c[0] + ': ' + c.slice(1).join(' | '));
});

// Amazon primario
const primAmz = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)]
  .filter(m => /data-store="amazon"/.test(m[0]));
const conPrecio = primAmz.filter(m => /Aprox\.|\$[0-9]|£[0-9]|€[0-9]/.test(m[1]));
const conCheck = primAmz.filter(m => /Verificar precio/.test(m[1]));
console.log('\n  primarios Amazon: ' + primAmz.length + '  con precio: ' + conPrecio.length + '  con Verificar: ' + conCheck.length);
console.log('  ej: ' + primAmz[0][1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60));

// otras tiendas siguen con precio
['zzounds', 'gear4music', 'andertons', 'musicstore'].forEach(k => {
  const filas = [...d.matchAll(new RegExp('<a [^>]*data-store="' + k + '"[^>]*>([\\s\\S]*?)<\\/a>', 'g'))].filter(m => !/shop-btn-primary/.test(m[0]));
  const cp = filas.filter(m => /Aprox\.|\$[0-9]|£[0-9]|€[0-9]/.test(m[1]));
  console.log('  ' + k.padEnd(11) + ' filas: ' + filas.length + ' con precio: ' + cp.length);
});
console.log('\n  mojibake: ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
