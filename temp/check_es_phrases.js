const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const patrones = [
  { re: /supera el presupuesto/gi, d: 'supera el presupuesto' },
  { re: /punto ideal/gi, d: 'punto ideal' },
  { re: /punto dulce/gi, d: 'punto dulce' },
  { re: /punto medio/gi, d: 'punto medio' },
  { re: /mejor elección/gi, d: 'mejor elección' },
  { re: /la mejor elección/gi, d: 'la mejor elección' },
  { re: /en el presupuesto/gi, d: 'en el presupuesto' },
  { re: /fuera de presupuesto/gi, d: 'fuera de presupuesto' },
  { re: /mejor opción/gi, d: 'mejor opción' },
];

let restantes = 0;
function scan(t, ctx) {
  if (typeof t !== 'string') return;
  for (const pat of patrones) {
    if (pat.re.test(t)) { restantes++; if (restantes < 40) console.log('  [' + ctx + '] ' + pat.d); }
    pat.re.lastIndex = 0;
  }
}

for (const g of guides) {
  for (const f of ['verdict_es', 'conclusion_es', 'intro_es', 'metaDesc_es']) scan(g[f], g.id + '.' + f);
  for (const s of (g.sections || [])) { scan(s.content_es, g.id + '.content'); scan(s.heading_es, g.id + '.heading'); }
  for (const f of (g.faq || [])) { scan(f.q_es, g.id + '.q'); scan(f.a_es, g.id + '.a'); }
  for (const v of (g.verdictProsCons || [])) { scan(v.pros_es, g.id + '.pros'); scan(v.cons_es, g.id + '.cons'); }
}
for (const p of products) { scan(p.desc_es, 'prod ' + p.id); scan(p.title_es, 'prod ' + p.id); }

console.log('Frases mal traducidas restantes: ' + restantes);
