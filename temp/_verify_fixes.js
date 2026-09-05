const fs = require('fs');
const checks = {
  'blx288-vs-ewd.html': null,
  'blx288-vs-ewd_es.html': null,
  'stage-wireless.html': null,
  'mics-for-creators.html': null,
  'usb-mics.html': null,
  'best-instrument-mics.html': null,
  'best-electric-guitar.html': null,
  'best-electric-guitars-2026.html': null,
  'best-live-sound-mixers.html': null,
  'best-live-sound-mixers_es.html': null,
};
for (const f of Object.keys(checks)) {
  const p = 'guides/' + f;
  if (!fs.existsSync(p)) { console.log(f, 'MISSING'); continue; }
  const h = fs.readFileSync(p, 'utf8');
  const bad = [];
  for (const t of ['href="€', 'href="$', 'href="£', 'B0BJ62PZV2', '€99.00', '€125.21', '€1,199.00', '€1,847.90', '€217.60', '$2,499']) {
    if (h.indexOf(t) >= 0) bad.push(t + 'x' + (h.split(t).length - 1));
  }
  const ok = bad.length ? 'BAD: ' + bad.join(', ') : 'OK';
  const m = h.match(/Sennheiser EW-D[^<]{0,40}/);
  console.log(f, '=>', ok);
}