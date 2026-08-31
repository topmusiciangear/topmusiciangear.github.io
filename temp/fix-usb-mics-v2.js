var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var i = g.findIndex(x=>x.id==='usb-mics');
var guide = g[i];

// S0 - MV7+ - fix "El USB-C" and "te da el 90%"
guide.sections[0].content_es = guide.sections[0].content_es
  .replace('El USB-C significa que lo conectas', 'Su conectividad USB-C significa que lo conectas')
  .replace('el MV7+ te da el 90%', 'el MV7+ te ofrece el 90%');

// S4 - NT1 - fix EN typo "today today"
guide.sections[4].content = guide.sections[4].content.replace('today today', 'today');

// CONCLUSION - fix "También te puede interesar" → "También te interesa"
guide.conclusion_es = guide.conclusion_es.replace('También te puede interesar', 'También te interesa');

// VERDICT PROS/CONS - fix missing accent "asi" → "así"
guide.verdictProsCons[0].pros_es[2] = guide.verdictProsCons[0].pros_es[2].replace('asi que las S y T', 'así que las S y T');

// CONS ES for SM7B - clean double space
guide.verdictProsCons[0].cons_es[0] = 'Micrófono silencioso — necesita una interfaz limpia o un Cloudlifter para mantenerse sin ruido';

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done! Fixed typos and awkward phrases.');
