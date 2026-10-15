const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const IDS = [220, 221, 223, 224, 327, 514, 516, 665, 667, 668, 669];

// 1) TEST_SHOP_BTN
const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + src.slice(ini + 'const TEST_SHOP_BTN = '.length, src.indexOf('\n};', ini) + 2))();
console.log('=== EN TEST_SHOP_BTN ===');
IDS.forEach(id => {
  const c = mapa[id];
  console.log('  ' + id + ': ' + (c ? JSON.stringify(c).slice(0, 120) : '(sin entrada)'));
});

// 2) otros JSON de datos
['data/deals.json', 'data/manual-deals.json', 'data/price-history.json', 'data/products.json'].forEach(f => {
  try {
    const raw = fs.readFileSync(B + f, 'utf8');
    const hits = IDS.filter(id => new RegExp('"' + id + '"[\\s:,{]').test(raw) || new RegExp('[\\[,:\\s]' + id + '[,\\]\\s]').test(raw));
    console.log('\n' + f + ': ' + (hits.length ? 'menciona ' + hits.join(', ') : 'nada'));
  } catch (e) { console.log('\n' + f + ': (no existe)'); }
});

// 3) guias que los nombren por texto
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const nombres = { 220: 'KH 120', 221: 'Core 7', 223: 'Trio6', 224: 'Twin6', 327: 'Maonocaster E2', 514: 'Symphony I/O', 516: 'Aurora-n', 665: 'Vocaster One', 667: 'MV6', 668: 'AT2020USB-XP', 669: 'Lyra' };
console.log('\n=== MENCIONES POR NOMBRE EN GUIAS ===');
Object.entries(nombres).forEach(([id, n]) => {
  const en = g.filter(x => JSON.stringify(x).includes(n)).map(x => x.id);
  console.log('  ' + id + ' "' + n + '": ' + (en.length ? en.join(', ') : 'ninguna'));
});
