const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const p = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;
p.forEach(x => {
  ['desc', 'desc_es'].forEach(k => {
    if (typeof x[k] === 'string' && x[k].includes('dB-A')) {
      const c = x[k].split('dB-A').length - 1;
      x[k] = x[k].split('dB-A').join('dBA');
      n += c;
      console.log('  ok (' + c + ')  id ' + x.id + ' ' + x.title.slice(0, 44) + ' [' + k + ']');
    }
  });
});
fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');
console.log('\n  reemplazos: ' + n);

const raw = fs.readFileSync(F, 'utf8');
const t = raw;
console.log('\n=== CONTROL CATALOGO ===');
console.log('  "dB-A" en products.json : ' + (t.match(/dB-A/g) || []).length + ' (debe ser 0)');
console.log('  "dBA"                   : ' + (t.match(/\bdBA\b/g) || []).length);
console.log('  productos               : ' + p.length);
console.log('  mojibake                : ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
const x = p.find(y => y.id === 674);
console.log('\n  TLM 102 desc   : ' + x.desc.slice(0, 150));
console.log('  TLM 102 desc_es: ' + x.desc_es.slice(0, 150));
