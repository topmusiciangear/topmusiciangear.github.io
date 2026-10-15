const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + src.slice(ini + 'const TEST_SHOP_BTN = '.length, src.indexOf('\n};', ini) + 2))();

console.log('=== ENTRADAS oos SIN URL REAL (caen a la home) ===');
Object.entries(mapa).forEach(([id, cfg]) => {
  (cfg.oos || []).forEach(k => {
    const x = p.find(y => y.id === Number(id));
    const url = (cfg.urls && cfg.urls[k]) || (x && x.stores && x.stores[k]);
    const esHome = !url || /^https?:\/\/(www\.)?(zzounds\.com|gear4music\.com|andertons\.co\.uk|musicstore\.com)\/?(\?.*)?$/.test(url);
    if (esHome) console.log('  ' + id + ' [' + k + '] ' + ((x && x.title) || '?').slice(0, 50) + '  -> ' + (url || '(sin URL)'));
  });
});
console.log('\n(fin)');
