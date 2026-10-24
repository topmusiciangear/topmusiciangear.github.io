// Corrige enlaces _es.html dentro de campos EN de otras guias (no de best-monitors-for-small-rooms)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
const g = JSON.parse(raw);

// mapa id -> guia para contexto
const byId = {};
g.forEach(gu => { byId[gu.id] = gu; });

let fixed = 0;
function fixInString(s, guideId, field) {
  const re = /href="(\/guides\/[^" ]*_es\.html)"[^<]*<\/a>/g;
  let out = s, m, changed = false;
  while ((m = re.exec(s)) !== null) {
    const esLink = m[1];
    const enLink = esLink.replace(/_es\.html$/, '.html');
    // verificar que la guia EN exista
    const esId = esLink.replace('/guides/', '').replace('_es.html', '');
    const enId = esLink.replace('/guides/', '').replace('_es.html', '');
    if (!byId[enId]) { console.log('WARN sin guia EN:', esLink, 'en', guideId, field); continue; }
    out = out.split(m[0]).join('<a href="' + enLink + '" class="guide-link-btn"></a>'.replace('></a>', '>' + m[0].slice(m[0].indexOf('>') + 1)));
    changed = true;
    console.log('EN-LINK FIX', guideId, field, '→', esLink, '=>', enLink);
    fixed++;
  }
  return out;
}

g.forEach(gu => {
  if (gu.id === 'best-monitors-for-small-rooms') return;
  const walk = (obj, path) => {
    if (typeof obj === 'string') {
      if (obj.includes('_es.html')) {
        const n = fixInString(obj, gu.id, path);
        if (n !== obj) { /* asignar de vuelta */ }
      }
      return obj;
    }
    if (Array.isArray(obj)) return obj.map((v, i) => walk(v, path + '[' + i + ']'));
    if (obj && typeof obj === 'object') {
      const r = {};
      Object.keys(obj).forEach(k => { r[k] = walk(obj[k], path + '.' + k); });
      return r;
    }
    return obj;
  };
  // aplicar sobre la guia misma y reasignar campos mutables
  const g2 = walk(gu, gu.id);
  // reemplazar en raw es complejo; mejor: editar campo a campo usando replaceLine sobre raw
});

// Enfoque directo sobre el raw: para cada hit, reemplazar la URL en el string original
const hits = [];
g.forEach(gu => {
  if (gu.id === 'best-monitors-for-small-rooms') return;
  const collect = (obj, path) => {
    if (typeof obj === 'string' && obj.includes('_es.html')) hits.push([gu.id, path, obj]);
    else if (Array.isArray(obj)) obj.forEach((v, i) => collect(v, path + '[' + i + ']'));
    else if (obj && typeof obj === 'object') Object.keys(obj).forEach(k => collect(obj[k], path + '.' + k));
  };
  collect(gu, gu.id);
});
console.log('hits EN _es.html:', hits.length);
hits.forEach(h => console.log(' ', h[0], h[1], '→', (h[2].match(/href="[^"]*_es\.html"/g) || []).join(' | ')));
