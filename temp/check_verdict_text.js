const fs = require('fs');
for (const f of ['guides/monitor-setup.html', 'guides/monitor-setup_es.html']) {
  const s = fs.readFileSync(f, 'utf8');
  const i = s.indexOf('<div class="verdict-text">');
  const j = s.indexOf('</div>', i);
  console.log('\n### ' + f);
  console.log(s.slice(i, j + 6).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}
