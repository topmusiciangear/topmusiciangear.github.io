const fs = require('fs');
for (const f of ['guides/beginner-bass-guitars_es.html', 'guides/beginner-bass-guitars.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  const i = h.indexOf('id="sec-2"');
  const seg = h.slice(i, i + 5000);
  console.log('sec2 heading:', (seg.match(/<h2[^>]*>([^<]*)/) || [])[1]);
  console.log('sec2 photo:', (seg.match(/guide-section-img[^>]*src="([^"]+)"/) || seg.match(/src="(https?:[^"]*preview[^"]*)"/) || [])[1] || 'NONE');
  console.log('sec2 stores:', (seg.match(/data-store="[a-z0-9]+"/g) || []).join(', '));
  const t = h.slice(h.indexOf('<table class="guide-comp-table"'), h.indexOf('</table>', h.indexOf('<table class="guide-comp-table"')));
  const rows = (t.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || []);
  console.log('table row0:', (rows[0] || '').replace(/<[^>]+>/g, '|'));
  console.log('table row2:', (rows[2] || '').replace(/<[^>]+>/g, '|'));
  console.log('verdict grid first names:', (h.slice(h.indexOf('guide-verdict-grid'), h.indexOf('guide-verdict-grid') + 4000).match(/verdict-product-name">([^<]+)/g) || []).slice(0, 3).map(x => x.split('>')[1]).join(' | '));
  const c = h.indexOf('guide-conclusion');
  console.log('conclusion has GSR200:', /GSR200/.test(h.slice(c, c + 3000)));
  console.log('conclusion block:', c > 0);
  console.log('');
}
