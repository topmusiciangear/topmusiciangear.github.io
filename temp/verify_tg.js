var fs = require('fs');
['deals.html', 'deals_es.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var tg = s.indexOf('Join the Telegram channel') >= 0 ? s.indexOf('Join the Telegram channel') : s.indexOf('nete al canal de Telegram');
  var grid = s.indexOf('id="dealsGrid"');
  var foot = s.indexOf('<footer');
  console.log(f + ' grid<' + (grid < tg) + ' tg<foot:' + (tg < foot) + ' tagline:' + (s.indexOf('Hecho por un m') >= 0 || s.indexOf('Built by a musician') >= 0));
});
