const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/live4.html', 'utf8');
console.log('=== PAGINA VIVA · starter-studio ES ===\n');
const tbl = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
[...tbl.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
  const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  if (!c.length) return;
  if (/Tratamiento acústico/.test(c[0])) { console.log('  ' + c[0] + ':'); c.slice(1).forEach((x, i) => console.log('      N' + (i + 1) + ': ' + x)); }
  if (/Puntos fuertes/.test(c[0])) { console.log('\n  ' + c[0] + ':'); c.slice(1).forEach((x, i) => console.log('      N' + (i + 1) + ': ' + x)); }
  if (/Inversión/.test(c[0])) console.log('\n  ' + c[0] + ': ' + c.slice(1).join(' | '));
});
console.log('\n=== COMPROBACIONES ===');
[['rango del panel presente', /200 Hz a 4 kHz/], ['trampas de esquinas', /trampas de esquinas/],
 ['Nivel 2 ya no promete "sin interfaz"', /USB-C graba en cualquier sitio sin interfaz/],
 ['XLR hacia la SSL', /entra por XLR a la SSL/],
 ['monojaake: mojibake', /â‚¬|Â£|Â°/]
].forEach(([n, re]) => console.log('  ' + String((d.match(new RegExp(re.source, 'g')) || []).length).padStart(3) + '  ' + n));
