const fs = require('fs');
const { execSync } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
console.log('total productos en catalogo: ' + arr.length);
const marcas = ['Strymon','Eventide','Meris','Chase Bliss','Keeley','Source Audio','MXR','Universal Audio','Boss DD','Hall of Fame','Del-Verb','Reverberator','RV-200','Nemesis','TimeFactor','Caverns'];
marcas.forEach(m => {
  const hits = arr.filter(p => (p.title || '').toLowerCase().indexOf(m.toLowerCase()) > -1);
  console.log('  ' + m.padEnd(18) + ' -> ' + (hits.length ? hits.map(p=>p.id+' '+p.title).join(' | ') : 'NO ESTA EN EL CATALOGO'));
});
console.log('\nProductos de pedal (id 590-605):');
arr.filter(p => p.id >= 590 && p.id <= 605).forEach(p => console.log('  ' + p.id + '  ' + p.title));
console.log('\ntotal con id >= 590: ' + arr.filter(p => p.id >= 590).length);

const run = c => { try { return execSync(c, { cwd: BASE, maxBuffer: 1e8, shell: 'cmd.exe' }).toString(); } catch (e) { return 'ERR ' + e.message; } };
console.log('\n=== "Chase Bliss" en todo el repo (git log -S) ===');
console.log(run('git log -S "Chase Bliss" --oneline --all -- data/products.json data/guides.json') || '  (nunca existio en ningun fichero)');
console.log('\n=== primeros commits que traen "Chase Bliss" en guides.json ===');
console.log(run('git log --oneline --all --reverse -S "Chase Bliss" -- data/guides.json'));