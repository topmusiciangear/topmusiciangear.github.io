const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));

// RESTAURAR: los 403 de zZounds son bloqueo anti-bot, no enlaces muertos.
// Mi script anterior los sustituyo por URLs de busqueda de Andertons. Error mio.
const restaurar = {
  1042: 'https://www.zzounds.com/item--PRSERIS35GEN2',
  1046: 'https://www.zzounds.com/item--MACCR35',
  1048: 'https://www.zzounds.com/item--MACCR45'
};
Object.entries(restaurar).forEach(([id, url]) => {
  const p = products.find(x => x.id === Number(id));
  p.stores.zzounds = url;
  console.log('restaurado ' + id + ' zZounds -> ' + url);
});
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');

console.log('\n=== TIENDAS DE LOS 6 (verificado) ===');
[1042, 1043, 1046, 1047, 1048, 1049].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('  ' + id + ' ' + p.title);
  Object.entries(p.stores || {}).forEach(([k, v]) => {
    const vis = v.includes('awin') ? decodeURIComponent((v.match(/ued=([^\s]*)/) || [])[1] || v) : v;
    const dominio = vis.match(/^https?:\/\/([^/]+)/)[1];
    console.log('      ' + k.padEnd(12) + dominio);
  });
});
