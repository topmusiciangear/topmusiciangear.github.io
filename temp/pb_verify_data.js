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
const changed = ka.filter(k => B[k] && JSON.stringify(A[k]) !== JSON.stringify(B[k]));
console.log('changed entries:', changed.length);
// Fusiones/eliminaciones autorizadas (AT2040USB 517->286, Ultra II 184->440,
// PRS 320->312) y altas nuevas (518 Yeti, 527 Spaced Out): no son cambios de precio.
const removed = ka.filter(k => !B[k]);
const added = kb.filter(k => !A[k]);
console.log('removed:', removed.join(',') || 'none', '| added:', added.join(',') || 'none');
const REMOVED_OK = ['184', '320', '517'];
const ADDED_OK = ['518', '527', '528', '529', '530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '540', '541', '542', '543', '544', '545', '546', '547', '548', '549', '550', '551'];
const badKeys = [...removed.filter(k => !REMOVED_OK.includes(k)), ...added.filter(k => !ADDED_OK.includes(k))];
const pb = changed.filter(k => B[k].pbCur);
console.log('changed WITH pbCur:', pb.length, '| changed WITHOUT pbCur:', changed.filter(k => !B[k].pbCur).map(k => k + (B[k].urls && B[k].urls.pluginboutique ? '(url only)' : '')).join(',') || 'none');
const untouchedBad = ka.filter(k => B[k] && !B[k].pbCur && JSON.stringify(A[k]) !== JSON.stringify(B[k]));

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
    'prices.musicstore': ['€199.00', '€235.00']
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
    'prices.gear4music': ['£169.00', '£194.00']
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
  // 167 actualizado (sesion en curso): Andertons con precio, sale de oos.
  '167': {
    'prices.andertons': [undefined, '£41.00'],
    'oos': ['["andertons"]', undefined]
  },
  // 300 actualizado (sesion en curso).
  '300': {
    'prices.musicstore': ['€503.40', '€599.00'],
    'prices.gear4music': [undefined, '£499.00']
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
    'prices.amazon': ['$759.00', '$599.99'],
    'prices.musicstore': ['€587.40', '€699.00']
  },
  // 26 actualizado (sesion en curso).
  '26': {
    'prices.gear4music': ['£99.00', '£85.00']
  },
  // 427 actualizado (sesion en curso).
  '427': {
    'prices.zzounds': [undefined, '$99.00'],
    'prices.musicstore': ['€83.20', '€99.00']
  },
  // 420 actualizado (sesion en curso).
  '420': {
    'prices.zzounds': [undefined, '$109.00'],
    'prices.andertons': [undefined, '£90.00'],
    'prices.gear4music': ['£51.80', '£92.00'],
    'prices.musicstore': ['€98.00', '€111.00']
  },
  // 428 actualizado (sesion en curso).
  '428': {
    'prices.zzounds': ['$37.49', '$50.00']
  },
  // 58 actualizado (sesion en curso).
  '58': {
    'prices.musicstore': ['€52.00', '€54.00']
  },
  // 517 actualizado (sesion en curso).,
  // 517 actualizado (sesion en curso).,
  // 517 actualizado (sesion en curso).
  '517': {
    'prices.andertons': [undefined, '£129.00'],
    'urls.andertons': [undefined, 'https://www.andertons.co.uk/audio-technica-at2040-usb-microphone/'],
    'excludeStores': ['andertons', undefined]
  },
  // 518 actualizado (sesion en curso).
  '518': {
    'urls.gear4music': ['https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FBlue-Yeti-USB-Microphone%2F8453', 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FBlue-Yeti-USB-Microphone-Slate%2F3U30']
  },
  // 329 actualizado (sesion en curso).
  '329': {
    'prices.zzounds': ['$229.00', '$218.00'],
    'prices.gear4music': ['£167.50', '£164.00']
  },
  // 1 actualizado (sesion en curso).
  '1': {
    'prices.gear4music': ['£381.50', '£387.00']
  },
  // 252 actualizado (sesion en curso).
  '252': {
    'prices.gear4music': ['£169.75', '£165.00']
  },
  // 271 actualizado (sesion en curso).
  '271': {
    'prices.zzounds': [undefined, '$499.00'],
    'urls.zzounds': ['https://www.zzounds.com/item--TAYGSMINI', 'https://www.zzounds.com/item--TAYGSMINISV2'],
    'oos': ['["zzounds"]', undefined]
  },
  // 467 actualizado (sesion en curso).
  '467': {
    'prices.musicstore': ['€579.00', '€669.00'],
    'prices.zzounds': ['$599.99', '$629.00']
  },
  // 25 actualizado (sesion en curso).
  '25': {
    'prices.musicstore': ['€125.21', '€149.00']
  },
  // 56 actualizado (sesion en curso).
  '56': {
    'prices.gear4music': ['£129.00', '£140.00']
  },
  // 57 actualizado (sesion en curso).
  '57': {
    'prices.gear4music': ['£125.00', '£134.00']
  },
  // Lote 30/09/2026: Kontrol S61, Subsequent 37, GO:KEYS 3, MicroFreak, DeepMind 12, Hydrasynth, Take 5.
  '14': {
    'prices.gear4music': ['£595.00', '£699.00'],
    'prices.andertons': ['£595.00', undefined],
    'oos': [undefined, '["andertons"]']
  },
  '143': {
    'prices.andertons': ['£1,525.00', '£1,469.00'],
    'prices.gear4music': ['£1,634.00', '£1,594.00'],
    'prices.musicstore': ['€1,999.00', '€1,679.00']
  },
  '370': {
    'prices.andertons': ['£305.00', '£319.00'],
    'prices.gear4music': ['£310.00', '£315.00'],
    'prices.musicstore': ['€339.00', '€349.00'],
    'urls.gear4music': ['https://www.gear4music.com/Keyboards-and-Pianos/Roland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue/6AB8', 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FKeyboards-and-Pianos%2FRoland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue%2F6AB8']
  },
  '475': {
    'prices.musicstore': ['€289.00', '€319.00'],
    'oos': [undefined, '["gear4music"]']
  },
  '476': {
    'oos': ['["zzounds"]', '["gear4music","zzounds"]']
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
  '262': { 'prices.zzounds': ['$129.99', '$179.00'], 'prices.gear4music': ['£93.10', '£94.00'], 'prices.musicstore': ['€167.23', '€115.00'] },
  '412': { 'prices.amazon': ['$2,499.00', undefined], 'prices.andertons': ['£1,614.00', '£2,159.00'], 'prices.musicstore': ['€1,678.99', '€1,899.00'], 'prices.gear4music': [undefined, '£2,399.00'], 'urls.zzounds': [undefined, 'https://www.zzounds.com/item--PRSSTUDIOLIVE32S'], 'urls.musicstore': [undefined, 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FPresonus-StudioLive-32S%2Fart-REC0014236-000'] },
  '152': { 'prices.zzounds': ['$1,232.49', '$1,450.00'], 'prices.gear4music': ['£989.00', '£975.00'], 'prices.musicstore': ['€917.31', '€1,299.00'] },
  '414': { 'prices.amazon': ['$5,199.00', undefined], 'prices.gear4music': ['£4,499.00', '£3,799.00'], 'prices.musicstore': ['€2,889.92', '€4,499.00'], 'prices.zzounds': [undefined, '$5,999.00'], 'prices.andertons': [undefined, '£3,799.00'], 'urls.andertons': [undefined, 'https://www.andertons.co.uk/allen-heath-sq-6-digital-mixer-2/?search_query=Allen%20%26%20Heath%20SQ-6'], 'oos': ['["andertons"]', undefined] },
  '406': { 'prices.zzounds': ['$1,599.99', '$1,599.00'], 'prices.musicstore': ['€1,503.36', '€1,789.00'] },
  '418': { 'prices.zzounds': [undefined, '$3,099.00'], 'prices.musicstore': ['€3,360.50', '€4,498.00'] },
  '402': { 'prices.gear4music': ['£1,447.00', '£1,348.00'], 'prices.musicstore': ['€1,306.72', '€1,555.00'], 'urls.zzounds': ['https://www.zzounds.com/a--925521/item--BEHX32', 'https://www.zzounds.com/item--BEHX32'] },
  '403': { 'prices.gear4music': ['£3,139.00', '£2,969.00'], 'prices.andertons': ['£2,599.00', '£2,659.00'], 'prices.musicstore': ['€2,501.68', '€2,977.00'] },
  '411': { 'prices.zzounds': [undefined, '$1,866.00'], 'prices.amazon': ['$1,699.99', '$1,799.99'], 'prices.gear4music': [undefined, '£1,447.00'] },
  '333': { 'prices.zzounds': [undefined, '$460.00'] },
  '137': { 'prices.zzounds': ['$250.74', '$325.00'] },
  '185': { 'prices.andertons': ['£2,049.00', '£2,199.00'], 'prices.gear4music': ['£2,079.00', '£2,165.00'], 'prices.musicstore': ['€1,998.00', '€2,349.00'] },
  '371': { 'prices.zzounds': ['$199.99', '$239.99'], 'prices.andertons': ['£149.00', '£118.00'], 'prices.gear4music': ['£155.00', '£125.00'], 'prices.musicstore': ['€167.98', '€159.00'] },
  '480': { 'prices.gear4music': [undefined, '£2,910.00'], 'urls.gear4music': [undefined, 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FGenelec-7370A-Smart-Active-Monitoring-Subwoofer-Dark-Grey%2F1MYN'] },
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
if (badKeys.length) console.log('FALLOS altas/bajas: ' + badKeys.join(','));
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
console.log('\nids WITHOUT pbCur that have a pluginboutique price:', ka.filter(k => B[k] && !B[k].pbCur && B[k].prices && B[k].prices.pluginboutique).join(',') || 'none');
process.exit(bad.length || badKeys.length ? 1 : 0);
