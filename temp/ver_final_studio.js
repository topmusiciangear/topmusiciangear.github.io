const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  console.log('\n' + '='.repeat(70));
  console.log('  ' + f);
  console.log('='.repeat(70));

  const t = (d.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  console.log('\n<title> (' + t.length + 'c): ' + t);

  // la seccion de presupuestos
  const h = f.includes('_es') ? 'Los tres presupuestos' : 'The Three Budgets';
  const i = d.indexOf(h);
  if (i > -1) {
    const frag = d.slice(i, i + 4500);
    const txt = frag.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('\n' + txt.slice(0, 1500));
  }

  // tabla completa
  const tbl = d.match(/<table[\s\S]*?<\/table>/);
  if (tbl) {
    console.log('\n--- TABLA ---');
    [...tbl[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
      const celdas = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
      if (celdas.length) console.log('  ' + celdas.join(' | '));
    });
  }
});
