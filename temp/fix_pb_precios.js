const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const vivos = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_vivos.json', 'utf8'));
const eur = v => (v / 1.0084).toFixed(2);
const gbp = v => ((v / 1.0084) * 0.7959).toFixed(2);
const norm = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const cambios = [];
vivos.forEach(v => {
  if (!v.actual) return;
  const objetivo = norm(v.actual);
  const nuestro = norm(v.nuestro);
  if (objetivo === nuestro) return;
  const re = new RegExp('(\\n' + v.id + ': \\{prices:\\{pluginboutique:)"[\\u20AC$£][\\d.,]+"(,pbCur:\\{us:)"[\\u20AC$£][\\d.,]+"(,uk:)"[\\u20AC$£][\\d.,]+"')  ;
  const m = bg.match(re);
  if (!m) { cambios.push(v.id + ': NO ENCONTRADA la entrada (patron)'); return; }
  const nuevo = '\n' + v.id + ': {prices:{pluginboutique:"\u20AC' + objetivo.toFixed(2) +
    '",pbCur:{us:"$' + eur(objetivo) + '",uk:"\u00A3' + gbp(objetivo) + '"}},';
  // reconstruye conservando el resto de la linea (otras tiendas)
  const lineaCompleta = bg.slice(bg.indexOf(m[0]), bg.indexOf('\n', bg.indexOf(m[0])));
  const soloPb = lineaCompleta.match(/^(\n\s*)(\d+): \{prices:\{pluginboutique:"[^"]+"/);
  if (!soloPb) { cambios.push(v.id + ': formato inesperado'); return; }
  const resto = lineaCompleta.replace(/\n\s*\d+: \{prices:\{pluginboutique:"[^"]+",pbCur:\{us:"[^"]+",uk:"[^"]+"\}\},\n?/, '\u0000');
  const nuevaLinea = resto === '\u0000'
    ? '\n' + v.id + ': {prices:{pluginboutique:"\u20AC' + objetivo.toFixed(2) + '"},pbCur:{us:"$' + eur(objetivo) + '",uk:"\u00A3' + gbp(objetivo) + '"}},\n'
    : '\n' + v.id + ': {prices:{pluginboutique:"\u20AC' + objetivo.toFixed(2) + '",' + resto.slice(1).replace(/\},?\}?$/, '') + '},pbCur:{us:"$' + eur(objetivo) + '",uk:"\u00A3' + gbp(objetivo) + '"}},\n';
  bg = bg.replace(lineaCompleta, nuevaLinea.replace(/\n$/, '\n'));
  cambios.push(v.id + ' | ' + v.nombre + ': ' + v.nuestro + ' -> \u20AC' + objetivo.toFixed(2) +
    (v.badge ? '  [' + v.badge + ']' : '') + '  (US $' + eur(objetivo) + ' / \u00A3' + gbp(objetivo) + ')');
});
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('precios PB actualizados: ' + cambios.length + '\n');
cambios.forEach(c => console.log('  ' + c));
// resumen de promos
const promos = vivos.filter(v => v.badge);
console.log('\n--- OFERTAS VIGENTES (guardar para refrescar) ---');
promos.forEach(v => console.log('  ' + v.id + ' ' + v.nombre + ' = \u20AC' + norm(v.actual).toFixed(2) + ' (lista \u20AC' + norm(v.lista).toFixed(2) + ') -> ' + v.badge));