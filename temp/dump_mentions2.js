const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const o = g.find(x => x.id === 'open-headphones');
// NOTE: guides.json on disk is pre-migration (script threw before write). This dump is informational only.
function walk(node, path) {
  if (typeof node === 'string') {
    let i = -1;
    const re = /Sundara|Hifiman|HD 560S|560S/g;
    let m;
    while ((m = re.exec(node))) console.log(path, '=>', JSON.stringify(node.slice(Math.max(0, m.index - 120), m.index + 120)));
    return;
  }
  if (Array.isArray(node)) { node.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
  if (node && typeof node === 'object') { Object.keys(node).forEach(k => walk(node[k], path + '.' + k)); }
}
walk(o, 'guide');
