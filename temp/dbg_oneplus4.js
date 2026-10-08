const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-drum-machine');
function walk(o, path) {
  if (typeof o === 'string') { if (o.includes('One+')) console.log(path); }
  else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + '[' + i + ']'));
  else if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k], path + '.' + k));
}
walk(d, 'guide');
