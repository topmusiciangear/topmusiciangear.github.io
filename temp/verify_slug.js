const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(38) + (extra || '')); };

const NEW = 'bridge-cast-x-vs-rodecaster-pro2';
const OLD = 'rodecaster-pro2-vs-bridgecast-x';

console.log('=== 1. PAGINA REAL EN LA URL NUEVA ===');
['', '_es'].forEach(function (sfx) {
  const f = 'guides/' + NEW + sfx + '.html';
  if (!fs.existsSync(BASE + f)) { ck(f, false, 'NO EXISTE'); return; }
  const h = fs.readFileSync(BASE + f, 'utf8');
  const size = h.length;
  const isReal = size > 20000 && /<h1/.test(h) && /Product|Comparativa/i.test(h);
  ck(f, isReal, size + ' bytes, pagina real=' + isReal);
  ck('  canonical = URL nueva', (h.match(/rel="canonical" href="([^"]+)"/) || [])[1].indexOf(NEW) > -1, (h.match(/rel="canonical" href="([^"]+)"/) || [])[1]);
  ck('  og:url = URL nueva', !/og:url/.test(h) || (h.match(/property="og:url" content="([^"]+)"/) || [])[1].indexOf(NEW) > -1);
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  ck('  title: Bridge Cast X primero', t.indexOf('Bridge Cast X') < t.indexOf('RØDECaster'), t);
  ck('  og:image = Bridge Cast X', (h.match(/property="og:image" content="([^"]+)"/) || [])[1].indexOf('1038820') > -1);
  ck('  hreflang EN <-> ES', /href="\/guides\//.test(h));
});

console.log('\n=== 2. STUBS DE REDIRECCION AL CANONICO NUEVO ===');
[OLD, 'bridge-cast-x-vs-rodecaster', 'bridgecast-x-vs-rodecaster-pro2'].forEach(function (s) {
  ['', '_es'].forEach(function (sfx) {
    const f = 'guides/' + s + sfx + '.html';
    if (!fs.existsSync(BASE + f)) { ck(f, false, 'NO EXISTE'); return; }
    const c = fs.readFileSync(BASE + f, 'utf8');
    const ok = c.indexOf(NEW + (sfx || '') + '.html') > -1 && /noindex/.test(c) && /rel="canonical"/.test(c);
    ck(f, ok, (c.length > 20000 ? '[!!] ES UNA PAGINA REAL, no un stub' : 'stub ' + c.length + 'b'));
  });
});

console.log('\n=== 3. SITEMAP ===');
const sm = fs.readFileSync(BASE + 'sitemap.xml', 'utf8');
ck('sitemap tiene URL nueva EN', sm.indexOf('/guides/' + NEW + '.html') > -1);
ck('sitemap tiene URL nueva ES', sm.indexOf('/guides/' + NEW + '_es.html') > -1);
ck('sitemap NO tiene URL vieja EN', sm.indexOf('/guides/' + OLD + '.html<') === -1);
ck('sitemap NO tiene URL vieja ES', sm.indexOf('/guides/' + OLD + '_es.html<') === -1);

console.log('\n=== 4. GUIDES.JSON ===');
const d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
ck('id nuevo existe', d.some(x => x.id === NEW));
ck('id viejo ya no existe', !d.some(x => x.id === OLD));
let brokenRel = 0;
d.forEach(x => (x.relatedGuides || []).forEach(function (r) { if (!d.some(y => y.id === r)) { console.log('       [!!] ' + x.id + ' -> relatedGuide inexistente: ' + r); brokenRel++; } }));
ck('todos los relatedGuides existen', brokenRel === 0);

console.log('\n=== 5. OTRAS PAGINAS QUE ENLAZABAN AL SLUG VIEJO ===');
let stale = [];
fs.readdirSync(BASE + 'guides').forEach(function (f) {
  if (!f.endsWith('.html')) return;
  if (f.indexOf(NEW) > -1 || f === OLD + '.html' || f === OLD + '_es.html') return;
  const c = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  if (c.indexOf(OLD) > -1) stale.push(f);
});
ck('ninguna otra pagina enlaza al slug viejo', stale.length === 0, stale.join(', '));

console.log(fail === 0 ? '\nTODAS LAS COMPROBACIONES OK' : '\nFALLOS: ' + fail);
process.exit(fail === 0 ? 0 : 1);