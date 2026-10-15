const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const p = list.find(x=>x.id===154);
console.log('id 154:');
console.log('  title:     ' + p.title);
console.log('  title_es:  ' + (p.title_es || '(sin campo)'));
console.log('  desc_es:   ' + (p.desc_es || '(sin campo)'));
console.log('  desc:      ' + (p.desc || '').slice(0,120));
// buscar textos rotos en espanol de todos los productos renombrados
const IDS = [105,493,106,495,154,494,109,108,152,153,626];
console.log('\n=== title_es / desc_es de los 11 renombrados ===');
list.filter(x=>IDS.includes(x.id)).forEach(x=>{
  console.log('\nid ' + x.id + '  ' + x.title);
  console.log('  title_es: ' + (x.title_es || '(ninguno)'));
  const de = x.desc_es || '';
  // detectar frases inglesas obvias
  const en = /\b(the|with|and|power|peak|woofer|driver|speaker|for|best|built|Bluetooth|W of)\b/i.test(de);
  console.log('  desc_es:  ' + (de.slice(0,150) || '(ninguno)'));
  console.log('  desc_es parece ingles: ' + (en ? 'SI' : 'no'));
});