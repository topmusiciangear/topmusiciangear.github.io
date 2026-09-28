var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var A = JSON.parse(fs.readFileSync(P, 'utf8'));
var MAP = {
  'neumann mt 48': 'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
  'apollo x8p': 'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
  'apogee symphony': 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
  'audient oria': 'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
function low(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
var hits = 0, applied = 0, report = [];
function imgKeysOf(p) {
  var keys = [];
  Object.keys(p).forEach(function (k) { if (/^image|^img|^productImage|^thumb|^photo/i.test(k)) keys.push(k); });
  return keys;
}
function getKeyName(p) {
  if (p.imageUrl !== undefined) return 'imageUrl';
  if (p.image !== undefined) return 'image';
  if (p.img !== undefined) return 'img';
  if (p.productImage !== undefined) return 'productImage';
  return null;
}
function nameOf(p) { return String(p.name || p.title || p.productName || p.product_title || ''); }
function matchName(name) {
  var n = low(name);
  if (n.indexOf('neumann mt 48') >= 0) return 'neumann mt 48';
  if (n.indexOf('apollo x8p gen 2') >= 0 || n.indexOf('apollo x8p') >= 0) return 'apollo x8p';
  if (n.indexOf('apogee symphony') >= 0) return 'apogee symphony';
  if (n.indexOf('audient oria') >= 0) return 'audient oria';
  return null;
}
function walkList(list, base) {
  if (!Array.isArray(list)) return;
  list.forEach(function (p, pi) {
    if (!p || typeof p !== 'object') return;
    var nm = nameOf(p);
    var key = matchName(nm);
    if (!key) return;
    var target = MAP[key];
    var kName = getKeyName(p);
    report.push(base + '[' + pi + '] ' + JSON.stringify(nm) + ' | keys=' + imgKeysOf(p).join(',') + ' | current=' + JSON.stringify(kName ? p[kName] : '(none)') + ' -> ' + target);
    hits++;
    if (kName) {
      if (low(p[kName]) !== low(target.replace(/\?.*$/, ''))) { p[kName] = target; if (p[kName + '_es'] !== undefined) p[kName + '_es'] = target; applied++; report.push('   APPLIED to ' + kName); }
      else { report.push('   already OK'); }
    } else { p.image = target; applied++; report.push('   created image'); }
  });
}
function scan(o, base) {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) { walkList(o, base); o.forEach(function (v) { scan(v, base); }); return; }
  walkList([o], base);
  Object.keys(o).forEach(function (k) { var v = o[k]; if (v && typeof v === 'object') scan(v, base + '.' + k); });
}
var target = null, ti = -1;
A.forEach(function (g, i) { if (String(g.slug || g.id || '') === 'premium-interfaces') { target = g; ti = i; } });
report.push('guide slug=premium-interfaces idx=' + ti);
scan(target, 'premium');
fs.writeFileSync(P, JSON.stringify(A, null, 2), 'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/g4m_prem_report.txt', report.join('\n') + '\nHITS=' + hits + ' APPLIED=' + applied, 'utf8');
console.log('hits=' + hits + ' applied=' + applied + ' -> report.txt');
