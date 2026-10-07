const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const byId = id => {
  const g = G.find(v => v.id === id);
  if (!g) throw new Error('guide not found: ' + id);
  return g;
};
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 80));
  return txt.split(from).join(to);
}

// 1) best-reverb-delay: RC-5 section gets products [200]
{
  const g = byId('best-reverb-delay');
  const sec = g.sections.find(s => /RC-5 Loop Station the Best Looper/.test(s.heading || ''));
  if (!sec) throw new Error('RC-5 section not found');
  if (JSON.stringify(sec.products) !== '[]') throw new Error('RC-5 section already has products');
  sec.products = [200];
  console.log('1) RC-5 section -> [200]');
}

// 2) best-multi-effects-pedals: Moore -> Mooer + 20min -> 30min looper
{
  const g = byId('best-multi-effects-pedals');
  let t = JSON.stringify(g);
  const nameCount = t.split('"Moore GE300"').length - 1;
  if (nameCount !== 4) throw new Error('expected 4x Moore GE300, found ' + nameCount);
  t = t.split('"Moore GE300"').join('"Mooer GE300"');
  t = rep1(t, 'IR loader, 20 min looper', 'IR loader, 30-min looper');
  t = rep1(t, 'Cargador IR, looper 20 min', 'Cargador IR, looper de 30 min');
  const ng = JSON.parse(t);
  const i = G.findIndex(v => v.id === 'best-multi-effects-pedals');
  G[i] = ng;
  console.log('2) Mooer rename + 30-min looper');
}

// 3) HX Stomp table price ~$599.99 -> $599.99 (verified: amazon/zzounds $599.99)
{
  let n = 0;
  ['best-multi-effects-pedals', 'best-amp-modelers'].forEach(id => {
    const g = byId(id);
    const row = g.productTable.rows.find(r => r.label === 'Estimated Price');
    if (!row) throw new Error('no price row in ' + id);
    if (row.values[0].value !== '~$599.99') throw new Error('unexpected HX cell in ' + id + ': ' + row.values[0].value);
    row.values[0].value = '$599.99';
    row.values[0].value_es = '$599.99';
    n++;
  });
  console.log('3) HX price cells fixed in ' + n + ' guides');
}

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
