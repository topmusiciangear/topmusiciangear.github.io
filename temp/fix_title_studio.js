const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

const NUEVO_EN = 'Home Studio Under $1,000: 3 Setups That Actually Work';
const NUEVO_ES = 'Home studio por menos de $1.000: 3 configuraciones que funcionan de verdad';

console.log('=== ANTES ===');
console.log('  EN titleTag: "' + g.titleTag + '"  (' + g.titleTag.length + 'c)');
console.log('  ES titleTag_es: "' + g.titleTag_es + '"  (' + g.titleTag_es.length + 'c)');

console.log('\n=== PEDIDO ===');
console.log('  EN "' + NUEVO_EN + '"  (' + NUEVO_EN.length + 'c)');
console.log('  ES "' + NUEVO_ES + '"  (' + NUEVO_ES.length + 'c)');
console.log('  limite: 60c / 580px');

g.titleTag = NUEVO_EN;
g.title_es = NUEVO_ES;
g.titleTag_es = NUEVO_ES;

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\naplicado. Midiendo con el auditor real...');

console.log('\n=== ALTERNATIVAS EN (<=60c) ===');
['Home Studio Under $1,000: 3 Setups That Work',
 '3 Home Studio Setups Under $1,000 That Work',
 'Home Studio Under $1,000: 3 Working Setups',
 'Build a Home Studio Under $1,000: 3 Setups',
 'Home Studio on $1,000: 3 Setups That Work'
].forEach(a=>console.log('  ' + String(a.length).padStart(3) + 'c  ' + a));

console.log('\n=== ALTERNATIVAS ES (<=60c) ===');
['Home studio por menos de $1.000: 3 montajes',
 'Home studio bajo $1.000: 3 configuraciones',
 '3 montajes de home studio por menos de $1.000',
 'Home studio por menos de $1.000, en tres niveles'
].forEach(a=>console.log('  ' + String(a.length).padStart(3) + 'c  ' + a));