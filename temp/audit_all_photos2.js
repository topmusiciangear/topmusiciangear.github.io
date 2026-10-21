// Auditoria corregida: cuenta solo refs locales realmente rotas (sin query string)
// y separa fotos propias (topmusiciangear.com) de terceros.
const fs = require('fs');

let broken = 0;
const brokenList = [];
let thirdParty = new Map();
let ownAbsolute = 0;
let local = 0;

const pages = ['index.html', 'deals.html', 'deals_es.html', 'index_es.html']
  .filter(f => fs.existsSync(f))
  .concat(fs.readdirSync('guides').filter(f => f.endsWith('.html')).map(f => 'guides/' + f));

for (const f of pages) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /<img[^>]+src="([^"]+)"/g;
  let m;
  while ((m = re.exec(s))) {
    const u = m[1];
    if (u.startsWith('data:')) continue;
    if (/^https?:\/\//.test(u)) {
      if (/^https?:\/\/topmusiciangear\.com\//.test(u)) {
        ownAbsolute++;
        const rel = u.replace(/^https?:\/\/topmusiciangear\.com\//, '').split('?')[0];
        if (!fs.existsSync(rel)) { broken++; brokenList.push(u + '  (' + f + ')'); }
      } else {
        if (!thirdParty.has(u)) thirdParty.set(u, new Set());
        thirdParty.get(u).add(f);
      }
      continue;
    }
    local++;
    const rel = (u.startsWith('../') ? u.slice(3) : u.replace(/^\//, '')).split('?')[0];
    if (!fs.existsSync(rel)) { broken++; brokenList.push(u + '  (' + f + ')'); }
  }
}

console.log('paginas: ' + pages.length);
console.log('refs locales (relativas): ' + local);
console.log('refs propias absolutas (topmusiciangear.com): ' + ownAbsolute);
console.log('imgs de terceros distintas: ' + thirdParty.size);
console.log('rotas: ' + broken);
[...new Set(brokenList)].slice(0, 15).forEach(b => console.log('   ' + b));
for (const [u, files] of thirdParty) console.log('   tercero: ' + u + '  [' + [...files].slice(0, 3).join(', ') + ']');
