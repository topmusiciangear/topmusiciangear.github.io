const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1) de donde sale https://www.zzounds.com/ en el HTML
const d = fs.readFileSync(BASE + 'guides/budget-mics.html', 'utf8');
const i = d.indexOf('href="https://www.zzounds.com/"');
console.log('=== contexto del href de la portada ===\n');
const ini = d.lastIndexOf('<a ', i);
const fin = d.indexOf('</a>', i);
console.log(d.slice(ini, fin + 4).replace(/style="[^"]*"/g, 'style=".."').replace(/<svg[\s\S]*?<\/svg>/g, '[svg]').slice(0, 700));

// 2) storeSearch de zzounds
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const m = src.match(/storeSearch\s*=\s*\{[\s\S]{0,900}?\n\s*\};/);
console.log('\n\n=== storeSearch ===\n');
console.log(m ? m[0].slice(0, 800) : '(no encontrado literal)');

// 3) products.json: zzounds que sean solo la home
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const homes = list.filter(p => /^https:\/\/www\.zzounds\.com\/?$/.test((p.stores || {}).zzounds || ''));
console.log('\n\n=== products.json con zzounds = portada ===');
console.log('  ' + homes.length);
homes.slice(0, 20).forEach(p => console.log('    ' + p.id + '  ' + p.title));
