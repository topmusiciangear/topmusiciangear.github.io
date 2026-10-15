const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));

const ESP = {
  amazon: u => u.includes('tag=topmusicg-20'),
  zzounds: u => u.includes('anrdoezrs.net/click-101857888-10439229'),
  gear4music: u => u.includes('awin1.com/cread.php?awinmid=1117'),
  musicstore: u => u.includes('awin1.com/cread.php?awinmid=63816'),
  andertons: u => u.includes('andertonsmusiccompany.pxf.io'),
  reverb: u => u.includes('awin1.com/cread.php?awinmid=67144')
};

let total = 0, sinAfiliado = [], rotos = [], directos = [];
files.forEach(f => {
  const d = fs.readFileSync(path.join(B, f), 'utf8');
  [...d.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*href="([^"]+)"[^>]*>/g)].forEach(m => {
    const [_, store, href] = m;
    if (!ESP[store]) return;
    total++;
    let u;
    try { u = decodeURIComponent(href); } catch (e) { u = href; }
    // 1) afiliado
    if (!ESP[store](u)) sinAfiliado.push(f + ' [' + store + '] ' + u.slice(0, 100));
    // 2) rotos evidentes
    if (/undefined|href=""|#$/.test(href)) rotos.push(f + ' [' + store + '] ' + u.slice(0, 100));
    if (/double-wrapped|awin1\.com.*awin1\.com|anrdoezrs\.net.*anrdoezrs/.test(u)) rotos.push(f + ' [' + store + '] DOBLE-WRAP ' + u.slice(0, 100));
    // 3) reverb directa a /item/
    if (store === 'reverb' && /reverb\.com\/item\//.test(u)) directos.push(f + ' ' + u.slice(0, 110));
  });
});

console.log('=== AUDITORIA DE AFILIADOS (HTML generado) ===');
console.log('  links de tienda analizados: ' + total);
console.log('  SIN afiliado correcto     : ' + sinAfiliado.length);
console.log('  rotos / doble-wrap        : ' + rotos.length);
console.log('  reverb directa a /item/   : ' + directos.length);
[...new Set(sinAfiliado)].slice(0, 15).forEach(x => console.log('\n  SIN: ' + x));
[...new Set(rotos)].slice(0, 10).forEach(x => console.log('\n  ROTO: ' + x));
[...new Set(directos)].slice(0, 10).forEach(x => console.log('\n  DIRECTA: ' + x));

// por tienda
console.log('\n=== por tienda (conteo en HTML) ===');
['amazon', 'zzounds', 'gear4music', 'andertons', 'musicstore', 'reverb'].forEach(k => {
  let n = 0, mal = 0;
  files.forEach(f => {
    const d = fs.readFileSync(path.join(B, f), 'utf8');
    [...d.matchAll(new RegExp('<a [^>]*data-store="' + k + '"[^>]*href="([^"]+)"', 'g'))].forEach(m => {
      n++;
      let u; try { u = decodeURIComponent(m[1]); } catch (e) { u = m[1]; }
      if (!ESP[k](u)) mal++;
    });
  });
  console.log('  ' + k.padEnd(12) + String(n).padStart(5) + ' links   sin afiliado: ' + mal);
});
