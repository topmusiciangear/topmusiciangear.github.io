const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
function norm(s) {
  return (s || '').toLowerCase()
    .replace(/generation/g, 'gen').replace(/microphone/g, 'mic').replace(/series/g, '')
    .replace(/[^a-z0-9]/g, '');
}
['Blue Yeti X', 'MKH 416', 'NTG5', 'EW IEM G4', 'Lewitt LCT 440 PURE'].forEach(t => {
  const n = norm(t);
  const c = P.filter(p => norm(p.title).startsWith(n) || n.startsWith(norm(p.title)));
  console.log(t, '=> norm=' + n, 'cands=' + c.map(p => p.id + ':' + p.title).join(' / '));
});