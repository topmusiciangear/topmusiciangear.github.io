const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1) ¿qué toca el script de geo? (busca selectores en el bloque inline de una guia)
const d = fs.readFileSync(BASE + 'guides/best-pa-speakers.html', 'utf8');
const inline = [...d.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.length>5000)[0] || '';
console.log('=== selectores que usa el script de geo ===');
const sels = new Set();
[...inline.matchAll(/querySelector(?:All)?\('([^']+)'/g)].forEach(m=>sels.add(m[1]));
[...sels].sort().forEach(s=>console.log('  ' + s));
const otros = /classList\.|closest\(|getElementsBy/.test(inline);
console.log('\nusa classList/closest: ' + otros);
const tab = /guide-comp|table|td|th\b/.test(inline);
console.log('menciona la tabla comparativa (guide-comp/table/td): ' + tab);

// 2) ¿las celdas de precio de la tabla llevan data-price?
const tabla = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
console.log('\n=== la tabla comparativa ===');
console.log('  celdas con data-price: ' + (tabla.match(/data-price=/g)||[]).length);
console.log('  celdas con data-pb-*: ' + (tabla.match(/data-pb-/g)||[]).length);
const filaPrecio = tabla.match(/<tr><td class="label">Estimated Price[\s\S]*?<\/tr>/i);
if (filaPrecio) console.log('  fila de precio: ' + filaPrecio[0].replace(/<[^>]+>/g,' | ').replace(/\s+/g,' ').slice(0,220));

// 3) ¿las tarjetas de producto llevan data-price / data-pb-*?
console.log('\n=== las tarjetas de producto ===');
console.log('  data-price= en la pagina : ' + (d.match(/data-price=/g)||[]).length);
console.log('  data-pb-eu-p en la pagina: ' + (d.match(/data-pb-eu-p/g)||[]).length);
console.log('  data-pb-us-p en la pagina: ' + (d.match(/data-pb-us-p/g)||[]).length);
console.log('  data-pb-uk-p en la pagina: ' + (d.match(/data-pb-uk-p/g)||[]).length);

// 4) donde se generan los data-pb-* en build-guides.js
const b = fs.readFileSync(BASE+'build-guides.js','utf8');
console.log('\n=== donde se emiten data-pb-* (build-guides.js) ===');
const idx = b.indexOf('data-pb-eu-p');
console.log(b.slice(Math.max(0,idx-500), idx+260).replace(/\s+/g,' ').slice(0,900));