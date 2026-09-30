// Helper: localiza la fila de una tienda para un producto concreto y le el precio.
// Agnostico al orden de atributos y al mecanismo data-aff/href (el deploy inyecta
// data-aff con la URL de afiliado y deja href con la URL limpia; el JS las
// intercambia en runtime, asi que ambas se aceptan como validas).
const MONEY = />\s*([\u00a3\u20ac$][\d.,]+)\s*</;

function rowsFor(html, store, token) {
  const out = [];
  const re = new RegExp('<a [^>]*' + token + '[^>]*>', 'g');
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    if (tag.indexOf('data-store="' + store + '"') === -1) continue;
    const rest = html.slice(m.index + tag.length);
    const end = rest.indexOf('</a>');
    const body = end === -1 ? rest.slice(0, 4000) : rest.slice(0, end);
    const price = (body.match(MONEY) || [])[1] || null;
    const href = (tag.match(/href="([^"]*)"/) || [])[1] || null;
    const aff = (tag.match(/data-aff="([^"]*)"/) || [])[1] || null;
    out.push({ price, href, aff, url: aff || href });
  }
  return out;
}

// Devuelve el Set de importes distintos que muestra esa fila en el HTML dado.
function pricesOf(html, store, token) {
  const rows = rowsFor(html, store, token);
  return { amounts: [...new Set(rows.map(r => r.price || '(sin precio)'))], rows };
}

module.exports = { rowsFor, pricesOf };
