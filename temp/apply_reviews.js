const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const files = [
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd81206001fsKVzep18JjpRQ',
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bdaeee10014Cpo12E5Uf7tfp',
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd5e447001sEKapKbClNjb6n',
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd50d3f001685bBaQg591puv',
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd5489d001siCtzua8jEsbwL',
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd78189001je4YupZBnQOc0B'
];
let all = [];
files.forEach(f => {
  const t = fs.readFileSync(f, 'utf8');
  const a = t.indexOf('[{');
  const b = t.lastIndexOf('}]');
  if (a === -1 || b === -1) { console.log('NOJSON ' + f); return; }
  try {
    const arr = JSON.parse(t.slice(a, b + 2));
    console.log(f.split('/').pop() + ': ' + arr.length + ' entries');
    all = all.concat(arr);
  } catch (e) { console.log('PARSE-FAIL ' + f + ': ' + e.message); }
});
console.log('TOTAL entries: ' + all.length);
// validate + apply
let ok = 0; const miss = [];
const gapset = new Set(require(DIR + 'temp/gapset.json'));
const seen = new Set();
for (const e of all) {
  const g = G.find(x => x.id === e.g);
  if (!g) { miss.push('NOGUIDE ' + e.g); continue; }
  const s = e.sec;
  if (!s || !s.heading || !s.content || !s.content_es || !s.products || !s.products.length) { miss.push('BADSHAPE ' + e.g); continue; }
  const pid = s.products[0];
  if (!P.some(p => p.id === pid)) { miss.push('NOPROD ' + e.g + ' ' + pid); continue; }
  // no prices, no first person
  const txt = s.content + ' ' + s.content_es;
  if (/\$\d|€\d|£\d/.test(txt)) { miss.push('PRICE ' + e.g + ' ' + pid); continue; }
  if (/I've|I have |My |He [a-záé]| he [a-záé]|Mi banda|mi banda|Me he |Se la he|Se lo he|Lo he |La he /.test(txt)) { miss.push('FIRSTP ' + e.g + ' ' + pid); continue; }
  // gapset already reflects true gaps
  const key = e.g + '|' + pid;
  if (!gapset.has(key)) { miss.push('NOGAP ' + key); continue; }
  if (seen.has(key)) { miss.push('DUPBATCH ' + key); continue; }
  seen.add(key);
  if (!s.heading_es) s.heading_es = s.heading;
  g.sections.push({ heading: s.heading, heading_es: s.heading_es, content: s.content, content_es: s.content_es, products: s.products });
  ok++;
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('APPLIED: ' + ok + ' MISS: ' + miss.length);
miss.slice(0, 40).forEach(m => console.log('MISS ' + m));