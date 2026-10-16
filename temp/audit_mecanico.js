// Chequeos mecanicos ES: interrogacion/exclamacion, miles con coma, decimales con punto, usted
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function textosES(o, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach(v => textosES(v, acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string' && /(_es|title_es|desc_es)$/.test(k)) acc.push(v);
      else if (v && typeof v === 'object') textosES(v, acc);
    });
    return acc;
  }
  return acc;
}

let inter = [], miles = [], dec = [], usted = [];
g.forEach(gg => {
  textosES(gg, []).forEach(t => {
    const limpio = t.replace(/<[^>]+>/g, ' ');
    // ? sin ¿ en la misma frase
    limpio.split(/(?<=[.!?])\s+/).forEach(frase => {
      if (/\?/.test(frase) && !/¿/.test(frase)) inter.push(gg.id + ': ...' + frase.trim().slice(0, 100));
      if (/!/.test(frase) && !/¡/.test(frase) && /[A-Za-z]!/.test(frase)) inter.push(gg.id + ': ...' + frase.trim().slice(0, 100));
    });
    [...limpio.matchAll(/\$\d{1,3},\d{3}/g)].forEach(m => miles.push(gg.id + ': ' + m[0]));
    [...limpio.matchAll(/\b\d+\.\d+\s?(pulgadas|kg|cm|mm|m\b|Hz|kHz|dB|ms|s\b|W\b|V\b)/g)].forEach(m => dec.push(gg.id + ': ' + m[0]));
    [...limpio.matchAll(/\busted\b|\bsu\b pedido|\ble\b (gusta|conviene|interesa)/gi)].forEach(m => usted.push(gg.id + ': ...' + m[0]));
  });
});
const uniq = a => [...new Set(a)];
console.log('### ?/! sin apertura: ' + inter.length);
uniq(inter).slice(0, 15).forEach(x => console.log('  ' + x));
console.log('\n### miles con coma en ES (deben ser punto): ' + miles.length);
uniq(miles).slice(0, 15).forEach(x => console.log('  ' + x));
console.log('\n### decimales con punto en ES (deben ser coma): ' + dec.length);
uniq(dec).slice(0, 20).forEach(x => console.log('  ' + x));
fs.writeFileSync(B + 'temp/audit_mecanico.json', JSON.stringify({ inter: uniq(inter), miles: uniq(miles), dec: uniq(dec) }, null, 1));
