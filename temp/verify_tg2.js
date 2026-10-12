var fs = require('fs');
['deals.html', 'deals_es.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var tg = s.indexOf('eals on Telegram') >= 0 ? s.indexOf('eals on Telegram') : s.indexOf('canal de Telegram');
  var main = s.indexOf('</main>');
  var page = s.indexOf('deals-page');
  console.log(f + ' inside-main:' + (tg < main) + ' centered:' + (s.indexOf('text-align:center') >= 0));
});
