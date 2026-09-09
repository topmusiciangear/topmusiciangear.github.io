var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function scan(node, re) {
  var n = 0;
  if (typeof node === 'string') {
    var m = node.match(new RegExp(re, 'g'));
    if (m) n += m.length;
  } else if (Array.isArray(node)) {
    node.forEach(function (x) { n += scan(x, re); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { n += scan(node[k], re); });
  }
  return n;
}

var pats = [
  'ththe', 'thany', 'thanything', 'cleand', 'cthen', 'cadd', 'cadjust',
  'carrange', 'cafford', ' cboost ', ' c be ', 'makescaler', 'makeshaperBox',
  'breaand', 'PreSonustudioLive', 'Yamahand', 'formuland', 'Itsession',
  "Live'session", 'itsession', 'WavesSL', 'BossD-1', 'vsSL', 'calways',
  'musici ', 'makee', '\\(2026\\)', 'el el DAW', 'el el plugin', '\u00bf\u00bfCu',
  'No no es', 'instantentente', 'instantente', 'tusonidos', 'atenua antes',
  'u 87 ai', 'lCT1040', 'uSB-c', 'MOTU m2', 'caracter\u00edstica mata',
  'gana a ?', 'entrado/salida', ' drift', 'mG', 'xenyx', 'bD-2', 'pJ',
  ' stage 4 88', ' montage m8x', 'xR18', 'cQ-18t', 'tR-8s', 'm32r LIVE',
  'x32 compact', 'sQ-5', 'this it', 'This the ', ' this the ', ' the ATH-M50x',
  ' the MDR-7506', 'a innovative', 'The CQ-18T is a', ' al instantente',
  ' krk ', 'M8x tiene', 'La Montage'
];

pats.forEach(function (p) {
  var re = p.replace(/\\(?!\()/g, '');
  console.log(p.padEnd(30), scan(g, p));
});