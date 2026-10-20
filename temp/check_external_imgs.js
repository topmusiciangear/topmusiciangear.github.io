// Revisa las paginas generadas: cuantas fotos externas quedan y donde.
const fs = require('fs');
const dir = 'guides';
const external = new Map();
let pages = 0, local = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  pages++;
  const s = fs.readFileSync(dir + '/' + f, 'utf8');
  const re = /<img[^>]+src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/gi;
  let m;
  while ((m = re.exec(s))) {
    if (!external.has(m[1])) external.set(m[1], new Set());
    external.get(m[1]).add(f);
  }
  local += (s.match(/src="\.\.\/img\/products\//g) || []).length;
}
console.log('paginas:', pages, '| refs a fotos locales:', local);
console.log('fotos externas distintas que quedan:', external.size);
for (const [u, files] of external) {
  console.log('  ' + u.slice(0, 100));
  console.log('     en ' + [...files].slice(0, 6).join(', ') + (files.size > 6 ? ' (+' + (files.size - 6) + ')' : ''));
}
