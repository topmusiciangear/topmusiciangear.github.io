const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// 1. CJK colado en la review del AmPro II Strat
const g = guides.find(x => x.id === 'best-electric-guitar');
const s = g.sections.find(x => ((x.heading || '') + ' ' + (x.heading_es || '')).indexOf('American Professional II Strat') > -1);
if (!s) die('no encuentro la review');
const bad = 'con\u3001tremolo';
if (!s.content_es.includes(bad)) die('no encuentro el CJK');
s.content_es = s.content_es.split(bad).join('con trémolo');
console.log('CJK corregido: "con、tremolo" -> "con trémolo"');

// 2. barrido global de CJK en todo guides.json
let found = 0;
guides.forEach(gg => {
  const walk = (v, path) => {
    if (typeof v === 'string') {
      if (/[\u4e00-\u9fff]/.test(v)) { found++; console.log('CJK ' + gg.id + ' @ ' + path + ' :: ' + v.slice(0, 80)); }
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, path + '[' + i + ']'));
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => walk(v[k], path + '.' + k));
  };
  walk(gg, '');
});
console.log('CJK total en guides.json: ' + found);

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('OK');