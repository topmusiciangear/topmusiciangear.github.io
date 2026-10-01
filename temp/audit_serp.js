const fs = require('fs');
const files = ['guides/budget-mics.html', 'guides/midi-controllers.html', 'guides/best-live-sound-mixers.html', 'guides/best-wireless-iems.html', 'guides/scarlett-vs-ssl.html', 'guides/sm7b-vs-nt1.html', 'guides/best-guitar-home-office.html', 'guides/player-strat-vs-pacifica.html', 'guides/studio-subwoofers.html', 'guides/mics-for-creators.html', 'guides/best-guitar-home-office_es.html'];
files.forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const tm = h.match(/<title>([\s\S]*?)<\/title>/);
  const t = tm ? tm[1] : '?';
  const dm = h.match(/<meta name="description" content="([\s\S]*?)">/);
  const d = dm ? dm[1] : 'SIN META';
  const h1 = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  console.log(f.replace('guides/', ''));
  console.log('  T(' + t.length + '): ' + t);
  console.log('  D(' + d.length + '): ' + d.slice(0, 140));
});
