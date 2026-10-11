const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function normName(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
function guideHasId(gd, pid) {
  let ids = [];
  if (gd.featuredProducts) ids = ids.concat(gd.featuredProducts);
  if (gd.products) ids = ids.concat(gd.products);
  if (gd.sections) gd.sections.forEach(s => { if (s.products) ids = ids.concat(s.products); });
  return ids.indexOf(pid) !== -1;
}
const cases = [
  [19, 'studio-subwoofers'], [55, 'streaming-interfaces'], [57, 'tracking-headphones'],
  [138, 'best-digital-mixers'], [138, 'best-32-channel-digital-mixers'], [147, 'best-digital-mixers'],
  [148, 'best-digital-mixers'], [156, 'best-5-string-basses'], [192, 'starter-studio'],
  [192, 'best-monitors'], [192, 'budget-monitors'], [192, 'monitor-setup'], [192, 'hs8-vs-rokit-7'],
  [196, 'best-condenser-mics'], [197, 'usb-mics'], [197, 'mics-for-creators'], [252, 'budget-mics'],
  [265, 'stream-controllers'], [263, 'scarlett-vs-volt'], [291, 'budget-mics'], [291, 'best-condenser-mics'],
  [297, 'best-condenser-mics'], [328, 'budget-interfaces'], [332, 'best-digital-mixers'],
  [335, 'best-digital-mixers'], [401, 'slg200s-vs-gs-mini'], [402, 'best-live-sound-mixers'],
  [402, 'best-digital-mixers'], [402, 'best-compact-mixers'], [402, 'pro-live-sound'],
  [412, 'best-digital-mixers'], [458, 'best-beginner-electric-guitar'], [465, 'beginner-guitar'],
  [488, 'best-bass-practice-amps'], [492, 'best-practice-amps'], [518, 'usb-mics'],
  [546, 'fender-bass-guide'], [546, 'budget-bass-like-expensive'], [546, 'beginner-bass-guitars'],
  [551, 'portable-interfaces'], [551, 'streaming-interfaces'], [559, 'best-32-channel-digital-mixers']
];
cases.forEach(([pid, gid]) => {
  const p = d.find(x => x.id === pid);
  const gd = g.find(x => x.id === gid);
  if (!p || !gd) { console.log(pid + '/' + gid + ' NOT FOUND'); return; }
  const names = [];
  if (gd.productTable && gd.productTable.columns) gd.productTable.columns.forEach(c => {
    if (c.title) names.push('COL:' + c.title);
    if (c.title_es) names.push('COL_ES:' + c.title_es);
  });
  if (gd.verdictProsCons) gd.verdictProsCons.forEach(v => {
    if (v.name) names.push('PC:' + v.name);
    if (v.name_es) names.push('PC_ES:' + v.name_es);
  });
  const pt = normName(p.title);
  const hits = names.filter(nm => {
    const n = normName(nm.slice(nm.indexOf(':') + 1));
    return n && n.length >= 4 && (pt.indexOf(n) === 0 || n.indexOf(pt) === 0);
  });
  const exact = hits.filter(nm => normName(nm.slice(nm.indexOf(':') + 1)) === pt);
  console.log(pid + ' [' + p.title + '] in ' + gid + ' | byId=' + guideHasId(gd, pid) + ' | match=' + JSON.stringify(hits) + ' | EXACT=' + (exact.length > 0));
});
