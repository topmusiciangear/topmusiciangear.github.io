const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('=== guias de guitarras electricas ===');
g.filter(x => /guitar/i.test(x.id)).forEach(x => console.log('  ' + x.id.padEnd(32) + (x.title || '').slice(0, 60)));
console.log('\n=== contexto del link roto en best-guitar-home-office ===');
const s = g.find(x => x.id === 'best-guitar-home-office');
const t = JSON.stringify(s);
[...new Set(t.match(/.{0,150}\/guides\/best-guitar\.html.{0,80}/g) || [])].forEach(m =>
  console.log('  ...' + m.replace(/<[^>]+>/g, ' ').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim().slice(0, 220) + '...'));
console.log('\n=== texto viejo budget-mics -> budget-usb-mics ===');
const bm = g.find(x => x.id === 'budget-mics');
const t2 = JSON.stringify(bm);
[...new Set(t2.match(/.{0,120}13 Best Budget USB Microphones.{0,80}/g) || [])].forEach(m =>
  console.log('  ...' + m.replace(/<[^>]+>/g, ' ').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim().slice(0, 220) + '...'));
const usb = g.find(x => x.id === 'budget-usb-mics');
console.log('\n  titulo actual budget-usb-mics: ' + usb.title + '\n  titulo_es: ' + usb.title_es);
