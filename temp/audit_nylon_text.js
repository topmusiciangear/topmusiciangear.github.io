const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = arr.find(x => x.id === 'best-nylon-guitars-for-beginners');

const ES_CALCOS = [
  ['techo de graves', 'calco bass ceiling'], ['gabinetes', 'usar cajas'], ['calidad precio', 'ok'],
  ['features', 'anglicismo'], ['review', 'anglicismo'], ['hardware', 'anglicismo'], ['software', 'anglicismo'],
  ['checklist', 'anglicismo'], ['link', 'anglicismo'], ['click', 'anglicismo'], ['feedback', 'anglicismo'],
  ['setup', 'anglicismo'], ['upgrade', 'anglicismo'], ['sweet spot', 'anglicismo'], ['punto dulce', 'literal'],
  ['performances', 'anglicismo'], ['targeting', 'anglicismo'], ['se siente r', 'calco feels'],
  ['hace sentido', 'calco make sense'], ['asumiendo', 'calco assuming'], ['eventualmente', 'calco eventually'],
  ['remover', 'calco remove'], ['actualmente', 'calco actually'], ['realizar', 'muleta'],
  ['techo', 'revisar'], ['punchy', 'anglicismo'], ['versus', 'latinismo ok'],
  ['caballo de batalla', 'prohibido'], ['punto justo', 'literal sweet spot'], ['resolver eventos', 'literal'],
  ['atr�s', 'usar panel trasero'], ['los m�s importante', 'falta tilde']
];

const ES_IA = [
  'es importante', 'vale la pena notar', 'en resumen', 'en conclusi\u00f3n', 'no podemos dejar de',
  'cabe destacar', 'conviene destacar', 'a lo largo de', 'en este sentido', 'sin lugar a dudas',
  'en el mundo actual', 'no se trata solo de', 'se trata de', 'es esencial', 'sin discusi\u00f3n',
  'en definitiva', 'sin duda', 'perfecto para', 'ideal para', 'la mejor opci\u00f3n'
];

const EN_IA = [
  'in conclusion', 'it is important to note', "it's worth noting", 'game-changer', 'seamless',
  'in today\'s', 'when it comes to', 'delve', 'unleash', 'elevate', 'embark', 'testament to',
  'nestled', 'boasts', 'robust', 'plethora', 'myriad', 'cutting-edge', 'state-of-the-art',
  'look no further', 'whether you\'re', 'not only', 'plays a crucial role', 'stands out',
  'designed to', 'aims to', 'you\'ll love', 'in the world of', 'let\'s dive', 'dive into'
];

const TYPOS = [
  ['grabacion', 'grabaci\u00f3n'], ['tambien', 'tambi\u00e9n'], ['conexion', 'conexi\u00f3n'], ['opcion', 'opci\u00f3n'],
  ['informacion', 'informaci\u00f3n'], ['solucion', 'soluci\u00f3n'], ['version', 'versi\u00f3n'], ['condicion', 'condici\u00f3n'],
  ['razon', 'raz\u00f3n'], ['funcion', 'funci\u00f3n'], ['aplicacion', 'aplicaci\u00f3n'], ['configuracion', 'configuraci\u00f3n'],
  ['seleccion', 'selecci\u00f3n'], ['descripcion', 'descripci\u00f3n'], ['microfono', 'micr\u00f3fono'],
  ['via ', 'v\u00eda '], ['mas ', 'm\u00e1s '], ['esta ', 'est\u00e1 '], [' solo ', 's\u00f3lo '],
  ['electro-clasica', 'electrocl\u00e1sica'], ['acustica', 'ac\u00fastica'], ['practica', 'pr\u00e1ctica'],
  ['clasica', 'cl\u00e1sica'], ['musica', 'm\u00fasica'], ['guitarra clasica', 'cl\u00e1sica'],
  ['telefono', 'tel\u00e9fono'], ['electronica', 'electr\u00f3nica'], ['tambien', 'tambi\u00e9n']
];

function fields(o, path, acc) {
  if (typeof o === 'string') { acc.push([path, o]); return acc; }
  if (Array.isArray(o)) { o.forEach((v, i) => fields(v, path + '[' + i + ']', acc)); return acc; }
  if (o && typeof o === 'object') { Object.entries(o).forEach(([k, v]) => fields(v, path + '.' + k, acc)); }
  return acc;
}

const all = fields(g, 'g', []);
const strip = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');

let hits = 0;
function scan(list, label, isEs) {
  for (const [p, why] of list) {
    for (const [path, val] of all) {
      if (!isEs && /_es$/.test(path.split('.').pop())) continue;
      if (isEs && !/_es$/.test(path.split('.').pop()) && !/\.(q|a|values|label|name|title)/.test(path)) continue;
      const t = strip(val).toLowerCase();
      if (t.includes(String(p).toLowerCase())) {
        console.log(`[${label}] ${path}: "${p}" (${why}) -> ...${strip(val).slice(0, 120)}...`);
        hits++;
      }
    }
  }
}

scan(ES_CALCOS, 'ES calco', true);
for (const p of ES_IA) {
  for (const [path, val] of all) {
    if (!/_es$/.test(path.split('.').pop())) continue;
    if (strip(val).toLowerCase().includes(p)) { console.log(`[ES IA] ${path}: "${p}" -> ...${strip(val).slice(0, 110)}...`); hits++; }
  }
}
for (const p of EN_IA) {
  for (const [path, val] of all) {
    if (/_es$/.test(path.split('.').pop())) continue;
    if (strip(val).toLowerCase().includes(p)) { console.log(`[EN IA] ${path}: "${p}" -> ...${strip(val).slice(0, 110)}...`); hits++; }
  }
}
scan(TYPOS, 'typo', true);
console.log('\ntotal hits:', hits);
