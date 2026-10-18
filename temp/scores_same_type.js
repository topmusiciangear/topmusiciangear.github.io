const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ============================================================
// GUÍAS PURAS: mismo tipo de producto (comparación homogénea)
// ============================================================
const SAME_TYPE_GUIDES = new Set([
  // MONITORS
  'best-monitors', 'best-monitors-for-small-rooms', 'budget-monitors',
  'pro-monitors', 'best-compact-monitors', 'best-5-inch-monitors',
  'jbl-vs-kali', 'hs8-vs-rokit-7', 'atc-vs-genelec', 'adam-vs-genelec',
  'kh750-vs-7050c', 'studio-subwoofers', 'studio-subwoofers-setup',
  'best-home-studio-speakers',

  // HEADPHONES (tipos específicos)
  'best-headphones-for-mixing', 'best-in-ear-monitors',
  'tracking-headphones', 'open-headphones', 'pro-headphones',
  'ie900-vs-se846', 'k371-vs-mdr7506', 'm50x-vs-dt770',
  'm50x-vs-mdr7506', 'hd490-pro-vs-dt990', 'dt770-vs-dt990',

  // MICROPHONES (tipos específicos)
  'best-condenser-mics', 'best-ribbon-mics', 'best-shotgun-mics',
  'stage-mics', 'stage-wireless', 'wireless-lapel-mics',
  'best-mic-for-podcasting', 'best-mic-for-guitar-amps',
  'usb-mics', 'budget-usb-mics', 'best-instrument-mics',
  'sm57-vs-sm58', 'sm57-vs-md421', 'sm7b-vs-nt1',
  're20-vs-sm7b', 'c414-vs-u87',

  // GUITARS (electric)
  'best-electric-guitar', 'best-electric-guitars-2026',
  'best-beginner-electric-guitar', 'best-guitar-home-office',
  'fender-guide', 'beginner-guitar',
  'player-strat-vs-pacifica', 'american-pro-vs-les-paul',

  // ACOUSTIC GUITARS
  'best-acoustic-guitars-for-beginners', 'best-parlor-guitars',
  'acoustic-guitars-guide', 'martin-d28-vs-taylor-314',

  // BASSES
  'best-bass-under-700', 'best-5-string-basses', 'pro-basses',
  'fender-bass-guide', 'beginner-bass-guitars', 'precision-vs-jazz',

  // DRUM MACHINES
  'best-drum-machine', 'pro-drum-machines',
  'digitakt-ii-vs-tr8s', 'compact-rhythm-devices',
  'beat-making', 'beatmaker-plugins',

  // SAMPLERS
  'best-hardware-samplers',

  // SYNTHS (hardware)
  'best-synthesizers', 'pro-synths', 'nord-stage-4-vs-montage-m8x',

  // KEYBOARDS (stage/digital pianos)
  'best-stage-keyboards', 'best-digital-pianos', 'p225-vs-fp30x',

  // MIXERS (live sound)
  'best-live-sound-mixers', 'pro-mixers', 'best-digital-mixers',
  'best-analog-mixers', 'best-32-channel-digital-mixers',
  'best-compact-mixers', 'xr18-vs-cq18t', 'xr18-vs-m32r',

  // PA SPEAKERS
  'best-pa-speakers', 'budget-pa-systems', 'live-sound-pa',
  'best-live-subwoofers', 'dxr-vs-prx', 'zlx-vs-k12', 'stage-wedges',

  // AUDIO INTERFACES (tipos específicos)
  'portable-interfaces', 'streaming-interfaces',
  'apollo-vs-babyface', 'audient-vs-motu', 'rme-vs-motu',
  'scarlett-vs-motu', 'scarlett-vs-ssl', 'scarlett-vs-volt',
  'bridge-cast-x-vs-rodecaster-pro2', 'rodecaster-pro2-vs-dlz-creator',

  // GUITAR AMPS (comparaciones específicas)
  'blues-junior-vs-ac30', 'katana-vs-dsl', 'slg200s-vs-gs-mini',

  // BASS AMPS
  'best-bass-amps', 'best-bass-practice-amps',

  // GUITAR PEDALS (comparaciones específicas)
  'ts9-vs-bd2', 'me90-vs-mx5',

  // PLUGINS (tipos específicos)
  'vocal-plugins', 'channel-strip-plugins', 'reverb-delay',
  'best-reverb-delay', 'sidechain-modulation-plugins',
  'fabfilter-vs-ozone', 'ozone-vs-fabfilter', 'ai-tools-plugins',
  'best-midi-theory-plugins', 'beatmaker-plugins',

  // DAW COMPARISONS
  'ableton-vs-fl-studio', 'ableton-vs-logic', 'pro-tools-vs-cubase',

  // WIRELESS IEMS
  'best-wireless-iems', 'ew-iem-g4-twin-vs-psm300',

  // WIRELESS INTERCOMS
  'wireless-intercom-systems', 'blx288-vs-ewd',

  // SPECIFIC MIC COMPARISONS
  'j48-vs-rndi', 'di-box',

  // KEYBOARDS VST (specific types)
  'best-midi-theory-plugins', 'best-piano-keyboard-vsts',
  'best-synth-vsts', 'best-guitar-plugins',
]);

