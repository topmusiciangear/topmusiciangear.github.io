var fs = require('fs');
['best-bass-practice-amps.html', 'best-bass-practice-amps_es.html'].forEach(function (f) {
  var p = 'guides/' + f;
  var h = fs.readFileSync(p, 'utf8');
  console.log('== ' + f + ' | size ' + h.length);
  console.log(' title: ' + (h.match(/<title>([^<]*)<\/title>/) || [])[1]);
  console.log(' sections: ' + (h.match(/id="section-[0-9]+"/g) || []).length);
  console.log(' shopButtonsTest embedded: ' + (h.indexOf('function shopButtonsTest') >= 0 ? 'yes' : 'no'));
  console.log(' data-store rows: ' + (h.match(/data-store=/g) || []).length);
  var m = h.match(/Compare [0-9]+ (stores|more stores)|Comparar [0-9]+ tiendas|Compara [0-9]+ tiendas/g);
  console.log(' counter label: ' + (m || []).slice(0, 3).join(' | '));
  ['489', '490', '491', '492', '293', '485'].forEach(function (id) {
    var has = h.indexOf('"id":' + id) >= 0 || h.indexOf('data-id="' + id + '"') >= 0;
    console.log('   product ' + id + ' present: ' + (has ? 'yes' : 'NO'));
  });
  console.log(' geo-block inline: ' + (h.indexOf('quickTarget') >= 0 ? 'yes' : 'no'));
  console.log(' disclaimer: ' + (h.indexOf('Atención') >= 0 || h.indexOf('Attention') >= 0 ? 'yes' : 'no'));
});