const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const p = list.find(x=>x.id===5); // Shure SM57
console.log('=== Shure SM57 (id 5) ===');
console.log('stores en products.json:');
Object.entries(p.stores||{}).forEach(([k,v])=>console.log('  ' + k.padEnd(12) + (v||'').slice(0,90)));
console.log('\nexcludeStores: ' + JSON.stringify(p.excludeStores || 'ninguno'));

// ¿por qué solo 5 filas si hay 5 tiendas? deberia ser 6 con amazon
const d = fs.readFileSync(BASE+'guides/budget-mics.html','utf8');
// la tarjeta del SM57
const i = d.indexOf('data-store="amazon" href="https://www.amazon.com/dp/B0000AQRST');
console.log('\n=== tarjeta SM57: botones y desplegable ===');
const card = d.slice(Math.max(0,i-1500), i+4000);
const pri = (card.match(/<a[^>]*class="shop-btn-primary"[^>]*data-store="([^"]+)"/)||[]);
console.log('  primaria: ' + (pri[1]||'?'));
const lista = card.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
if (lista) {
  const filas = [...lista[0].matchAll(/data-store="([^"]+)"/g)].map(m=>m[1]);
  console.log('  filas: ' + filas.join(', '));
  console.log('  -> FALTA ' + (['amazon','reverb','zzounds','gear4music','andertons','musicstore'].filter(k=>!filas.includes(k)).join(', ')||'nada'));
}
const priTxt = (card.match(/class="shop-btn-primary"[\s\S]*?<\/a>/) || [''])[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('\n  texto boton primaria: ' + priTxt);