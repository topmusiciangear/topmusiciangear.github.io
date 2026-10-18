const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const st = s => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

guides.forEach(g => {
  let cambios = 0;
  function recorrer(o) {
    if (typeof o === 'string') {
      let x = o;
      // Patrones comunes
      const patrones = [
        ['por debajo de $', 'por menos de $'],
        ['por debajo de US$', 'por menos de US$'],
        ['por debajo de €', 'por menos de €'],
        ['por debajo de £', 'por menos de £'],
        ['por debajo de unos \$', 'por unos $'],
        ['por debajo de unos US$', 'por unos US$'],
      ];
      for (const [a, b] of patrones) {
        if (x.indexOf(a) >= 0) { x = x.split(a).join(b); cambios++; }
      }
      return x;
    }
    if (Array.isArray(o)) return o.map(recorrer);
    if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = recorrer(o[k]); return s; }
    return o;
  }
  const limpio = recorrer(g);
  if (cambios) {
    Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });
    console.log(g.id + ': ' + cambios + ' sustituciones');
  }
});

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nHecho.');