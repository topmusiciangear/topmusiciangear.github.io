const fs = require('fs');
const files = ['guides/sm57-vs-sm58.html', 'guides/scarlett-vs-motu.html', 'guides/guitar-pedals.html', 'guides/best-reverb-delay.html', 'guides/pro-daw.html', 'guides/best-electric-guitar.html', 'guides/deals.html', 'guides/best-guitar-home-office.html'];
files.forEach(f => {
  let h;
  try { h = fs.readFileSync(f, 'utf8'); } catch (e) { console.log(f + ' NO EXISTE'); return; }
  const tm = h.match(/<title>([\s\S]*?)<\/title>/);
  const t = tm ? tm[1] : '?';
  const dm = h.match(/<meta name="description" content="([\s\S]*?)">/);
  const d = dm ? dm[1] : 'SIN META';
  console.log(f.replace('guides/', ''));
  console.log('  T(' + t.length + '): ' + t);
  console.log('  D(' + d.length + '): ' + d.slice(0, 130));
});
