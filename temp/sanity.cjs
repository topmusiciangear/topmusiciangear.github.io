const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const id of ['best-monitors', 'best-pa-speakers', 'best-multi-effects-pedals', 'pro-daw', 'beat-making', 'best-looper-pedals', 'best-instrument-mics', 'stage-wedges']) {
  const o = g.find(x => x.id === id);
  console.log('###', id);
  if (o.verdict_es) console.log(' verdict:', JSON.stringify(o.verdict_es).slice(0, 200));
  if (o.conclusion_es) console.log(' concl:', JSON.stringify(o.conclusion_es).slice(0, 200));
  if (o.featuredSnippet) {
    for (const k of Object.keys(o.featuredSnippet)) if (typeof o.featuredSnippet[k] === 'string' && o.featuredSnippet[k].includes('elecci')) console.log(' snippet.' + k + ':', JSON.stringify(o.featuredSnippet[k]).slice(0, 200));
  }
}
// search for any 'elección económica' etc.
const out = [];
function walk(o, pfx) {
  if (o == null) return;
  if (typeof o === 'string') { if (/opci[oó]n/.test(o)) out.push(pfx); return; }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']'));
  else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k));
}
walk(g, ''); console.log('count opción fields:', out.length); console.log('sample:', out.slice(0, 8).join('\n'));