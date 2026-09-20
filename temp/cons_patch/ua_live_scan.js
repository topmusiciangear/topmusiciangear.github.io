const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : (P.products || []);
const querys = ['apollo twin x', 'apollo x16', 'apollo x8p', 'apollo x8p gen 2', 'apollo x16 gen 2',
  'neuman n mt 48', 'mt 48', 'rme', 'babyface pro fs', 'fireface ufx iii', 'ufx iii',
  'apogee symphony', 'symphony i/o', 'audient oria', 'oria', 'lynx', 'aurora-n', 'aurora n',
  'lynx aurora', 'nauman n'].join('|').toLowerCase();
const re = new RegExp(querys);
const hits = arr.filter(x => x && re.test(JSON.stringify(x).toLowerCase()));
console.log('total products=' + arr.length + ' | regex hits=' + hits.length);
// dedupe by category + show summary
const seen = new Set();
for (const x of hits) {
  const t = String(x.title || '');
  if (!t) continue;
  const key = x.category + '|' + x.id;
  if (seen.has(key)) continue;
  seen.add(key);
  console.log('  id=' + x.id + ' | cat=' + x.category + ' | "$' + (x.price || '?') + '" | ' +
    t + ' | img=' + JSON.stringify(x.img) + ' | prices=' + JSON.stringify(x.prices) + ' | hrefs=' + JSON.stringify(x.hrefs));
}
// now: which SPECIFIC premium interface ids exist? (the ones the user wants in the new guide)
console.log('\n=== EXACT id lookup for the 7 user-suggested premium products ===');
const target = {
  16: 'UA Apollo Twin X Gen 2 (migrare desde portable)',
  182: 'UA Apollo x16 Gen 2 (migrare desde portable)',
};
for (const x of arr) {
  const tid = Number(x.id);
  if (target[tid] || (tid >= 176 && tid <= 192)) {
    const note = target[tid] ? (' <== ' + target[tid]) : '';
    console.log('  id=' + x.id + ' | cat=' + x.category + ' | "$' + (x.price || '?') + '" | ' + x.title +
      ' | cat2=' + x.category2 + ' | img=' + JSON.stringify(x.img) + ' | bad="' + (x.badge || '') + '"' + note);
  }
}
