const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(v => v.id === 'hd490-pro-vs-dt990');
function walk(o, path='') {
  if (typeof o === 'string') {
    if (/Plus|300|42 mm|200 mW/i.test(o)) console.log(path + ': ' + o);
  } else if (Array.isArray(o)) {
    o.forEach((v,i) => walk(v, path + '[' + i + ']'));
  } else if (o && typeof o === 'object') {
    for (const k of Object.keys(o)) walk(o[k], path + '.' + k);
  }
}
walk(x);
