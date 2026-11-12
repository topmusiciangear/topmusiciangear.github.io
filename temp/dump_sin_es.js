// Dump valores COMPLETOS de featuredSnippet.specs con valX sin _es, agrupado por guía
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const RENDER = ['val1', 'val2', 'val3', 'val4', 'val5'];
const out = [];
guides.forEach(g => {
  const fsn = g.featuredSnippet;
  if (!fsn || !Array.isArray(fsn.specs)) return;
  let flagged = [];
  fsn.specs.forEach((s, si) => {
    RENDER.forEach(k => {
      const v = s[k];
      if (typeof v === 'string' && v.length > 25 && !s[k + '_es'] && /^[\x00-\x7F]*$/.test(v)) {
        flagged.push('  specs[' + si + '] label=' + JSON.stringify(s.label || '') + '\n    ' + k + ': ' + JSON.stringify(v));
      }
    });
  });
  if (flagged.length) {
    out.push('### ' + g.id + ' (name1: ' + JSON.stringify(fsn.name1_en || '') + ' / ' + JSON.stringify(fsn.name2_en || '') + ')\n' + flagged.join('\n'));
  }
});
// también products 402/403/414 descriptions y 9001/9002/61 titles
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
[61, 402, 403, 414, 9001, 9002].forEach(id => {
  const p = products.find(x => String(x.id) === String(id));
  if (p) out.push('### PRODUCT ' + id + '\n  title: ' + JSON.stringify(p.title) + '\n  title_es: ' + JSON.stringify(p.title_es || '(MISSING)') + '\n  desc: ' + JSON.stringify(p.desc || p.description || '(none)') + '\n  desc_es: ' + JSON.stringify(p.desc_es || p.description_es || '(MISSING)'));
});
fs.writeFileSync(B + 'temp/sin_es_values.txt', out.join('\n\n'), 'utf8');
console.log('guías con celdas sin traducir: ' + out.length);
