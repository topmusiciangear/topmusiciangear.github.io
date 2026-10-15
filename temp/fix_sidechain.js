// sidechain-modulation-plugins: la tabla tenia 2 productos de otra guia.
// Se sustituyen por los que realmente tiene: Eventide H3000 y Arturia Chorus JUN-6.
// Specs: eventideaudio.com/plug-ins/h3000-band-delays y arturia.com/products/software-effects/chorus-jun-6
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');

// precios Plugin Boutique ya verificados
const pb = {};
[374, 376, 380, 389, 390].forEach(id => {
  const m = b.match(new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},', 'm'));
  const p = m && m[0].match(/pluginboutique:\s*"([^"]+)"/);
  pb[id] = p ? p[1] : null;
  console.log('id ' + id + ' precio Plugin Boutique: ' + (pb[id] || 'no configurado'));
});

const g = guides.find(x => x.id === 'sidechain-modulation-plugins');
const c = g.comparison;
console.log('\nheaders ANTES: ' + JSON.stringify(c.headers));

// productos reales de la guia
const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
(g.sections||[]).forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
console.log('productos reales: ' + [...ids].join(', '));

// ---- valores nuevos ----
const H3000 = {
  'Estimated Price': [pb[389] || '€99.83', pb[389] || '€99.83'],
  'Type': ['Multi-band filtered delay (8 voices)', 'Delay multibanda filtrado (8 voces)'],
  'Modulation': ['H3000 Function Generator + MIDI', 'Generador de funciones H3000 + MIDI'],
  'Included Effects': ['8 filtered delay voices', '8 voces de delay filtrado'],
  'Multiband': ['Yes (8 parametric bands)', 'Sí (8 bandas paramétricas)'],
  'Tracks': ['8 voices per instance', '8 voces por instancia'],
  'Best For': ['Rhythmic multi-band delay, pumping textures', 'Delay multibanda rítmico, texturas bombeantes'],
};
const JUN6 = {
  'Estimated Price': [pb[390] || '€51.43', pb[390] || '€51.43'],
  'Type': ['Analog BBD chorus', 'Coro analógico BBD'],
  'Modulation': ['LFO 0.05-15 Hz, sync to host', 'LFO 0,05-15 Hz, sync al host'],
  'Included Effects': ['3 modes (I, II, I+II) + Manual', '3 modos (I, II, I+II) + Manual'],
  'Multiband': ['No', 'No'],
  'Tracks': ['Per-instance', 'Por instancia'],
  'Best For': ['Wide analog chorus on synths and pads', 'Coro analógico amplio en sintas y pads'],
};

// ---- 1. cabeceras ----
c.headers[1] = 'Eventide H3000 Band Delays MK II';
c.headers[3] = 'Arturia Chorus JUN-6';
console.log('headers DESPUES: ' + JSON.stringify(c.headers));

// ---- 2. valores de las columnas 2 (H3000) y 4 (JUN-6) ----
let tocados = 0;
c.rows.forEach(r => {
  const h = H3000[r.label], j = JUN6[r.label];
  if (h) { r.val2 = h[0]; r.val2_es = h[1]; }
  if (j) { r.val4 = j[0]; r.val4_es = j[1]; }
  if (h || j) tocados++;
});
console.log('filas actualizadas: ' + tocados + ' de ' + c.rows.length);

// ---- 3. fila de precios: la que habia estaba desfasada ----
const filaPrecio = c.rows.find(r => r.label === 'Estimated Price');
if (filaPrecio) {
  filaPrecio.val   = pb[374] || filaPrecio.val;
  filaPrecio.val3  = pb[376] || filaPrecio.val3;
  filaPrecio.val5  = pb[380] || filaPrecio.val5;
  console.log('precios actualizados con los de Plugin Boutique: ' + JSON.stringify({
    val: filaPrecio.val, val2: filaPrecio.val2, val3: filaPrecio.val3, val4: filaPrecio.val4, val5: filaPrecio.val5 }));
}

// ---- verificacion ----
console.log('\n--- TABLA RESULTANTE ---');
c.rows.forEach(r => console.log('  ' + r.label.padEnd(20) + ' | ' + ['val','val2','val3','val4','val5'].map(k => (r[k]||'-')).join(' | ')));

const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const titles = arr.map(p=>p.title);
const fuera = c.headers.filter(h => titles.indexOf(h) < 0);
console.log('\ncabeceras que no son un producto del catalogo: ' + fuera.length + (fuera.length ? ' -> ' + fuera.join(' ; ') : ''));
console.log('cabeceras: ' + c.headers.length + ' | productos en la guia: ' + ids.size);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');