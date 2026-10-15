const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');

const todos = [...d.matchAll(/href="(https?:\/\/[^"]*zzounds[^"]*)"/g)].map(m => m[1]);
console.log('=== los 24 href directos de zzounds ===');
todos.filter(h => !/\/lp\//.test(h)).forEach((h, i) =>
  console.log('  ' + String(i + 1).padStart(2) + '. ' + h));

console.log('\n=== ¿existe algun anrdoezrs en TODO el repo de guides? ===');
let tot = 0;
fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html')).forEach(f => {
  const c = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  tot += (c.match(/anrdoezrs\.net\/click-/g) || []).length;
});
console.log('  ocurrencias de anrdoezrs.net/click- en guides/: ' + tot);

console.log('\n=== git: ¿cambió el href zzounds con mi commit? ===');
