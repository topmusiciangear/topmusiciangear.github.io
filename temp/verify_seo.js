const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(48) + (extra || '')); };

console.log('=== TU GUIA: best-guitar-home-office ===');
['guides/best-guitar-home-office.html', 'guides/best-guitar-home-office_es.html'].forEach(function (f) {
  const h = fs.readFileSync(BASE + f, 'utf8');
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const og = (h.match(/property="og:title" content="([^"]*)"/) || [])[1] || '';
  const h1 = ((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  console.log('  --- ' + f + ' ---');
  console.log('      <title> [' + t.length + ']: ' + JSON.stringify(t));
  console.log('      og:title[' + og.length + ']: ' + JSON.stringify(og));
  console.log('      desc     [' + d.length + ']: ' + JSON.stringify(d));
  console.log('      <h1>     [' + h1.length + ']: ' + JSON.stringify(h1));
  ck('  title <= 60', t.length <= 60, t.length + ' chars');
  ck('  desc <= 155', d.length <= 155, d.length + ' chars');
  ck('  sin "(2026)"', !/2026/.test(t));
});

console.log('\n=== TODAS LAS 314 PAGINAS ===');
const files = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html') && fs.statSync(BASE + 'guides/' + f).size > 20000);
let badT = 0, badD = 0, badYear = 0, worstT = 0, worstD = 0;
files.forEach(function (f) {
  const h = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  worstT = Math.max(worstT, t.length);
  worstD = Math.max(worstD, d.length);
  if (t.length > 60) { badT++; console.log('      TITLE LARGO ' + t.length + '  ' + f); }
  if (d.length > 155) { badD++; console.log('      DESC LARGA  ' + d.length + '  ' + f); }
  if (/202[0-9]/.test(t)) { badYear++; console.log('      CON AÑO     ' + f); }
});
ck('paginas analizadas = 314', files.length === 314, files.length + '');
ck('ningun <title> > 60', badT === 0, badT + ' offender(s)  |  max: ' + worstT);
ck('ninguna meta desc > 155', badD === 0, badD + ' offender(s)  |  max: ' + worstD);
ck('ningun <title> con año', badYear === 0, badYear + '');
ck('todas tienen meta description', files.every(f => /name="description"/.test(fs.readFileSync(BASE + 'guides/' + f, 'utf8'))));
ck('todas tienen <h1>', files.every(f => /<h1/.test(fs.readFileSync(BASE + 'guides/' + f, 'utf8'))));

console.log('\n=== el año sigue en el schema (correcto) ===');
const one = fs.readFileSync(BASE + 'guides/best-guitar-home-office.html', 'utf8');
const ld = (one.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/) || [''])[0];
const yr = ld.match(/20\d\d/g);
console.log('  años en el JSON-LD: ' + (yr ? Array.from(new Set(yr)).join(', ') : 'ninguno'));
const body = (one.match(/guide-author-box-name">([^<]*)</) || [])[1];
console.log('  firma de autor: ' + (body ? body.replace(/&#\d+;/g, '').trim() : '(no encontrada)'));

console.log('\n' + (fail === 0 ? 'TODO CORRECTO' : 'FALLOS: ' + fail));
process.exit(fail === 0 ? 0 : 1);