var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }
function dump(id, fn) {
  var x = byId(id);
  console.log('== ' + id + ' ==');
  fn(x);
}

// [9] portable-interfaces verdictProsCons[1]
dump('portable-interfaces', function (x) {
  console.log('verdictProsCons[1] = ' + JSON.stringify(x.verdictProsCons[1], null, 1));
});

// [75] best-practice-amps verdictProsCons[0]
dump('best-practice-amps', function (x) {
  console.log('verdictProsCons[0] = ' + JSON.stringify(x.verdictProsCons[0], null, 1));
});

// [54] stage-wireless faq_a1 + en/es
dump('stage-wireless', function (x) {
  console.log('faq_a1_en = ' + JSON.stringify(x.featuredSnippet.faq_a1_en));
  console.log('faq_a1_es = ' + JSON.stringify(x.featuredSnippet.faq_a1_es));
  console.log('faq_a2_en = ' + JSON.stringify(x.featuredSnippet.faq_a2_en));
  console.log('faq_a2_es = ' + JSON.stringify(x.featuredSnippet.faq_a2_es));
});

// [103] pro-microphones faq[2]
dump('pro-microphones', function (x) {
  console.log('faq[2].a = ' + JSON.stringify(x.faq[2].a));
  console.log('faq[2].a_es = ' + JSON.stringify(x.faq[2].a_es));
});

// [110] pro-plugins faq[0..2]
dump('pro-plugins', function (x) {
  (x.faq || []).forEach(function (f, i) { console.log('faq[' + i + '].a = ' + JSON.stringify(f.a)); console.log('faq[' + i + '].a_es = ' + JSON.stringify(f.a_es)); });
});

// price placeholder fields EN + ES
['starter-studio', 'monitor-setup', 'sm57-vs-sm58', 'adam-vs-genelec', 'jbl-vs-kali', 'best-monitors-for-small-rooms', 'atc-vs-genelec'].forEach(function (id) {
  var x = byId(id);
  console.log('== ' + id + ' ==');
  var fs2 = x.featuredSnippet || {};
  Object.keys(fs2).forEach(function (k) {
    if (/^faq/.test(k) && typeof fs2[k] === 'string' && /\( each\)|\( per pair\)|\( a pair\)|\( cada uno\)|\( el par\)|\( por par\)/.test(fs2[k])) {
      console.log('  ' + k + ' = ' + JSON.stringify(fs2[k]));
    }
  });
  (x.verdictProsCons || []).forEach(function (v, i) {
    [['pros', 'pros_es'], ['cons', 'cons_es']].forEach(function (pair) {
      (v[pair[0]] || []).forEach(function (p, j) {
        if (/\( each\)|\( per pair\)|\( a pair\)|\( cada uno\)|\( el par\)|\( por par\)| a pair —| each —/.test(p)) console.log('  vc[' + i + '].' + pair[0] + '[' + j + '] = ' + JSON.stringify(p));
      });
      (v[pair[1]] || []).forEach(function (p, j) {
        if (/cada uno|por par|el par|a pair|each /.test(p) && (p.indexOf('(') < 0 && p.indexOf(' —') < 0)) console.log('  vc[' + i + '].' + pair[1] + '[' + j + '] = ' + JSON.stringify(p));
      });
    });
  });
});

// catalog: BLX288, LCT 1040, Komplete, Total Bundle
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
['BLX288', 'LCT 1040', 'Komplete', 'Total Bundle', 'SSL 2+', 'Katana 50', 'EW-D', 'ULXD', 'BLX24'].forEach(function (q) {
  prods.forEach(function (x) { if ((x.title || '').toLowerCase().indexOf(q.toLowerCase()) >= 0) console.log('CAT ' + q + ' => ' + x.id + ' | ' + x.title + ' | $' + x.price); });
});