var p = require('../data/products.json');

var searches = [
  { name: 'Akai MPC One+', keywords: ['akai', 'mpc', 'one'] },
  { name: 'Roland TR-8S', keywords: ['roland', 'tr-8s', 'tr8s'] },
  { name: 'Arturia KeyLab Essential 61 MkIII', keywords: ['arturia', 'keylab', 'essential'] },
  { name: 'Interface', keywords: ['scarlett', 'focusrite', 'interface'] },
  { name: 'Headphones', keywords: ['ath-m50x', 'dt 770', 'mdr-7506', 'hd 600'] },
  { name: 'Shure SM7B', keywords: ['sm7b', 'shure'] },
  { name: 'Ableton Live 12 Suite', keywords: ['ableton', 'live', 'suite'] },
  { name: 'Roland SP-404MKII', keywords: ['sp-404', 'sp404'] },
  { name: 'Native Instruments Maschine+', keywords: ['maschine', 'native instruments'] },
  { name: 'Elektron Digitakt II', keywords: ['digitakt', 'elektron'] },
];

searches.forEach(function(s) {
  var matches = p.filter(function(pr) {
    var tl = pr.title.toLowerCase();
    return s.keywords.some(function(k) { return tl.indexOf(k) !== -1; });
  });
  console.log(s.name + ':');
  matches.forEach(function(m) {
    console.log('  ID=' + m.id + ' ' + m.title + ' ($' + m.price + ')');
  });
  if (!matches.length) console.log('  (no match)');
  console.log('');
});
