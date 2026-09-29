const fs = require('fs');
const dir = 'guides';
let n = 0, en = 0, es = 0;
const bad = [];
const EN = [
  'href="/affiliate-disclosure.html"',
  'All rights reserved.',
  'Built by a musician, for musicians.',
  'More info'
];
const ES = [
  'href="/es/affiliate-disclosure.html"',
  'Todos los derechos reservados.',
  'Hecho por un músico, para músicos.',
  'M\u00e1s info'
];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  n++;
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  const hits = (c.match(/id="disclosureLink"/g) || []).length;
  if (hits !== 1) { bad.push(f + ' :: disclosureLink x' + hits); continue; }
  const isEs = f.endsWith('_es.html');
  const need = isEs ? ES : EN;
  const missing = need.filter((s) => c.indexOf(s) === -1);
  if (missing.length) { bad.push(f + ' :: missing ' + JSON.stringify(missing)); continue; }
  const mojibake = /[\u00C2\u00C3\u00E2][\u0080-\u00BF\u00A0-\u00FF]/.test(c.slice(c.indexOf('<footer>'), c.indexOf('</footer>')));
  if (mojibake) { bad.push(f + ' :: mojibake in footer'); continue; }
  if (isEs) es++; else en++;
}
console.log('total=' + n + '  EN=' + en + '  ES=' + es);
if (bad.length) {
  console.log('PROBLEMS (' + bad.length + '):');
  bad.slice(0, 20).forEach((b) => console.log('  ' + b));
  process.exitCode = 1;
} else {
  console.log('ALL OK');
}
