const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-live-subwoofers');
function walk(o, path) {
  if (typeof o === 'string') {
    if (/PRX ONE/i.test(o)) console.log(path, '=>', o.slice(0, 160).replace(/\n/g, ' '));
  } else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + '[' + i + ']'));
  else if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k], path + '.' + k));
}
Object.keys(d).forEach(k => { if (k !== 'sections') walk(d[k], k); });
d.sections.forEach((s, i) => walk(s, 'sections[' + i + '].' + (s.heading || '').slice(0, 30)));
