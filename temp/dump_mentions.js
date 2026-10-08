const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const o = g.find(x => x.id === 'open-headphones');
function walk(node, path) {
  if (typeof node === 'string') {
    if (/Sundara|Hifiman|HD 560S|560S/.test(node)) {
      console.log('### ' + path);
      console.log(node.slice(0, 600));
      console.log('');
    }
    return;
  }
  if (Array.isArray(node)) { node.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
  if (node && typeof node === 'object') { Object.keys(node).forEach(k => walk(node[k], path + '.' + k)); }
}
Object.keys(o).forEach(k => { if (k !== 'sections' && k !== 'verdictProsCons' && k !== 'productTable') walk(o[k], k); });
console.log('=== SECTIONS 6,7 headings ===');
console.log(o.sections[6].heading + ' || ' + o.sections[6].heading_es);
console.log(o.sections[7].heading + ' || ' + o.sections[7].heading_es);
