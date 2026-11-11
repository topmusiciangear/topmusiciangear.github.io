const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const PATS = [
  /impulsado por/gi,
  /con presupuesto\b(?! (ajustado|limitado|amplio|holgado|grande|alto|definido|extra|suficiente))/gi,
  /sin fisuras/gi
];

function walkES(obj, path, out) {
  if (Array.isArray(obj)) { obj.forEach(function (v, i) { walkES(v, path + '[' + i + ']', out); }); return; }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      if (/_es$/.test(k)) {
        const v = obj[k];
        if (typeof v === 'string') out.push({ loc: path + '.' + k, text: v });
        else if (Array.isArray(v)) v.forEach(function (s, i) { if (typeof s === 'string') out.push({ loc: path + '.' + k + '[' + i + ']', text: s }); });
      } else walkES(obj[k], path + '.' + k, out);
    }
  }
}

const fields = [];
guides.forEach(function (g) { walkES(g, 'guide:' + g.id, fields); });
walkES(products, 'products', fields);

PATS.forEach(function (re) {
  console.log('=== ' + re.source + ' ===');
  fields.forEach(function (f) {
    const r = new RegExp(re.source, 'gi');
    let m;
    while ((m = r.exec(f.text)) !== null) {
      const s = Math.max(0, m.index - 70);
      console.log('  ' + f.loc);
      console.log('    ...' + f.text.slice(s, m.index + 80).replace(/\s+/g, ' ') + '...');
    }
  });
  console.log('');
});