const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0; const fallos = [];

function textosES(o, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach(v => textosES(v, acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string' && /(_es|title_es|desc_es)$/.test(k)) acc.push({ o, k });
      else if (v && typeof v === 'object') textosES(v, acc);
    });
    return acc;
  }
  return acc;
}

// 1) ¿ de apertura
const fixes1 = [
  ['Son las DT 990 Pro demasiado brillantes para mezclar?', '¿Son las DT 990 Pro demasiado brillantes para mezclar?'],
  ['Cómo elegir el mejor subwoofer de estudio?', '¿Cómo elegir el mejor subwoofer de estudio?']
];
// 2) miles con coma -> punto (solo ES)
const miles = ['\\$3,000', '\\$2,000', '\\$1,099', '\\$1,299', '\\$1,499', '\\$12,000', '\\$15,000', '\\$2,500', '\\$4,500', '\\$3,500', '\\$1,899', '\\$1,699', '\\$2,799', '\\$1,999', '\\$3,999', '\\$10,000', '\\$1,599', '\\$1,399', '\\$5,000'];

g.forEach(gg => {
  textosES(gg, []).forEach(({ o, k }) => {
    let t = o[k], changed = false;
    fixes1.forEach(([a, b]) => { if (t.includes(a)) { t = t.split(a).join(b); changed = true; n++; } });
    miles.forEach(m => {
      const re = new RegExp(m.replace('$', '\\$') + '(?!\\d)', 'g');
      const plain = m.replace(/\\/g, '');
      if (t.includes(plain)) {
        const nuevo = plain.replace(',', '.');
        t = t.split(plain).join(nuevo); changed = true; n++;
      }
    });
    // 3) decimales con punto + unidad -> coma (1-2 digitos; 3 digitos = miles, se deja)
    const reD = /(\d+)\.(\d{1,2})(\s?(?:pulgadas|kg|cm|mm|kHz|Hz|dB|ms\b|m\b|W\b|V\b|s\b))/g;
    let m;
    const orig = t;
    t = t.replace(reD, (f, a, b, c) => { n++; return a + ',' + b + c; });
    if (t !== orig) changed = true;
    if (changed) o[k] = t;
  });
});
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
