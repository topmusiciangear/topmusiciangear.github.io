const fs = require('fs');
const files = ['guides/best-nylon-guitars-for-beginners.html', 'guides/best-nylon-guitars-for-beginners_es.html'];
const checks = [
  ['Tapa maciza', 'EN/ES term'],
  ['tapa maciza', 'ES term'],
  ['tapa sólida', 'OLD ES term (must be 0)'],
  ['Tapa sólida', 'OLD ES term (must be 0)'],
  ['punchy', 'OLD (must be 0)'],
  ['50.8 mm', 'OLD decimal (ES must be 0)'],
  ['50,8 mm', 'ES decimal'],
  ['1 7/8', 'inches in ES cons'],
  ['47,6 mm', 'ES decimal nut'],
  ['Margen dinámico limitado', 'ES cons fix'],
  ['Cabida dinámica', 'OLD (must be 0)'],
  ['Ibanez GA35TCE</span> amplifies', 'EN conclusion new'],
  ['Ibanez GA35TCE</span> amplifica', 'ES conclusion new'],
  ['deja deslizar la mano', 'ES finish'],
  ['se siente rápido', 'OLD (must be 0)'],
  ['electroclásica', 'ES unify'],
  ['electro-clásica', 'OLD hyphen (must be 0)'],
  ['estudiantes que empiezan', 'ES verdict2'],
  ['guide-section-buy', 'section buttons'],
  ['No disponible', 'na rows'],
  ['Agotado', 'oos rows']
];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('===', f, '(bytes', h.length + ')');
  for (const [needle, why] of checks) {
    const n = h.split(needle).length - 1;
    if (n === 0 && !/must be 0/.test(why)) console.log('  MISSING', needle, '(' + why + ')');
    else if (n > 0 && /must be 0/.test(why)) console.log('  LEFTOVER', needle, n, '(' + why + ')');
  }
  console.log('  section buy blocks:', (h.match(/store-buttons guide-section-buy/g) || []).length);
  console.log('  h1:', (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] ? 'ok' : 'MISSING');
  console.log('  canonical:', (h.match(/rel="canonical" href="([^"]+)"/) || [])[1]);
  console.log('  hreflang es:', (h.match(/hreflang="es" href="([^"]+)"/) || [])[1]);
  console.log('  title:', (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
  console.log('  desc:', ((h.match(/name="description" content="([^"]*)"/) || [])[1] || '').length, 'chars');
}
