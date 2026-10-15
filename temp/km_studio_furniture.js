// El K&M en studio-furniture: ¿de donde sale el $49?
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['studio-furniture.html', 'studio-furniture_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  console.log('\n=== ' + f + ' ===');
  // boton del K&M
  [...d.matchAll(/<a [^>]*data-store="(amazon|zzounds)"[^>]*href="[^"]*B079GZ2ZQ5[^"]*"[^>]*>[\s\S]{0,900}?<\/a>/g)].forEach(m => {
    const txt = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('  boton: ' + txt.slice(0, 60));
  });
  // prosa
  const prosa = [...d.matchAll(/.{120}K&M.{0,200}/g)].map(m => m[0]);
  prosa.forEach(p => {
    if (/\$|£|€/.test(p)) console.log('  prosa con precio: ...' + p.replace(/\s+/g, ' ') + '...');
  });
  const todas = [...d.matchAll(/.{60}K&M 210\/2.{0,160}/g)].map(m => m[0]);
  console.log('  menciones de "K&M 210/2": ' + todas.length);
  todas.slice(0, 3).forEach(t => console.log('    ...' + t.replace(/\s+/g, ' ') + '...'));
});

// en guides.json
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const sf = g.find(x => x.id === 'studio-furniture');
console.log('\n=== guides.json · studio-furniture ===');
const json = JSON.stringify(sf);
[...json.matchAll(/.{80}K&M 210\/2.{0,180}/g)].slice(0, 4).forEach(m =>
  console.log('  ...' + m[0].replace(/\s+/g, ' ') + '...'));
