const fs = require('fs');
for (const f of ['guides/best-home-studio-speakers_es.html', 'guides/best-home-studio-speakers.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const s = h.indexOf('<table class="guide-comp-table"');
  const e = h.indexOf('</table>', s);
  const t = h.slice(s, e);
  console.log('=== ' + f + ' ===');
  const heads = (t.match(/<th[^>]*>[\s\S]*?<\/th>/g) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
  console.log('HEADERS:', JSON.stringify(heads));
  const rows = (t.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || []);
  rows.forEach(r => {
    const cells = (r.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/g) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
    console.log(JSON.stringify(cells));
  });
  console.log('');
}
