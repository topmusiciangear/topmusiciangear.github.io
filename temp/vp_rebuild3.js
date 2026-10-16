const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const g = guides.find(x => x.id === 'vocal-plugins');

// ---------- tabla 9 columnas (valores existentes + Nectar + Smooth) ----------
const D = {
  BestFor: ['One-stop mixing toolkit', 'Set completo para mezclar'],
  Type: ['14 plug-ins', '14 plug-ins'],
  Format: ['VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX'],
  Platforms: ['macOS & Windows', 'macOS y Windows'],
  Copy: ['License file', 'Archivo de licencia'],
  Lat: ['Ultra-low', 'Ultrabaja'],
  Stand: ['Pro-Q 4 + Pro-C 3 + Pro-MB + Pro-R', 'Pro-Q 4 + Pro-C 3 + Pro-MB + Pro-R']
};
// orden columnas = featured
const feat = g.featuredProducts;
const COLS = {
  29:  ['FabFilter Total Bundle', 'FabFilter Total Bundle', 'One-stop mixing toolkit', 'Set completo para mezclar', '14 plug-ins', '14 plug-ins', 'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX', 'License file', 'Archivo de licencia', 'Ultra-low', 'Ultrabaja', 'Pro-Q 4 + Pro-C 3 + Pro-MB + Pro-R', 'Pro-Q 4 + Pro-C 3 + Pro-MB + Pro-R'],
  62:  ['FabFilter Pro-Q 4', 'FabFilter Pro-Q 4', 'Clean vocal and instrument mixing', 'Mezcla limpia de voces e instrumentos', 'Dynamic/parametric EQ', 'EQ paramétrico/dinámico', 'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX', 'License file', 'Archivo de licencia', 'Ultra-low', 'Ultrabaja', '24 bands, spectrum analyzer, linear phase', '24 bandas, analizador, fase lineal'],
  63:  ['FabFilter Pro-C 3', 'FabFilter Pro-C 3', 'Punchy vocal compression for mixes', 'Compresión vocal con pegada', 'Compressor', 'Compresor', 'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX', 'License file', 'Archivo de licencia', 'Ultra-low', 'Ultrabaja', 'Opto, VCA, FET + dynamic sidechain', 'Opto, VCA, FET + sidechain dinámico'],
  120: ['Celemony Melodyne 5', 'Celemony Melodyne 5', 'Pitch-perfect vocal tuning', 'Afinado vocal impecable', 'Pitch correction & editing', 'Corrección y edición de tono', 'VST3/AU/AAX + standalone (ARA)', 'VST3/AU/AAX + standalone (ARA)', 'License file', 'Archivo de licencia', 'Low', 'Baja', 'Melodic algorithm, per-note editing', 'Algoritmo melódico, edición por nota'],
  1039: ['RePitch 2 + VocAlign 7 Pro Bundle', 'Bundle RePitch 2 + VocAlign 7 Pro', 'Pitch correction + vocal alignment in one', 'Corrección de tono + alineación vocal en uno', 'Vocal production bundle', 'Bundle de producción vocal', 'VST3/AU/AAX', 'VST3/AU/AAX', 'iLok', 'iLok', 'Low', 'Baja', 'Natural tuning + timing alignment in one package', 'Afinación natural + alineación de timing en un paquete'],
  32:  ['Soundtoys 5.5 Bundle', 'Soundtoys 5.5 Bundle', 'Creative vocal effects and color', 'Efectos creativos para tu voz', '21 creative plug-ins', '21 plugins creativos', 'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX', 'iLok', 'iLok', 'Low', 'Baja', 'EchoBoy, Decapitator, AlterBoy, FilterFreak', 'EchoBoy, Decapitator, AlterBoy, FilterFreak'],
  378: ['Sonnox VoxDoubler', 'Sonnox VoxDoubler', 'Natural vocal doubles', 'Dobles vocales naturales', 'Vocal doubler (Thicken + Widen)', 'Doblador vocal (Thicken + Widen)', 'VST3/AU/AAX', 'VST3/AU/AAX', 'iLok', 'iLok', 'Low', 'Baja', 'Thicken + Widen, pitch/timing humanisation', 'Thicken + Widen, humanización de tono/tiempo'],
  1041: ['iZotope Nectar 4 Advanced', 'iZotope Nectar 4 Advanced', 'Complete AI-assisted vocal chain', 'Cadena vocal completa con IA', '13-module vocal suite', 'Suite vocal de 13 módulos', 'VST3/AU/AAX', 'VST3/AU/AAX', 'Serial (Product Portal)', 'Serie (Product Portal)', 'Low', 'Baja', 'Vocal Assistant + Auto-Level + Voices', 'Asistente vocal + Auto-Level + Voices'],
  472: ['Baby Audio Smooth Operator Pro', 'Baby Audio Smooth Operator Pro', 'One-knob harshness taming', 'Doma dureza con una perilla', 'Spectral resonance suppressor', 'Supresor espectral de resonancias', 'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX', 'License file', 'Archivo de licencia', 'Low', 'Baja', 'Single-knob spectral smoothing', 'Suavizado espectral de una perilla']
};
const missing = feat.filter(id => !COLS[id]);
if (missing.length) { console.log('FALTAN DATOS: ' + missing.join(',')); process.exit(1); }
g.productTable = {
  title: 'Vocal Chain Plugins Compared in This Guide',
  title_es: 'Comparativa de plugins para cadena vocal en esta guía',
  columns: feat.map(id => ({ title: COLS[id][0], title_es: COLS[id][1] })),
  rows: [
    { label: 'Best For', label_es: 'Ideal para', values: feat.map(id => ({ value: COLS[id][2], value_es: COLS[id][3] })) },
    { label: 'Type', label_es: 'Tipo', values: feat.map(id => ({ value: COLS[id][4], value_es: COLS[id][5] })) },
    { label: 'Format', label_es: 'Formato', values: feat.map(id => ({ value: COLS[id][6], value_es: COLS[id][7] })) },
    { label: 'Platforms', label_es: 'Plataformas', values: feat.map(id => ({ value: 'macOS & Windows', value_es: 'macOS y Windows' })) },
    { label: 'Copy Protection', label_es: 'Protección de Copia', values: feat.map(id => ({ value: COLS[id][8], value_es: COLS[id][9] })) },
    { label: 'Latency', label_es: 'Latencia', values: feat.map(id => ({ value: COLS[id][10], value_es: COLS[id][11] })) },
    { label: 'Standout Feature', label_es: 'Característica Destacada', values: feat.map(id => ({ value: COLS[id][12], value_es: COLS[id][13] })) }
  ]
};
console.log('tabla 9x7 OK');

