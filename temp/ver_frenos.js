const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

console.log('=== 1) "KH 120" en adam-vs-genelec y kh750-vs-7050c ===');
g.filter(x => ['adam-vs-genelec', 'kh750-vs-7050c'].includes(x.id)).forEach(gg => {
  const t = JSON.stringify(gg);
  [...t.matchAll(/.{0,200}KH 120.{0,200}/g)].forEach(m =>
    console.log('\n  [' + gg.id + '] ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 330) + '...'));
});

console.log('\n\n=== 2) "MV6" en usb-mics ===');
const u = g.find(x => x.id === 'usb-mics');
const tu = JSON.stringify(u);
[...tu.matchAll(/.{0,200}MV6.{0,200}/g)].forEach(m =>
  console.log('\n  ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 330) + '...'));

console.log('\n\n=== 3) oferta del 665 en deals.json ===');
const deals = JSON.parse(fs.readFileSync(B + 'data/deals.json', 'utf8'));
const arr = Array.isArray(deals) ? deals : (deals.deals || deals.items || Object.values(deals));
console.log('  estructura: ' + (Array.isArray(deals) ? 'array (' + deals.length + ')' : Object.keys(deals).join(',')));
arr.filter(d => JSON.stringify(d).includes('665') || /vocaster/i.test(JSON.stringify(d))).forEach(d =>
  console.log('\n  ' + JSON.stringify(d).slice(0, 500)));
