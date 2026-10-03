const fs = require('fs');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'pro-microphones');
g.sections[0].products = g.sections[0].products.filter(id => id !== 292);
g.sections[1].products = g.sections[1].products.filter(id => id !== 290 && id !== 292);
g.sections[2].products = g.sections[2].products.filter(id => id !== 39);
console.log('DUEL: ' + g.sections.map(s => s.heading + ' -> ' + JSON.stringify(s.products)).join(' | '));
const m = G.find(x => x.id === 'pro-monitors');
m.sections[0].products = m.sections[0].products.filter(id => id !== 21 && id !== 306);
m.sections[1].products = m.sections[1].products.filter(id => id !== 331);
m.sections[2].products = m.sections[2].products.filter(id => id !== 302 && id !== 331);
console.log('MON: ' + m.sections.map(s => s.heading + ' -> ' + JSON.stringify(s.products)).join(' | '));
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(G, null, 2));
function show(t, id) {
  const start = t.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  console.log('BTN' + id + ': ' + t.slice(start, i + 1).replace(/\s+/g, ' '));
}
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
show(t, 187);
show(t, 180);