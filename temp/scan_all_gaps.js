const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
const problems = [];
function walk(o, path) {
  if (typeof o === 'string') {
    const flags = [];
    if (/^ :/.test(o)) flags.push('heading-vacio');
    if (/product-name"> ?<\/span>/.test(o)) flags.push('nombre-vacio-verdict');
    if (/\bThe is\b/.test(o)) flags.push('The-is');
    if (/\bEl es\b/.test(o)) flags.push('El-es');
    if (/\bIt is\b/.test(o) && !/It is worth|It is important|It is not/.test(o)) flags.push('It-is-stray');
    if (/  +/.test(o)) flags.push('doble-espacio');
    if (/^\s*"/.test(o) && /^[ "]/.test(o)) flags.push('valor-vacio');
    if (flags.length) problems.push([path, flags.join(','), o.slice(0, 200)]);
  } else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + '[' + i + ']'));
  else if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k], path + '.' + k));
}
walk(sub, 'studio-subwoofers');
console.log('PROBLEMAS ENCONTRADOS:', problems.length);
problems.forEach(([p, f, s]) => console.log('-', p, '|', f, '|', s.slice(0, 180)));
