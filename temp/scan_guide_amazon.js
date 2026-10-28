const fs = require('fs');
const files = fs.readdirSync('guides').filter(f => f.endsWith('.html'));

const tally = { dp: 0, home: 0, search: 0, other: 0 };
const offenders = [];
const asins = new Set();
for (const f of files) {
  const s = fs.readFileSync('guides/' + f, 'utf8');
  for (const m of s.matchAll(/data-store="amazon" href="([^"]*)"/g)) {
    const u = m[1];
    const a = (u.match(/\/dp\/([A-Z0-9]{10})/i) || [])[1];
    if (a) { tally.dp++; asins.add(a.toUpperCase()); continue; }
    if (/^https:\/\/(www\.)?amazon\.[a-z.]+\/?\?tag=/.test(u)) { tally.home++; offenders.push(['HOME', f, u]); }
    else if (/\/s\?|\/s\//.test(u)) { tally.search++; offenders.push(['SEARCH', f, u]); }
    else { tally.other++; offenders.push(['OTHER', f, u]); }
  }
}
console.log('guide pages scanned:', files.length);
console.log('amazon rows:', JSON.stringify(tally), '| unique ASINs in guides:', asins.size);

const byType = {};
for (const [t, f, u] of offenders) (byType[t] = byType[t] || new Set()).add(u);
for (const t of Object.keys(byType)) {
  console.log('\n' + t + ' (' + byType[t].size + ' urls distintas):');
  let n = 0;
  for (const u of byType[t]) {
    const pages = offenders.filter(o => o[0] === t && o[2] === u).map(o => o[1]);
    console.log('  ' + u.slice(0, 130) + '   [' + pages.length + ' paginas: ' + pages.slice(0, 3).join(', ') + (pages.length > 3 ? '…' : '') + ']');
    if (++n > 12) { console.log('  …'); break; }
  }
}
fs.writeFileSync('temp/amazon_guide_offenders.json', JSON.stringify(offenders, null, 1));
fs.writeFileSync('temp/amazon_guide_asins.json', JSON.stringify([...asins], null, 1));
