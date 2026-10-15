const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + f, 'utf8');
  const es = f.endsWith('_es.html');
  console.log('\n=== ' + f + ' ===');

  // tarjetas
  const ids = [...new Set([...d.matchAll(/openReviewModal\((\d+)\)/g)].map(m => Number(m[1])))];
  console.log('  tarjetas de producto : ' + ids.length);
  console.log('  684 Eris / 19 HS8 / 20 Rokit7 : ' + [684, 19, 20].map(i => (ids.includes(i) ? 'si' : 'NO')).join(' / '));
  console.log('  633 Rokit5 / 116 JBL        : ' + [633, 116].map(i => (ids.includes(i) ? 'AUN (mal)' : 'fuera ok')).join(' / '));

  // veredictos 4+4
  const partes = d.split('<div class="verdict-product-name">').slice(1);
  const malos = partes.filter(b =>
    ((b.split('verdict-pros-list')[1] || '').split('</ul>')[0].match(/<li>/g) || []).length < 4 ||
    ((b.split('verdict-cons-list')[1] || '').split('</ul>')[0].match(/<li>/g) || []).length < 4);
  console.log('  veredictos            : ' + partes.length + '   con 4+4: ' + (partes.length - malos.length));

  // tabla
  const tbl = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
  const ths = [...tbl.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  console.log('  tabla                 : ' + ths.length + ' columnas');
  [...tbl.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
    const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (!c.length) return;
    const iMon = c.findIndex(x => /Eris Studio 5 \(/.test(x));
    const iCos = c.findIndex(x => /^~\$/.test(x));
    if (iMon > -1) console.log('      Monitores N2: ' + c[iMon]);
    if (iCos > -1) console.log('      ' + c[0] + ': ' + c.slice(1).join(' | '));
  });

  // precios viejos / LCD
  console.log('  precios viejos ($998/$1.077/$2.537): ' + (d.match(/\$998|\$1\.077|\$1,077|\$2\.537|\$2,537/g) || []).length);
  console.log('  "LCD"                             : ' + (d.match(/LCD/g) || []).length);
  console.log('  "Rokit 5 G5" / "JBL 305P"          : ' + (d.match(/Rokit 5 G5/g) || []).length + ' / ' + (d.match(/JBL 305P/g) || []).length);
  console.log('  mojibake                          : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
  console.log('  titulos de seccion duplicados     : ' + (() => {
    const h = [...d.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    const dup = h.filter((x, i) => h.indexOf(x) !== i);
    return dup.length ? dup.join(' | ') : 'ninguno';
  })());
});
