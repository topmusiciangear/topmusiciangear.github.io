const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1) ¿de donde salen las reverb directas? ¿products.json o TEST_SHOP_BTN.urls?
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
console.log('=== reverb /item/ en products.json ===');
p.filter(x => x.stores && x.stores.reverb && /reverb\.com\/item\//.test(x.stores.reverb))
  .forEach(x => console.log('  ' + x.id + '  ' + x.title.slice(0, 50) + '\n      ' + x.stores.reverb));

const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + src.slice(ini + 'const TEST_SHOP_BTN = '.length, src.indexOf('\n};', ini) + 2))();
console.log('\n=== reverb /item/ en TEST_SHOP_BTN.urls ===');
Object.entries(mapa).forEach(([id, cfg]) => {
  const u = cfg.urls && cfg.urls.reverb;
  if (u && /reverb\.com\/item\//.test(u)) {
    const x = p.find(y => y.id === Number(id));
    console.log('  ' + id + '  ' + ((x && x.title) || '?').slice(0, 50) + '\n      ' + u);
  }
});

// 2) auditoria correcta: afiliado en data-aff (href lleva la limpia)
console.log('\n=== AUDITORIA CON data-aff ===');
const ESP = {
  amazon: u => u.includes('tag=topmusicg-20'),
  zzounds: u => u.includes('anrdoezrs.net/click-101857888-10439229'),
  gear4music: u => u.includes('awin1.com/cread.php?awinmid=1117'),
  musicstore: u => u.includes('awin1.com/cread.php?awinmid=63816'),
  andertons: u => u.includes('andertonsmusiccompany.pxf.io'),
  reverb: u => u.includes('awin1.com/cread.php?awinmid=67144')
};
const files = fs.readdirSync(B + 'guides').filter(f => f.endsWith('.html'));
let total = 0, sin = [], porTienda = {};
files.forEach(f => {
  const d = fs.readFileSync(path.join(B + 'guides', f), 'utf8');
  [...d.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>/g)].forEach(m => {
    const tag = m[0];
    const store = m[1];
    if (!ESP[store]) return;
    total++;
    porTienda[store] = porTienda[store] || { n: 0, mal: 0 };
    porTienda[store].n++;
    const aff = (tag.match(/data-aff="([^"]+)"/) || [])[1] || '';
    const href = (tag.match(/href="([^"]+)"/) || [])[1] || '';
    let u; try { u = decodeURIComponent(aff || href); } catch (e) { u = aff || href; }
    if (!ESP[store](u)) { porTienda[store].mal++; sin.push(f + ' [' + store + '] aff="' + (aff || '(vacio, href=' + href.slice(0, 60) + ')') + '"'); }
  });
});
console.log('  links analizados: ' + total);
Object.entries(porTienda).forEach(([k, v]) => console.log('  ' + k.padEnd(12) + String(v.n).padStart(5) + ' links   sin afiliado: ' + v.mal));
console.log('\n  TOTAL sin afiliado: ' + sin.length);
[...new Set(sin)].slice(0, 15).forEach(x => console.log('    - ' + x.slice(0, 160)));
