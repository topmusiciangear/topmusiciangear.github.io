const fs = require('fs');
const path = require('path');
const p = require('../data/guides.json');

const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/es-guides';
fs.mkdirSync(OUT, { recursive: true });

function walk(obj, prefix, lines) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') {
    if (prefix.indexOf('_es') !== -1 || prefix.indexOf('_es') === -1 && false) {
      // only include fields that are Spanish: key ends with _es, OR language-tagged es inside objects
    }
    lines.push(prefix + ' || ' + obj);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walk(v, prefix + '[' + i + ']', lines));
    return;
  }
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(k => walk(obj[k], prefix ? prefix + '.' + k : k, lines));
  } else {
    lines.push(prefix + ' || ' + String(obj));
  }
}

let index = [];
p.forEach(g => {
  const esLines = [];
  const enLines = [];
  // Collect ES fields with paths
  function collect(x, pr) {
    if (x === null || x === undefined) return;
    if (typeof x === 'string') {
      if (pr.endsWith('_es')) esLines.push(pr + ' || ' + x);
      else if (pr.startsWith('featuredSnippet') && /\b(es)$/.test(pr)) esLines.push(pr + ' || ' + x);
      return;
    }
    if (Array.isArray(x)) { x.forEach((v, i) => collect(v, pr + '[' + i + ']')); return; }
    if (typeof x === 'object') { Object.keys(x).forEach(k => collect(x[k], pr ? pr + '.' + k : k)); return; }
  }
  collect(g, '');
  const header = [
    '===== ' + g.id + ' =====',
    'TITLE_ES: ' + (g.title_es || ''),
    'EMPTY. Just EN. Fields parsed below:'
  ].join('\n');
  const body = esLines.join('\n');
  const file = path.join(OUT, g.id + '.txt');
  fs.writeFileSync(file, header + '\n' + body + '\n', 'utf8');
  index.push(g.id);
  const wc = body.split(/\s+/).length;
  console.log(g.id + ' (' + esLines.length + ' ES strings, ' + wc + ' words)');
});

fs.writeFileSync(path.join(OUT, '_INDEX.txt'), index.join('\n'), 'utf8');
console.log('TOTAL GUIDES:', p.length);