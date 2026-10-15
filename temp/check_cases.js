const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;

// 1) pares de productos con nombres casi iguales (el bug que acabamos de arreglar en Montage/Bronco)
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
console.log('=== PARES CON NOMBRE CASI IGUAL (posibles duplicados) ===');
const vistos = new Set();
let pares = 0;
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    const a = norm(arr[i].title).split(' '), b = norm(arr[j].title).split(' ');
    const setB = new Set(b);
    const comunes = a.filter(w => setB.has(w)).length;
    if (comunes / Math.max(a.length, b.length) >= 0.6 && comunes >= 2) {
      pares++;
      console.log('  ' + arr[i].id + ' "' + arr[i].title + '"   <->   ' + arr[j].id + ' "' + arr[j].title + '"');
    }
  }
}
console.log('  pares: ' + pares);

// 2) los casos "no existe" del informe
console.log('\n=== NOMBRES QUE NO RESUELVEN (revisar uno a uno) ===');
['REFERENCE 3','FL Studio All Plugins Edition','Yamaha MG Series','Lewitt LCT 1040','NI Komplete 26 Ultimate'].forEach(n => {
  const k = norm(n);
  const hits = arr.filter(p => {
    const kp = norm(p.title);
    return k.split(' ').filter(w=>w.length>1).every(w => kp.indexOf(w) > -1);
  });
  console.log('  "' + n + '" -> ' + (hits.length ? hits.map(p=>p.id+' '+p.title).join(' | ') : 'NINGUNO'));
});

// 3) Audeze 177 vs 178
console.log('\n=== Audeze 177 vs 178 ===');
[177,178].forEach(id => { const p = arr.find(x=>x.id===id); console.log('  id ' + id + ': ' + p.title + ' | $' + p.price + ' | ' + p.img.slice(0,60)); });
console.log('\n=== Rode Wireless PRO / NT1 (id 3) ===');
const r3 = arr.find(x=>x.id===3); console.log('  id 3: ' + r3.title);
console.log('\n=== Kali IN-8 V2 ===');
arr.filter(p=>/IN-8/i.test(p.title)).forEach(p=>console.log('  id '+p.id+': '+p.title+' | $'+p.price));
console.log('\n=== Traveler Guitar ===');
arr.filter(p=>/Traveler Guitar/i.test(p.title)).forEach(p=>console.log('  id '+p.id+': '+p.title+' | $'+p.price));
console.log('\n=== Schecter Stiletto ===');
arr.filter(p=>/Stiletto/i.test(p.title)).forEach(p=>console.log('  id '+p.id+': '+p.title+' | $'+p.price));