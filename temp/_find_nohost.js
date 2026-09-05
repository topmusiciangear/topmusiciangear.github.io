const fs = require('fs');
const path = require('path');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p); else files.push(p); } })('guides');
const seen = [];
for (const file of files) {
  const h = fs.readFileSync(file, 'utf8');
  const body = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  const cards = body.split('<div class="guide-product-card').slice(1);
  for (const cardRaw of cards) {
    const card = cardRaw.split('</div>')[0];
    const hrefs = card.match(/href="([^"]*)"/g) || [];
    for (const hh of hrefs) {
      const u = hh.slice(6, -1);
      const host = (u.match(/https?:\/\/(?:www\.)?([^/]+)/) || [])[1];
      if (!host) seen.push({ file: path.basename(file), raw: u, around: card.slice(0, 40).replace(/\s+/g, ' ').slice(0, 60) });
    }
  }
}
console.log('no-host hrefs in cards:', seen.length);
for (const s of seen) console.log(`  ${s.file} raw="${s.raw}" near:${s.around}`);