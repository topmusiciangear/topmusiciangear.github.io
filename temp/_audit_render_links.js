const fs = require('fs');
const path = require('path');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p); else files.push(p); } })('guides');

let g4mAwin = 0, msAwin = 0, revAwin = 0, total = 0;
const rawProductLinks = {};
const counts = {};

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  // onl count links inside guide-product-card-stores or shop buttons region (product cards)
  const cards = body.split('<div class="guide-product-card').slice(1);
  for (let i = 0; i < cards.length; i++) {
    const seg = cards[i].split('</div>')[0] + '</div>';
    const hrefs = seg.match(/href="([^"]+)"/g) || [];
    for (const h of hrefs) {
      const u = h.slice(6, -1);
      total++;
      if (/awin1\.com/.test(u)) {
        if (/awinmid=1117/.test(u)) g4mAwin++;
        if (/awinmid=63816/.test(u)) msAwin++;
        if (/awinmid=67144/.test(u)) revAwin++;
      }
      const host = (u.match(/https?:\/\/(?:www\.)?([^/]+)/) || [])[1];
      if (/awin1/.test(u)) {
        const t = /%2F\/([^%]+)/.exec(u) || u.match(/ued=([^&]+)/);
      }
      const key = host;
      counts[key] = (counts[key] || 0) + 1;
      if (/gear4music\.com/.test(u) && !/awin1/.test(u)) rawProductLinks[path.basename(f)] = (rawProductLinks[path.basename(f)] || 0) + 1;
      if (/musicstore\.com/.test(u) && !/awin1/.test(u)) rawProductLinks[path.basename(f)] = (rawProductLinks[path.basename(f)] || 0) + 1;
      if (/andertons\.co\.uk/.test(u) && !/irgwc=1/.test(u) && !/awin1/.test(u)) rawProductLinks[path.basename(f)] = (rawProductLinks[path.basename(f)] || 0) + 1;
      if (/reverb\.com/.test(u) && !/awin1/.test(u)) rawProductLinks[path.basename(f)] = (rawProductLinks[path.basename(f)] || 0) + 1;
      if (/zzounds\.com/.test(u) && !/anrdoezrs/.test(u)) rawProductLinks[path.basename(f)] = (rawProductLinks[path.basename(f)] || 0) + 1;
      if (/pluginboutique\.com/.test(u) && !/a_aid=6a01e859cbe1a/.test(u)) rawProductLinks[path.basename(f)] = (rawProductLinks[path.basename(f)] || 0) + 1;
    }
  }
}
console.log('product-card links scanned (per page, dedup-no):', total);
console.log('g4m awinmid=1117 wraps:', g4mAwin, '| musicstore 63816:', msAwin, '| reverb 67144:', revAwin);
console.log('\n=== RAW UNWRAPPED product links by page (affiliate missing) ===');
const entries = Object.entries(rawProductLinks).sort((a, b) => b[1] - a[1]);
for (const [f, n] of entries.slice(0, 40)) console.log(`  ${f}: ${n}`);
console.log('... total pages with raw links:', entries.length);
console.log('\nhost distribution:', JSON.stringify(Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0, 20)));