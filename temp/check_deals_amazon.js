const fs = require('fs');
for (const f of ['deals.html', 'deals_es.html']) {
  if (!fs.existsSync(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  const m = [...s.matchAll(/href="(https:\/\/(?:www\.)?amazon\.[^"]+)"/g)].map(x => x[1]);
  const t = { dp: 0, home: 0, search: 0, other: 0 };
  const odd = [];
  for (const u of m) {
    if (/\/dp\/[A-Z0-9]{10}/i.test(u)) t.dp++;
    else if (/^https:\/\/(www\.)?amazon\.[a-z.]+\/?\?tag=/.test(u)) { t.home++; odd.push('HOME ' + u); }
    else if (/\/s\?|\/s\//.test(u)) { t.search++; odd.push('SEARCH ' + u.slice(0, 90)); }
    else { t.other++; odd.push('OTHER ' + u.slice(0, 90)); }
  }
  console.log(f, 'amazon links:', m.length, JSON.stringify(t));
  [...new Set(odd)].slice(0, 8).forEach(x => console.log('   ' + x));
}
