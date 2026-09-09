var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function search(node, path, pats) {
  if (typeof node === 'string') {
    pats.forEach(function (p) {
      if (node.indexOf(p.s) >= 0 && (p.not ? node.indexOf(p.not) < 0 : true)) {
        var i = node.indexOf(p.s);
        console.log('::' + p.name + ' :: ' + path + '\n   ' + JSON.stringify(node.slice(Math.max(0, i - 45), i + p.s.length + 45)));
      }
    });
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { search(x, path + '[' + i + ']', pats); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { search(node[k], path ? path + '.' + k : k, pats); });
  }
}
var pats = [
  { name: '739', s: '739' },
  { name: '699', s: '$699' },
  { name: '149', s: '$149' },
  { name: ' per pair', s: ' per pair' },
  { name: ' each)', s: ' each)' },
  { name: ' cada uno)', s: ' cada uno)' },
  { name: ' un par cuesta', s: 'un par cuesta' }
];
search(g, '', pats);

console.log('\n-- catalog lookups --');
['XR18', 'X Air XR18', 'Ibanez TS9', 'Kali IN-8', 'IN-8 V2', 'Thump215XT', 'TS412', 'Audient iD14 MkII', 'iD14', 'Mackie Thump'].forEach(function (q) {
  prods.forEach(function (p) {
    if (p.name && p.name.indexOf(q) >= 0) console.log(q + ' => id ' + p.id + ' | ' + p.name + ' | $' + p.price + ' | rating ' + p.rating);
  });
});