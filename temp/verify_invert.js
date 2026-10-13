const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(30) + (extra || '')); };

['guides/rodecaster-pro2-vs-bridgecast-x.html', 'guides/rodecaster-pro2-vs-bridgecast-x_es.html'].forEach(function (p) {
  const h = fs.readFileSync(BASE + p, 'utf8');
  console.log('=== ' + p + ' ===');
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  ck('title: Bridge Cast X primero', t.indexOf('Bridge Cast X') > -1 && t.indexOf('Bridge Cast X') < t.indexOf('RØDECaster'), t);
  ck('og:image = 1038820', (h.match(/property="og:image" content="([^"]+)"/) || [])[1].indexOf('1038820') > -1);
  ck('twitter:image = 1038820', (h.match(/name="twitter:image" content="([^"]+)"/) || [])[1].indexOf('1038820') > -1);
  ck('canonical intacto', (h.match(/rel="canonical" href="([^"]+)"/) || [])[1].indexOf('rodecaster-pro2-vs-bridgecast-x') > -1);

  const tbl = (h.match(/guide-comp-table[\s\S]*?<\/table>/) || [])[0] || '';
  const ths = (tbl.match(/<th[^>]*>([\s\S]*?)<\/th>/g) || []).map(x => x.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
  console.log('       cabeceras: ' + ths.slice(0, 2).join('   ||   '));
  ck('columna 1 = Bridge Cast X', /Bridge Cast X/i.test(ths[0] || ''));

  // orden real de la primera fila de datos
  const firstRow = (tbl.match(/<tr>(?:(?!<\/tr>)[\s\S])*?<\/tr>/g) || [])[1] || '';
  const firstVal = (firstRow.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || []).slice(1).map(x => x.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  console.log('       1a fila valores: ' + firstVal.slice(0, 2).join('   ||   '));
  ck('fila 1 col 1 = dato del Bridge Cast X', /499|gamer|gaming|Consola de|Mezclador de|Streaming Mixer/i.test(firstVal[0] || ''), firstVal[0]);

  // secciones en orden
  const heads = [];
  const re = /guide-section-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/g; let m;
  while ((m = re.exec(h)) !== null) heads.push(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  if (heads.length) {
    heads.forEach(x => console.log('       seccion: ' + x));
    const bIdx = heads.findIndex(x => /Bridge Cast X/i.test(x));
    const rIdx = heads.findIndex(x => /RØDECaster/i.test(x));
    if (bIdx > -1 && rIdx > -1) ck('seccion Bridge Cast X va antes', bIdx < rIdx);
  }
  console.log('');
});

console.log('=== STUBS DE REDIRECCION ===');
['bridge-cast-x-vs-rodecaster-pro2', 'bridge-cast-x-vs-rodecaster', 'bridgecast-x-vs-rodecaster-pro2'].forEach(s => {
  ['.html', '_es.html'].forEach(ext => {
    const f = 'guides/' + s + ext;
    if (!fs.existsSync(BASE + f)) { console.log('  [!!] FALTA ' + f); fail++; return; }
    const c = fs.readFileSync(BASE + f, 'utf8');
    const ok = /rodecaster-pro2-vs-bridgecast-x(_es)?\.html/.test(c) && /noindex/.test(c) && /rel="canonical"/.test(c);
    ck(f.replace('guides/', ''), ok);
  });
});

console.log(fail === 0 ? '\nTODAS LAS COMPROBACIONES OK' : '\nFALLOS: ' + fail);
process.exit(fail === 0 ? 0 : 1);