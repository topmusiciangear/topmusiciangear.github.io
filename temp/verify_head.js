const fs = require('fs');
const base = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const chk = (f, s) => {
  const t = fs.readFileSync(base + f, 'utf8');
  console.log(f + ' [' + s.slice(0, 44) + '] = ' + (t.includes(s) ? 'OK' : 'MISSING'));
};
chk('best-multi-effects-pedals.html', 'Helix Tone in a Stompbox');
chk('best-multi-effects-pedals.html', 'Knobs Instead of Menus');
chk('best-multi-effects-pedals.html', 'Clone Your Amp');
chk('best-multi-effects-pedals_es.html', 'Perillas en vez de menús');
chk('best-multi-effects-pedals_es.html', 'Clona tu ampli');
chk('best-multi-effects-pedals.html', 'media/48/481497/1200/preview.jpg');
chk('best-multi-effects-pedals.html', 'media/86/866574/1200/preview.jpg');
chk('best-multi-effects-pedals.html', 'media/69/690954/1200/preview.jpg');
