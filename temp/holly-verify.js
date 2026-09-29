var fs = require('fs');
['guides/wireless-lapel-mics.html', 'guides/wireless-lapel-mics_es.html', 'guides/wireless-intercom-systems.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var re = /data-store="hollyland"[^>]*class="shop-btn-primary"[\s\S]{0,12000}?data-store="reverb"[^>]*>[\s\S]*?<\/a>/;
  var m = s.match(re);
  if (!m) { console.log(f + ': no holly-primary->reverb chunk found'); return; }
  var label = /_es/.test(f) ? 'Verificar precio' : 'Check price';
  console.log(f + '  reverb row has "' + label + '":', m[0].indexOf(label) > -1, '  hasPrice:', /[$£€]\s?[0-9]/.test(m[0]));
});