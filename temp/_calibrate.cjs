var fs = require('fs');
['best-bass-amps.html', 'best-bass-practice-amps.html'].forEach(function (f) {
  var h = fs.readFileSync('guides/' + f, 'utf8');
  console.log('== ' + f + ' | size ' + h.length);
  console.log(' title: ' + (h.match(/<title>([^<]*)<\/title>/) || [])[1]);
  console.log(' sections match /section-[0-9]+/: ' + (h.match(/id="section-[0-9]+"/g) || []).length);
  console.log(' sections match /section/x: ' + (h.match(/id="section-x/g) || []).length);
  console.log(' data-store rows: ' + (h.match(/data-store=/g) || []).length);
  console.log(' count /Rumble 40/: ' + (h.match(/Rumble 40 V3/g) || []).length);
  console.log(' price strings $270: ' + (h.match(/\$270/g) || []).length);
  console.log(' price strings $199: ' + (h.match(/\$199/g) || []).length);
  console.log(' shopButtonsTest func present: ' + (h.indexOf('function shopButtonsTest') >= 0));
  console.log(' TEST_SHOP_BTN present: ' + (h.indexOf('var TEST_SHOP_BTN') >= 0));
  var m = h.match(/Compare [0-9]+ (stores|more stores)|Compar[ar,a] [0-9]+ tiendas/g);
  console.log(' counter sample: ' + (m || []).slice(0, 2).join(' | '));
  console.log(' img 490 cdn: ' + (h.indexOf('2370300000v1_hi') >= 0));
});