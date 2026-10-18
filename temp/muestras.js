const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const st = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

function todas() {
  const out = [];
  guides.forEach(g => {
    const meter = (r, v) => { if (typeof v === 'string') out.push([g.id, r, v]); };
    ['intro_es', 'conclusion_es', 'description_es'].forEach(k => meter(k, g[k]));
    (g.sections || []).forEach((s, i) => { meter('sec' + i, s.content_es); });
    (g.verdictProsCons || []).forEach((v, i) => (v.pros_es || []).forEach(x => meter('pros' + i, x)));
    (g.faq || []).forEach((f, i) => meter('faq' + i, f.a_es));
  });
  return out;
}
const todos = todas();
const claves = process.argv.slice(2);
claves.forEach(k => {
  console.log('\n########## ' + k);
  let n = 0;
  todos.forEach(([id, r, v]) => {
    const t = st(v); const i = t.toLowerCase().indexOf(k.toLowerCase());
    if (i >= 0 && n < 6) { console.log('  [' + id + ' ' + r + '] ...' + t.slice(Math.max(0, i - 60), i + 70) + '...'); n++; }
  });
  console.log('  total: ' + todos.filter(([, , v]) => st(v).toLowerCase().indexOf(k.toLowerCase()) >= 0).length);
});