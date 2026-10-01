// Verify: nothing lost, only PB entries changed, and PB entries are internally consistent.
// Baseline = d556fa5ed5, the commit immediately before the Plugin Boutique geo patch.
// Hardcoded so the check stays meaningful after this file is committed.
const fs = require('fs');
const { execSync } = require('child_process');
const BASELINE = 'd556fa5ed5';
function loadMap(src, head) {
  const h = src.indexOf(head);
  if (h === -1) throw new Error('TEST_SHOP_BTN not found');
  const open = h + head.length;
  let d = 0, q = null, i = open;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + src.slice(open, i + 1) + ')');
}
const HEAD = 'const TEST_SHOP_BTN = ';
const BASE = execSync('git show ' + BASELINE + ':build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const A = loadMap(BASE, HEAD);
const B = loadMap(fs.readFileSync('build-guides.js', 'utf8'), HEAD);
const ka = Object.keys(A), kb = Object.keys(B);
console.log('keys before/after:', ka.length, kb.length, '| same set:', JSON.stringify(ka) === JSON.stringify(kb));
const changed = ka.filter(k => JSON.stringify(A[k]) !== JSON.stringify(B[k]));
console.log('changed entries:', changed.length);
const pb = changed.filter(k => B[k].pbCur);
console.log('changed WITH pbCur:', pb.length, '| changed WITHOUT pbCur:', changed.filter(k => !B[k].pbCur).map(k => k + (B[k].urls && B[k].urls.pluginboutique ? '(url only)' : '')).join(',') || 'none');
const untouchedBad = ka.filter(k => !B[k].pbCur && JSON.stringify(A[k]) !== JSON.stringify(B[k]));

// Lista blanca de cambios NO-PB autorizados por el usuario (30/09/2026).
// id -> { campo: [valor antes, valor despues] }. Cualquier otro cambio no-PB
// respecto al baseline es un fallo: el patch PB no puede tocar otras entradas y
// las correcciones de precio deben declararse aqui una a una.
const APPROVED_NON_PB = {
  '53':  { 'prices.gear4music': ['£178.75', '£175.00'] },
  '54':  { 'prices.gear4music': ['£213.50', '£226.00'] },
  '155': { 'prices.musicstore': ['€1,775.63', undefined] },
  '156': { 'prices.musicstore': ['€1,847.90', '€1,799.00'], 'prices.andertons': ['£1,799.00', '£1,599.00'] },
  '157': { 'prices.gear4music': ['£389.00', '£419.00'], 'prices.musicstore': ['€354.12', '€488.00'] },
  '158': { 'prices.musicstore': ['€217.65', '€299.00'] },
  '159': { 'prices.zzounds': ['$419.99', '$450.00'], 'prices.gear4music': ['£399.00', '£397.00'] },
  '160': { 'prices.musicstore': ['€389.00', '€369.00'] },
  '161': { 'prices.musicstore': [undefined, '€539.00'] },
  // Epiphone Thunderbird '60s -> Thunderbird '64 (30/09/2026): modelo nuevo, no solo precio.
  '162': {
    'prices.amazon': ['$749.00', undefined],
    'prices.andertons': ['£799.00', '£749.00'],
    'prices.gear4music': ['£599.00', '£707.00'],
    'prices.musicstore': [undefined, '€756.00'],
    'urls.zzounds': ['https://www.zzounds.com/a--925521/item--EPIEBTV', undefined],
    'oos': ['["musicstore","zzounds"]', undefined]
  },
  // Squier Sonic Stratocaster HT: Music Store sale de excludeStores (30/09/2026).
  '462': { 'prices.musicstore': [undefined, '€189.00'] },
  // Yamaha Revstar Element RSE20: Music Store entra, G4M baja a £409 (30/09/2026).
  // Shure PSM300 + SE846 Gen2 (30/09/2026).
  '267': {
    'prices.zzounds': ['$419.99', '$989.00'],
    'prices.gear4music': ['£819.00', '£875.00'],
    'prices.musicstore': ['€399.00', '€959.00']
  },
  '269': {
    'prices.gear4music': ['£813', '£902.00']
  },
  // Sennheiser EW IEM G4 Stereo (30/09/2026) + Launchkey Mini re-aplicado.
  '324': {
    'prices.andertons': ['£89.00', '£99.00'],
    'prices.gear4music': ['£115.00', '£102.00'],
    'prices.musicstore': ['€111.00', '€99.00']
  },
  '349': {
    'urls.musicstore': [undefined, 'https://www.musicstore.com/en_OE/EUR/Sennheiser-ew-IEM-G4-B-Wireless-Monitor-Set/art-PAH0019940-000'],
    'prices.gear4music': ['£881', '£881.00'],
    'prices.musicstore': ['€599.00', '€949.00']
  },
  // 266 actualizado (sesion en curso).,
  // 266 actualizado (sesion en curso).
  '266': {
    'prices.musicstore': ['€1,349.00', '€1,398.00'],
    'prices.gear4music': ['£1,135.00', '£1,180.00']
  },
  // 347 actualizado (sesion en curso).
  '347': {
    'prices.musicstore': ['€199.00', '€235.00'],
    'urls.musicstore': [undefined, 'https://www.musicstore.com/en_OE/EUR/Xvive-U4-Monitor-Wireless-System/art-PAH0021563-000']
  },
  // 348 actualizado (sesion en curso).
  '348': {
    'prices.zzounds': ['$599.99', '$478.00'],
    'prices.musicstore': ['€499.00', undefined]
  },
  // 362 actualizado (sesion en curso).
  '362': {
    'prices.musicstore': ['€377.31', '€599.00'],
    'prices.gear4music': ['£419.00', '£479.00']
  },
  // 21 actualizado (sesion en curso).
  '21': {
    'prices.zzounds': ['$899.99', '$939.00']
  },
  // 117 actualizado (sesion en curso).
  '117': {
    'prices.gear4music': ['£169.00', '£194.00'],
    'urls.gear4music': ['https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FKali-Audio-LP-6-2nd-Wave-Studio-Monitor-Single%2F434C', 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FKali-Audio-LP-6-2nd-Wave-Black%2F6SIL']
  },
  // 116 actualizado (sesion en curso).
  '116': {
    'prices.gear4music': ['£115.00', '£163.00']
  },
  // 303 actualizado (sesion en curso).
  '303': {
    'prices.musicstore': ['€438.66', '€299.00'],
    'prices.gear4music': ['£293.50', '£277.00']
  },
  // 305 actualizado (sesion en curso).
  '305': {
    'prices.musicstore': ['€331.18', '€469.00']
  },
  // 300 actualizado (sesion en curso).
  '300': {
    'prices.musicstore': ['€503.40', '€599.00'],
    'prices.gear4music': [undefined, '£499.00'],
    'urls.gear4music': ['https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FKali-Audio-WS-6.2-12-Studio-Subwoofer%2F6SIX', 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FKali-Audio-WS-62-Subwoofer-Black%2F6SIX']
  },
  // 304 actualizado (sesion en curso).
  '304': {
    'prices.musicstore': ['€250.42', '€649.00'],
    'prices.gear4music': ['£249.99', '£499.00']
  },
  // 307 actualizado (sesion en curso).
  '307': {
    'prices.musicstore': ['€250.42', '€349.00'],
    'prices.gear4music': ['£295.00', '£259.00']
  },
  // 191 actualizado (sesion en curso).
  '191': {
    'prices.musicstore': ['€461.34', '€379.00'],
    'prices.gear4music': ['£363.50', '£363.00'],
    'prices.zzounds': ['$399.99', '$479.00']
  },
  // 192 actualizado (sesion en curso).
  '192': {
    'prices.musicstore': ['€432.77', '€525.00'],
    'prices.gear4music': ['£263.00', '£449.00'],
    'prices.andertons': ['£451.00', '£449.00'],
    'prices.zzounds': ['$424.99', '$499.00']
  },
  // 193 actualizado (sesion en curso).
  '193': {
    'prices.musicstore': ['€419.00', '€399.00'],
    'prices.gear4music': ['£350.00', '£374.00']
  },
  // 301 actualizado (sesion en curso).,
  // 301 actualizado (sesion en curso).
  '301': {
    'prices.amazon': ['$759.00', '$599.99']
  },
  // 26 actualizado (sesion en curso).
  '26': {
    'prices.gear4music': ['£99.00', '£85.00']
  },
  // 427 actualizado (sesion en curso).
  '427': {
    'prices.zzounds': [undefined, '$99.00'],
    'prices.musicstore': ['€83.20', '€99.00'],
    'urls.zzounds': [undefined, 'https://www.zzounds.com/item--AUDATHR30X']
  },
  // 420 actualizado (sesion en curso).
  '420': {
    'prices.zzounds': [undefined, '$109.00'],
    'prices.andertons': [undefined, '£90.00'],
    'prices.gear4music': ['£51.80', '£92.00'],
    'prices.musicstore': ['€98.00', '€111.00'],
    'urls.zzounds': [undefined, 'https://www.zzounds.com/item--SHUSRH440A'],
    'urls.andertons': [undefined, 'https://www.andertons.co.uk/shure-srh440a-professional-studio-headphones/?search_query=Shure%20SRH440A']
  },
  // 428 actualizado (sesion en curso).
  '428': {
    'prices.zzounds': ['$37.49', '$50.00'],
    'urls.gear4music': [undefined, 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FSamson-SR850-Pro-Studio-Headphones%2FD7K']
  },
  // 58 actualizado (sesion en curso).
  '58': {
    'prices.musicstore': ['€52.00', '€54.00'],
    'urls.musicstore': ['https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FKoenig-Meyer-210-2-Mikrofonstativ%2Fart-PAH0015387-000', 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FKoenig-Meyer-210-2-Microphone-Stand-Chrome-%2Fart-ACC0000029-002']
  },
  // 517 actualizado (sesion en curso).
  '517': {
    'prices.musicstore': [undefined, '€145.00'],
    'urls.musicstore': [undefined, 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FAudio-Technica-AT2040-USB%2Fart-REC0016401-000'],
    'excludeStores': ['andertons,musicstore', 'andertons']
  },
  // Lote 30/09/2026: Kontrol S61, Subsequent 37, GO:KEYS 3, MicroFreak, DeepMind 12, Hydrasynth, Take 5.
  '14': {
    'prices.gear4music': ['£595.00', '£699.00'],
    'prices.andertons': ['£595.00', undefined],
    'urls.andertons': ['https://www.andertons.co.uk/native-instruments-kontrol-s61-mk3/', 'https://www.andertons.co.uk/']
  },
  '143': {
    'prices.andertons': ['£1,525.00', '£1,469.00'],
    'prices.gear4music': ['£1,634.00', '£1,594.00'],
    'prices.musicstore': ['€1,999.00', '€1,679.00']
  },
  '370': {
    'prices.andertons': ['£305.00', '£319.00'],
    'prices.gear4music': ['£310.00', '£315.00'],
    'prices.musicstore': ['€339.00', '€349.00']
  },
  '475': {
    'prices.musicstore': ['€289.00', '€319.00']
  },
  '476': {
    'excludeStores': [['gear4music'], undefined]
  },
  '477': {
    'prices.gear4music': ['£1,199.00', '£1,099.00'],
    'prices.andertons': ['£1,014.00', '£1,058.00'],
    'prices.musicstore': ['€1,269.00', '€1,299.00']
  },
  '478': {
    'prices.zzounds': ['$1,699.99', '$1,499.00'],
    'prices.musicstore': ['€1,499.00', '€1,459.00']
  },
  // Novation Launchkey Mini 25 MK4: precios enviados por el usuario (30/09/2026).
  '324': {
    'prices.andertons': ['£89.00', '£99.00'],
    'prices.gear4music': ['£115.00', '£102.00'],
    'prices.musicstore': ['€111.00', '€99.00']
  },
  // Akai MPK Mini MK4: MS baja a €99 y zZounds pasa a AKAMPKMINI4 (el anterior era el MK3) (30/09/2026).
  '323': {
    'prices.musicstore': ['€105.04', '€99.00'],
    'urls.zzounds': ['https://www.zzounds.com/item--AKAMPKMINI3', undefined]
  },
  // SJ-200: zzounds sube a $5,799 y MS a €4,798 CON IVA (antes €4,031,90 era neto) (30/09/2026).
  '457': { 'prices.zzounds': ['$5,699.00', '$5,799.00'], 'prices.musicstore': ['€4,031.90', '€4,798.00'] },
  // J-45: MS pasa a €4,444 CON IVA (antes €3,734,50 era el precio neto) (30/09/2026).
  '456': { 'prices.musicstore': ['€3,734.50', '€4,444.00'] },
  // Martin OM-42: Music Store entra con GIT0000224-000 (30/09/2026).
  '453': { 'prices.musicstore': [undefined, '€6,599.00'] },
  // Martin D-28 estandar: G4M pasa a £3,199 y sale de oos (30/09/2026).
  '104': {
    'prices.gear4music': [undefined, '£3,199.00'],
    'urls.gear4music': ['https://www.gear4music.com/Guitar-and-Bass/Martin-D-28/26U7', undefined],
    'oos': ['["zzounds","gear4music"]', '["zzounds"]']
  },
  '464': { 'prices.musicstore': [undefined, '€479.00'], 'prices.gear4music': ['£412.00', '£409.00'] },
  // Yamaha C40: Music Store y Andertons entran (30/09/2026).
  '459': { 'prices.musicstore': [undefined, '€129.00'], 'prices.andertons': [undefined, '£129.00'] },
  '185': { 'prices.andertons': ['£2,049.00', '£2,199.00'], 'prices.gear4music': ['£2,079.00', '£2,165.00'], 'prices.musicstore': ['€1,998.00', '€2,349.00'] },
};
// aplana un nivel: prices.gear4music, urls.musicstore, oos[0]...
function flat(o) {
  const out = {};
  for (const [k, v] of Object.entries(o || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [k2, v2] of Object.entries(v)) out[k + '.' + k2] = v2;
    } else out[k] = Array.isArray(v) ? JSON.stringify(v) : v;
  }
  return out;
}
function diffFields(a, b) {
  const A = flat(a), B = flat(b);
  const out = {};
  for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
    if (JSON.stringify(A[k]) !== JSON.stringify(B[k])) out[k] = [A[k], B[k]];
  }
  return out;
}
const bad = [];
for (const k of untouchedBad) {
  const want = APPROVED_NON_PB[k];
  if (!want) { bad.push(k + ': cambiado sin estar en la lista blanca'); continue; }
  const got = diffFields(A[k], B[k]);
  const gotKeys = Object.keys(got).sort();
  const wantKeys = Object.keys(want).sort();
  if (JSON.stringify(gotKeys) !== JSON.stringify(wantKeys)) {
    bad.push(k + ': campos cambiados ' + JSON.stringify(gotKeys) + ' != autorizado ' + JSON.stringify(wantKeys));
    continue;
  }
  for (const f of wantKeys) {
    const [from, to] = want[f];
    const [gFrom, gTo] = got[f];
    if (gFrom !== from || gTo !== to) {
      bad.push(k + '.' + f + ': ' + JSON.stringify(gFrom) + '->' + JSON.stringify(gTo) + ' != autorizado ' + JSON.stringify(from) + '->' + JSON.stringify(to));
    }
  }
}
console.log('cambios no-PB autorizados:', untouchedBad.length, '/', Object.keys(APPROVED_NON_PB).length,
  '->', untouchedBad.slice().sort().join(',') || 'none');
console.log(bad.length ? 'FALLOS lista blanca:\n  ' + bad.join('\n  ') : 'lista blanca OK (sin cambios no-PB no autorizados)');
// consistency of the 38
const GBP = 0.7959;
let errs = [];
pb.forEach(k => {
  const e = B[k];
  const eu = parseFloat(e.prices.pluginboutique.replace(/[^0-9.]/g, ''));
  const us = parseFloat(e.pbCur.us.replace(/[^0-9.]/g, ''));
  const uk = parseFloat(e.pbCur.uk.replace(/[^0-9.]/g, ''));
  if (!e.prices.pluginboutique.startsWith('\u20ac')) errs.push(k + ' canonical not EUR');
  if (!e.pbCur.us.startsWith('$')) errs.push(k + ' us not $');
  if (!e.pbCur.uk.startsWith('\u00a3')) errs.push(k + ' uk not \u00a3');
  if (Math.abs(uk - +(us * GBP).toFixed(2)) > 0.005) errs.push(k + ' gbp != usd*' + GBP + ' (' + us + '->' + uk + ')');
  [e.prices.pluginboutique, e.pbCur.us, e.pbCur.uk].forEach(v => { if (!/^\D[\d,]+\.\d\d$/.test(v)) errs.push(k + ' bad format ' + v); });
});
console.log('consistency errors:', errs.length ? errs : 'none');
const sample = ['28', '60', '119', '121', '374', '382', '387', '473'];
console.log('\n id | canonical EUR   | pbCur.us      | pbCur.uk      | pb url');
sample.forEach(k => {
  const e = B[k];
  console.log(('  ' + k).padEnd(5), (e.prices.pluginboutique + '').padEnd(16), (e.pbCur.us + '').padEnd(14), (e.pbCur.uk + '').padEnd(14), (e.urls && e.urls.pluginboutique || '').slice(-46));
});
console.log('\nids WITHOUT pbCur that have a pluginboutique price:', ka.filter(k => !B[k].pbCur && B[k].prices && B[k].prices.pluginboutique).join(',') || 'none');
process.exit(bad.length ? 1 : 0);
