const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rp = B + 'data/products.json';
const prods = JSON.parse(fs.readFileSync(rp, 'utf8'));

const st = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const tocados = [];

prods.forEach(p => {
  if (!/[Kk]nob/.test(JSON.stringify(p))) return;
  ['description', 'description_es', 'desc', 'desc_es', 'short', 'short_es'].forEach(k => {
    if (typeof p[k] !== 'string' || !/[Kk]nob/.test(p[k])) return;
    const antes = st(p[k]);
    p[k] = p[k]
      .split('front tone knob').join('front tone control')
      .split('tone knob').join('tone control')
      .split('Knob de tono').join('Control de tono')
      .split('knob de tono').join('control de tono')
      .split('el knob').join('el control');
    tocados.push([p.id, k, antes + '   ==>   ' + st(p[k])]);
  });
});

fs.writeFileSync(rp, JSON.stringify(prods, null, 2), 'utf8');
console.log('campos corregidos: ' + tocados.length);
tocados.forEach(t => console.log('  ' + t[0] + ' ' + t[1] + '\n    ' + t[2] + '\n'));

const fin = JSON.stringify(prods);
console.log('quedan "knob" en products.json: ' + (fin.match(/knob/gi) || []).length);