// ---------- conclusion + verdict (sin Ozone/SSL/RX, sin conteos) ----------
g.verdict = 'FabFilter Pro-Q 4 and Pro-C 3 shape and level any vocal. Melodyne 5 fixes pitch the way humans sing, Nectar 4 Advanced finishes the chain with AI assistance, and Smooth Operator Pro tames harshness with one knob. VoxDoubler and the RePitch + VocAlign bundle cover doubles and alignment, with Soundtoys adding character on top.';
g.verdict_es = 'FabFilter Pro-Q 4 y Pro-C 3 moldean y nivelan cualquier voz. Melodyne 5 corrige el tono como cantan los humanos, Nectar 4 Advanced termina la cadena con asistencia de IA, y Smooth Operator Pro doma la dureza con una perilla. VoxDoubler y el bundle RePitch + VocAlign cubren dobles y alineación, con Soundtoys aportando carácter.';
const linksEN = ' <p><a href="/guides/best-plugins.html" class="guide-link-btn">Best Plugins for Music Production: Complete Guide</a> <a href="/guides/mixing-plugins.html" class="guide-link-btn">Best Mixing & Mastering Plugins</a> <a href="/guides/best-audio-repair-plugins.html" class="guide-link-btn">Best Audio Repair & Noise Restoration Plugins for Professional Studios</a></p>\n\n<span style="color:#f59e0b;font-size:13px">Selected Plugin Boutique purchases include a free gift — choose from a selection based on your spending level <a href="https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a" target="_blank" rel="noopener noreferrer">Learn more</a></span>';
const linksES = ' <p>También te interesa: <a href="/guides/best-plugins_es.html" class="guide-link-btn">Mejores plugins para producción musical: guía completa</a> <a href="/guides/mixing-plugins_es.html" class="guide-link-btn">Mejores plugins de mezcla y masterización</a> <a href="/guides/best-audio-repair-plugins_es.html" class="guide-link-btn">Mejores Plugins de Reparación de Audio y Restauración de Ruido para Estudios Profesionales</a></p> <span style="color:#f59e0b;font-size:13px">Ciertas compras en Plugin Boutique incluyen un regalo gratuito — elige entre una selección según cuánto gastes <a href="https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a" target="_blank" rel="noopener noreferrer">Más información</a></span>';
g.conclusion = 'The FabFilter pair handles surgical EQ and glue compression at the front of the chain. Melodyne 5 keeps tuning invisible, Nectar 4 Advanced polishes with Vocal Assistant and Auto-Level, and Smooth Operator Pro removes harshness in one move. Soundtoys adds Decapitator grit, EchoBoy space and AlterBoy character, while VoxDoubler widens and the RePitch + VocAlign bundle tunes and aligns. That is a complete professional vocal chain, end to end.' + linksEN;
g.conclusion_es = 'La pareja FabFilter maneja EQ quirúrgica y compresión pegada al inicio de la cadena. Melodyne 5 mantiene la afinación invisible, Nectar 4 Advanced pule con Asistente Vocal y Auto-Level, y Smooth Operator Pro elimina dureza en un movimiento. Soundtoys añade crudeza Decapitator, espacio EchoBoy y carácter AlterBoy, mientras VoxDoubler ensancha y el bundle RePitch + VocAlign afina y alinea. Esa es una cadena vocal profesional completa, de principio a fin.' + linksES;

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
// ---------- barrido de restos ----------
const s = JSON.stringify(g);
['Ozone', 'G-Master', 'RX 12', 'eight-plugin', 'ocho plugins', 'SSL GMaster'].forEach(k => {
  if (s.includes(k)) console.log('RESTO: ' + k);
});
console.log('PARTE 2 OK');
