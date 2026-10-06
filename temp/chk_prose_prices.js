const fs = require('fs');
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const paras = h.match(/<p>[\s\S]*?<\/p>/g) || [];
  let n = 0;
  for (const p of paras) {
    const m = p.match(/\$[0-9][0-9,.]*/g);
    if (m) { n++; console.log('==', f, '|', m.join(' ')); console.log(p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').slice(0, 320)); console.log(''); }
  }
  if (!n) console.log('==', f, ': no $ in <p> prose');
}
