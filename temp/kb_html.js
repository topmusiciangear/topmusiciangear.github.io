const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-piano-keyboard-vsts.html', 'utf8');
['MeldwayGrand', 'Kontakt 8', 'V Collection 11 Pro'].forEach(name => {
  const i = h.indexOf('>' + name + '<');
  if (i < 0) { console.log('=== ' + name + ': no encontrado como titulo de card'); return; }
  const seg = h.slice(i, i + 2600);
  const btns = [...seg.matchAll(/shop-btn-primary[\s\S]{0,400}?<\/a>/g)].map(m => m[0].replace(/\s+/g, ' ').slice(0, 300));
  console.log('=== ' + name);
  console.log('  primary: ' + (btns[0] || 'NINGUNO'));
});
const rows = [...h.matchAll(/"name":"(MeldwayGrand|Kontakt 8|V Collection 11 Pro)"/g)].length;
console.log('menciones en JSON-LD/veredictos: ' + rows);