// ============================================================
// EXTRAER POSICIONES SOLO DE GUÍAS PURAS
// ============================================================

const productPositions = {};

guides.forEach(g => {
  if (!SAME_TYPE_GUIDES.has(g.id)) return;

  // productTable columns
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach((col, colIdx) => {
      const title = col.title || col.title_es;
      if (!title) return;
      const key = title.toLowerCase().trim();
      if (!productPositions[key]) productPositions[key] = [];
      productPositions[key].push({
        guide: g.id, position: colIdx + 1,
        total: g.productTable.columns.length,
        isTop: colIdx === 0
      });
    });
  }
  // productTable rows values
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(row => {
      if (!row.values) return;
      row.values.forEach((val, colIdx) => {
        const title = val.label || val.label_es || val.value || val.value_es;
        if (!title) return;
        const key = title.toLowerCase().trim();
        if (!productPositions[key]) productPositions[key] = [];
        productPositions[key].push({
          guide: g.id, position: colIdx + 1,
          total: g.productTable.columns?.length || 0,
          rowLabel: row.label_es || row.label
        });
      });
    });
  }
  // verdictProsCons
  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((v, idx) => {
      const title = v.name || v.name_es;
      if (!title) return;
      const key = title.toLowerCase().trim();
      if (!productPositions[key]) productPositions[key] = [];
      productPositions[key].push({
        guide: g.id, position: idx + 1,
        total: g.verdictProsCons.length,
        verdict: v.name_es || v.name,
        isTop: idx === 0
      });
    });
  }
});

console.log('Entradas de posición en guías puras: ' + Object.keys(productPositions).length);

// ============================================================
// MAPEAR A PRODUCTOS.JSON
// ============================================================

const productIndex = {};
products.forEach((p, idx) => {
  const keys = [p.title, p.title_es].filter(Boolean).map(k => k.toLowerCase().trim());
  keys.forEach(k => { if (!productIndex[k]) productIndex[k] = []; productIndex[k].push(idx); });
});

const scoresFromGuides = {};

Object.entries(productPositions).forEach(([key, positions]) => {
  let matches = productIndex[key];
  if (!matches) {
    matches = Object.keys(productIndex).filter(k => k.includes(key) || key.includes(k))
      .flatMap(k => productIndex[k]);
  }
  if (!matches || matches.length === 0) return;

  positions.forEach(pos => {
    // Score basado en posición: top=9.5, bottom=7.0
    const n = pos.total;
    const pct = (pos.position - 1) / Math.max(1, n - 1);
    const score = Math.round((9.5 - 2.5 * pct) * 10) / 10;
    matches.forEach(idx => {
      if (!scoresFromGuides[idx]) scoresFromGuides[idx] = [];
      scoresFromGuides[idx].push({ score, guide: pos.guide, position: pos.position, total: n });
    });
  });
});

// ============================================================
// APLICAR PROMEDIO
// ============================================================

let applied = 0;
Object.entries(scoresFromGuides).forEach(([idxStr, arr]) => {
  const idx = parseInt(idxStr);
  const avg = arr.reduce((a, b) => a + b.score, 0) / arr.length;
  const rounded = Math.round(avg * 10) / 10;
  if (products[idx].score === undefined || rounded > products[idx].score) {
    products[idx].score = rounded;
    applied++;
    console.log(`  ${products[idx].id}: ${products[idx].title} -> ${rounded} (${arr.length} guías puras)`);
  }
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nScores de guías puras aplicados: ' + applied);
const conScore = products.filter(p => p.score !== undefined).length;
console.log('Productos con score total: ' + conScore);