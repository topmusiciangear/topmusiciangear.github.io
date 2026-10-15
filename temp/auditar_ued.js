const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));

const DOM = { 1117: 'gear4music.com', 63816: 'musicstore.com', 67144: 'reverb.com' };
let total = 0, bien = 0;
const mal = [];
files.forEach(f => {
  const d = fs.readFileSync(path.join(B, f), 'utf8');
  [...d.matchAll(/data-aff="(https:\/\/www\.awin1\.com\/cread\.php\?awinmid=(\d+)&awinaffid=2891111&ued=([^"]+))"/g)].forEach(m => {
    total++;
    const mid = m[2];
    let ued;
    try { ued = decodeURIComponent(m[3]); } catch (e) { ued = m[3]; }
    const domOK = ued.includes(DOM[mid] || '???');
    // ¿apunta a una ficha (con slug/articulo) y no a la home?
    const esHome = /^https?:\/\/(www\.)?(gear4music\.com|musicstore\.com|reverb\.com)\/?(\?.*)?$/.test(ued);
    if (domOK && !esHome) bien++;
    else mal.push(f + ' mid=' + mid + ' -> ' + ued.slice(0, 110));
  });
});
console.log('=== DESTINO ued DE LOS LINKS AWIN ===');
console.log('  links awin: ' + total);
console.log('  a ficha correcta: ' + bien);
console.log('  a home o dominio mal: ' + mal.length);
[...new Set(mal)].slice(0, 15).forEach(x => console.log('    - ' + x));
