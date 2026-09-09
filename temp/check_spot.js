const d = require('../temp/_nat_chunk1.json');
// Check for "standard" remaining in EN — product names like "PHA-4 Standard" are fine
for (const g of d) {
  const allEn = [g.intro, g.conclusion, g.verdict, ...(g.sections||[]).map(s=>s.body||'')].join(' ');
  const matches = allEn.match(/standard/gi);
  if (matches) console.log('EN [' + g.id + '] has "standard" x' + matches.length);
  const allEs = [g.intro_es, g.conclusion_es, g.verdict_es, ...(g.sections||[]).map(s=>s.body_es||'')].join(' ');
  const esMatches = allEs.match(/estándar/gi);
  if (esMatches) console.log('ES [' + g.id + '] has "estándar" x' + esMatches.length);
}

// Spot-check specific natural rewrites
console.log('\n--- BEST-BASS-UNDER-700 verdict intro ---');
const bass = d.find(g => g.id === 'best-bass-under-700');
console.log(bass.verdict.slice(0, 400));
console.log('\n--- PRO-GUITARS intro ---');
const pro = d.find(g => g.id === 'pro-guitars');
console.log(pro.intro.slice(0, 500));
console.log('\n--- SCARLETT-VS-MOTU verdict ---');
const scar = d.find(g => g.id === 'scarlett-vs-motu');
console.log(scar.verdict.slice(0, 500));
