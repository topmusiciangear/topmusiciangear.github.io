const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const stale = ['guides/autotune-vs-melodyne.html', 'guides/autotune-vs-melodyne_es.html'];
stale.forEach(f => {
  if (fs.existsSync(B + f)) { fs.unlinkSync(B + f); console.log('stale eliminado: ' + f); }
  else console.log('no existe: ' + f);
});
const sm = fs.readFileSync(B + 'sitemap.xml', 'utf8');
console.log('sitemap repitch: ' + (sm.includes('repitch-vs-melodyne') ? 'OK' : 'FALTA'));
console.log('sitemap autotune: ' + (sm.includes('autotune-vs-melodyne') ? 'SIGUE!' : 'fuera'));
// verificar nueva pagina
['guides/repitch-vs-melodyne.html', 'guides/repitch-vs-melodyne_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const undef = (h.match(/undefined/g) || []).length;
  const names = [...h.matchAll(/verdict-product-name">([^<]+)</g)].map(m => m[1]);
  const pb = h.includes('16199-RePitch-2-Standard') ? 'PB-URL OK' : 'PB-URL FALTA';
  const g4m = h.includes('7MWD') ? 'G4M-URL OK' : 'G4M-URL FALTA';
  const gbp = h.includes('125.00') ? '£125 OK' : '£125 FALTA';
  const faq = h.includes('guide-faq-answer-inner">undefined') ? 'FAQ ROTA!' : 'FAQ OK';
  console.log(f + ': undefined=' + undef + ' verdictos=' + JSON.stringify(names) + ' ' + pb + ' ' + g4m + ' ' + gbp + ' ' + faq);
});
