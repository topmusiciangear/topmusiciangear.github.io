var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

var patterns = {
  thany: 'thany', ththe: 'ththe', cleand: 'cleand', cthen: 'cthen',
  cadd: 'cadd occupied', cadjust: 'cadjust', carrange: 'carrange', cafford: 'cafford',
  makescaler: 'makescaler', makeshaperBox: 'makeshaperBox', breaand: 'breaand',
  PreSonustudioLive: 'PreSonustudioLive', Yamahand: 'Yamahand', formuland: 'formuland',
  Itsession: 'Itsession', sessions: "Live'session", itsession2: 'itsession',
  WavesSL: 'WavesSL', BossD1: 'BossD-1', vsSL: 'vsSL', calways: 'calways',
  musici: 'musici ', makee: 'makee', eligads: 'el el', qq: '\u00bf\u00bfCu',
  nonoes: 'No no es', insta1: 'instantentente', insta2: 'instantente',
  tusonidos: 'tusonidos', atena: 'atenua antes', u87: 'u 87 ai', lct: 'lCT1040',
  usbcc: 'uSB-c', motum: 'MOTU m2', cmat: 'caracter\u00edstica mata',
  ganaw: 'gana a ?', entrad: 'entrado/salida', drift: ' drift',
  bd2: ' bD-2', pj: ' pJ ', stage4: ' stage 4 88', montage: ' montage m8x',
  xr18: ' xR18', cq18t: ' cQ-18t', tr8s: ' tR-8s', m32r: ' m32r LIVE',
  x32c: ' x32 compact', sq5: ' sQ-5', thisIt: ' this it',
  athm50x: ' the ATH-M50x', mdr7506: ' the MDR-7506', ainnov: 'a innovative',
  cqis: 'The CQ-18T is a', instanten: ' al instantente'
};

function show(node, path) {
  if (typeof node === 'string') {
    Object.keys(patterns).forEach(function (k) {
      var p = patterns[k];
      var idx = node.indexOf(p);
      if (idx >= 0) {
        var s = Math.max(0, idx - 55), e = Math.min(node.length, idx + p.length + 55);
        console.log('[' + k + '] ' + path + '\n  ' + JSON.stringify(node.slice(s, e)));
      }
    });
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { show(x, path + '[' + i + ']'); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { show(node[k], path ? path + '.' + k : k); });
  }
}
show(g, '');