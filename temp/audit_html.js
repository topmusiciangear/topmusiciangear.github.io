const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const out = [];
['guides/usb-mics.html', 'guides/usb-mics_es.html'].forEach(p => {
  const h = fs.readFileSync(BASE + p, 'utf8');
  out.push('=== ' + p + ' ===');
  out.push('  title      : ' + (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
  out.push('  og:title   : ' + (h.match(/property="og:title" content="([\s\S]*?)"/) || [])[1]);
  out.push('  desc       : ' + ((h.match(/name="description" content="([\s\S]*?)"/) || [])[1] || '').slice(0, 150));
  out.push('  filas tabla: ' + (h.match(/<td class="label"/g) || []).length);
  out.push('  <th> tabla : ' + (h.match(/guide-comp-table[\s\S]*?<\/table>/) ? ((h.match(/guide-comp-table[\s\S]*?<\/table>/)[0].match(/<th/g) || []).length) : 0));
  out.push('  VPC projos : ' + (h.match(/verdict-pros/g) || []).length);
  out.push('  cards      : ' + ((h.match(/class="guide-product-card"/g) || []).length));
  out.push('  FAQ items  : ' + ((h.match(/guide-faq-item/g) || []).length));
  ['MV7+', 'Wave:3', 'AT2040USB', 'NT-USB+', 'NEOM', 'PodMic USB', 'AT2020USB-X', 'Q2U', 'NT1 5th', 'Profile'].forEach(n => {
    out.push('     ' + n.padEnd(14) + (h.match(new RegExp(n.replace(/[+]/g, '\\+'), 'g')) || []).length);
  });
  out.push('  frases rotas: ' + (h.match(/— still a premium|it's below the MV7|— the priciest/g) || []).length);
  out.push('  "segundo micrófono más pesado": ' + (h.match(/segundo micrófono más pesado/gi) || []).length);
  out.push('  "el micrófono más ligero de la guía": ' + (h.match(/micrófono más ligero de la guía/gi) || []).length);
  out.push('  1 x 25 mm condenser: ' + (h.match(/1 x 25 mm condenser/gi) || []).length);
  out.push('  "17 mm electret": ' + (h.match(/17 mm electret/gi) || []).length);
  out.push('');
});
console.log(out.join('\n'));