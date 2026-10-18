(async () => {
const fs = require('fs');
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' };
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. foto
const foto = 'https://r2.gear4music.com/media/94/945437/1200/preview.jpg';
const r = await fetch(foto, { headers: H });
const t = r.headers.get('content-type');
console.log('=== FOTO ===');
console.log('  status=' + r.status + ' | ' + t + ' | ' + (await r.arrayBuffer()).byteLength + ' bytes');
console.log('  valida: ' + (r.status === 200 && /^image\//.test(t || '') ? 'SI' : 'NO'));

// 2. tienda
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1049);
p.img = foto;
p.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' +
  encodeURIComponent('https://www.gear4music.com/Recording-and-Computers/Behringer-TRUTH-35-BT-35-Bluetooth-Studio-Monitors-Pair/5NXK');
p.stores.andertons = 'https://www.andertons.co.uk/Behringer-Truth-Audiophile-35-Studio-Monitors-with-Bluetooth-Connectivity-and-Advanced-Waveguide-Technology/';
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('\n=== TIENDAS 1049 ===');
Object.entries(p.stores).forEach(([k, v]) => {
  const vis = v.includes('awin') ? decodeURIComponent((v.match(/ued=([^\s]*)/) || [])[1] || v) : v;
  console.log('  ' + k.padEnd(12) + vis);
});
console.log('  parametros residuales: ' + Object.values(p.stores).filter(v => /search_query|siid|_gl|gcl_aw/.test(v)).length);

// 3. precios por tienda
const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');
const viejo = /  1049: \{[\s\S]*?\n  \},\n/;
if (viejo.test(s)) {
  s = s.replace(viejo, '  1049: {\n    prices: {\n      gear4music: "\u00A3100.00",\n      andertons: "\u00A390.00",\n      amazon: "$147.00"\n    }\n  },\n');
  fs.writeFileSync(rb, s, 'utf8');
  console.log('\nTEST_SHOP_BTN: precios de 1049 actualizados (G4M \u00A3100, Andertons \u00A390, Amazon $147)');
}
})();
