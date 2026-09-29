// Re-score already-fetched results with the current comparator (no network).
const fs = require('fs');
const { similarity } = require('./amz_sim.js');

const IN = 'temp/amz_live_results.json';
const results = JSON.parse(fs.readFileSync(IN, 'utf8'));
const rows = Object.values(results);

let changed = 0;
rows.forEach(r => {
  if (!r.amzTitle) return;
  const sim = similarity(r.title, r.amzTitle);
  const old = r.verdict;
  r.score = sim.score;
  r.missing = sim.missing;
  // keep transport verdicts (BLOCKED / NOT_FOUND / SEARCH_URL / HTTP_*), only re-evaluate content
  if (old === 'OK' || old === 'TITLE_MISMATCH') {
    r.verdict = sim.score < 0.7 ? 'TITLE_MISMATCH' : 'OK';
  }
  if (old !== r.verdict) changed++;
});

const tally = {};
rows.forEach(r => { tally[r.verdict] = (tally[r.verdict] || 0) + 1; });
console.log('=== VERDICTS AFTER RESCORE (' + rows.length + ' rows) ===');
Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
console.log('\nreclassified: ' + changed + '\n');

console.log('=== STILL-FLAGGED (need human check) ===');
rows.filter(r => r.verdict === 'TITLE_MISMATCH' || r.verdict === 'NOT_FOUND' || r.verdict === 'SEARCH_URL' || r.verdict === 'REDIRECT_TO_SEARCH')
  .sort((a, b) => a.id - b.id)
  .forEach(r => {
    console.log('  #' + String(r.id).padStart(3) + ' [' + r.verdict + '] ' + (r.field || 'stores.amazon'));
    console.log('      OURS:   ' + r.title);
    console.log('      URL:    ' + (r.url || '').slice(0, 100));
    console.log('      AMAZON: ' + (r.amzTitle || '-'));
    if (r.missing && r.missing.length) console.log('      MISSING: ' + r.missing.join(', '));
  });

const ok = rows.filter(r => r.verdict === 'OK');
console.log('\n=== OK, LOWEST SCORES (variant risk) ===');
ok.sort((a, b) => a.score - b.score).slice(0, 30).forEach(r => {
  console.log('  #' + String(r.id).padStart(3) + ' ' + r.asin + ' score=' + r.score + (r.unbuyable ? ' UNBUYABLE' : '') + ' | ' + r.title);
  console.log('        ' + r.amzTitle);
});

const unb = rows.filter(r => r.unbuyable);
console.log('\n=== UNBUYABLE LISTINGS (' + unb.length + ') ===');
unb.forEach(r => console.log('  #' + String(r.id).padStart(3) + ' ' + r.asin + ' | ' + r.title));

fs.writeFileSync(IN, JSON.stringify(results, null, 1));
console.log('\nupdated -> ' + IN);
