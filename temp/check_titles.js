const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

let over = 0;
const list = [];
guides.forEach(function (g) {
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (!g[k]) return;
    if (g[k].length > 60) { over++; list.push([g.id, k, g[k].length, g[k]]); }
  });
});
console.log('campos de titulo > 60 chars en guides.json: ' + over);
list.slice(0, 15).forEach(function (l) {
  console.log('  [' + l[0] + '] ' + l[1] + ' (' + l[2] + ') ' + JSON.stringify(l[3]));
});
if (list.length > 15) console.log('  ... y ' + (list.length - 15) + ' mas');

console.log('\n=== el HTML renderizado (fuente de verdad) ===');
const files = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html') && fs.statSync(BASE + 'guides/' + f).size > 20000);
let max = 0, overH = 0;
files.forEach(function (f) {
  const h = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  if (t.length > max) { max = t.length; }
  if (t.length > 60) overH++;
});
console.log('  maximo <title> en HTML: ' + max + '   > 60: ' + overH);

console.log('\n=== de donde sale el <title>? ===');
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const i = b.indexOf('const title = Y(');
console.log(b.substring(i, i + 320));