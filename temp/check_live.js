const fs = require('fs');

async function main() {
  const url = process.argv[2];
  const html = /^https?:/.test(url)
    ? await fetch(url).then(r => r.text())
    : fs.readFileSync(url, 'utf8');

  const badges = html.match(/Nuestra nota: ([0-9.]+) sobre 10|Our score: ([0-9.]+) out of 10/g) || [];
  const scores = badges.map(b => (b.match(/([0-9.]+) (?:sobre|out of) 10/) || [])[1]);
  const titles = (html.match(/guide-product-card-title">([^<]+)/g) || []).map(t => t.replace(/.*>/, ''));

  console.log('Badges: ' + scores.length + ' | Productos: ' + titles.length);
  titles.forEach((t, i) => console.log('  ' + (scores[i] || 'SIN BADGE').padStart(5) + '  ' + t));

  const label = /guide-score-badge-label[^>]*>([^<]+)/.exec(html);
  console.log('\nEtiqueta del badge: ' + (label ? label[1] : 'NO ENCONTRADA'));
}

main();
