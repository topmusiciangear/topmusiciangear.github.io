const fs = require('fs');
for (const f of ['guides/best-nylon-guitars-for-beginners.html', 'guides/best-nylon-guitars-for-beginners_es.html']) {
  const s = fs.readFileSync(f, 'utf8');
  const facts = [...s.matchAll(/<div class="qf-value">([^<]*)<\/div><div class="qf-label">([^<]*)<\/div>/g)].map(m => m[2] + '=' + m[1]);
  console.log('=== ' + f);
  console.log('  ' + facts.join(' | '));
  console.log('  any inch in facts:', facts.some(x => /\bin\b/.test(x)));
  console.log('  25.3/25.6 anywhere:', /25\.[36] in/.test(s));
}
