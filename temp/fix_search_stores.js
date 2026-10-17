const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const searchTerm = t => { const s = String(t || '').trim(); const c = s.replace(/\s*\((each|pair|set|2 headsets?)\)\s*$/i, '').trim(); return c || s; };

// URL de BUSQUEDA de tienda (nunca una pagina de producto)
const PATRONES = [
  { re: /^(https?:\/\/[a-z0-9.]*gear4music\.com)\/search\?q=([^&]*)(.*)$/i, campo: 'q' },
  { re: /^(https?:\/\/[a-z0-9.]*musicstore\.(com|de))\/([a-z]{2}_[A-Z]{2}\/[A-Z]{3})\/search\?SearchText=([^&]*)(.*)$/i, campo: 'SearchText' },
  { re: /^(https?:\/\/www\.andertons\.co\.uk)\/search\.php\?search_query=([^&]*)(.*)$/i, campo: 'search_query' },
  { re: /^(https?:\/\/www\.andertons\.co\.uk)\/search\/?\?search_query=([^&]*)(.*)$/i, campo: 'search_query' },
  { re: /^(https?:\/\/www\.zzounds\.com)\/prodsearch\?form=search&q=([^&]*)(.*)$/i, campo: 'q' },
  { re: /^(https?:\/\/reverb\.com)\/marketplace\?query=([^&]*)(.*)$/i, campo: 'query' },
  { re: /^(https?:\/\/www\.amazon\.[a-z.]+)\/s\?k=([^&]*)(.*)$/i, campo: 'k' },
  { re: /^(https?:\/\/www\.pluginboutique\.com)\/search\?q=([^&]*)(.*)$/i, campo: 'q' }
];

function normalizar(url, nombre) {
  const destino = encodeURIComponent(searchTerm(nombre)).replace(/%20/g, '+');
  for (const p of PATRONES) {
    const m = url.match(p.re);
    if (!m) continue;
    const antes = decodeURIComponent(m[2]).replace(/\+/g, ' ');
    const esperado = searchTerm(nombre);
    if (antes === esperado) return null;
    const nueva = m[1] + (p.campo === 'q' && m[1].includes('pluginboutique') ? '/search?q=' : '') +
      (p.re.source.includes('musicstore') ? '/' + m[3] + '/search?' : m[1] === '' ? '' : '') + p.campo + '=' + destino + m[m.length - 1];
    // reconstruye de forma simple: base + query
    let base;
    if (p.re.source.includes('musicstore')) base = m[1] + '/' + m[3] + '/search?';
    else if (p.campo === 'q' && m[1].includes('pluginboutique')) base = m[1] + '/search?q=';
    else base = m[1] + (m[1].endsWith('/') ? '' : '/') + (p.campo === 'q' && m[1].includes('zzounds') ? 'prodsearch?form=search&q=' : p.campo === 'query' && m[1].includes('reverb') ? 'marketplace?query=' : p.campo === 'k' ? 's?k=' : 'search?' + p.campo + '=');
    const cola = m[m.length - 1] || '';
    return { antes, nueva: base + destino + cola };
  }
  return null;
}

// ---------- products.json ----------
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
let n = 0;
products.forEach(p => {
  Object.keys(p.stores || {}).forEach(k => {
    const r = normalizar(p.stores[k], p.title);
    if (r) { p.stores[k] = r.nueva; n++; console.log('  ' + p.id + ' ' + k + ': "' + r.antes + '" -> "' + searchTerm(p.title) + '"'); }
  });
});
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('\nproducts.json: ' + n + ' URLs de buscador normalizadas');