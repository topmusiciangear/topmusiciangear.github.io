const fs = require('fs');
const ROOT = require('path').resolve(__dirname, '..');

// ---------------------------------------------------------------
// CATEGORÍAS
// ---------------------------------------------------------------
// 1) RECUPERADOS: URL nueva verificada + precio live (JSON-LD Andertons, propio)
const RECOVERED = {
  6: ['https://www.andertons.co.uk/fender-american-professional-ii-stratocaster-mystic-surf-green-maple-fingerboard/', 1849],
  112: ['https://www.andertons.co.uk/fl-studio-20-producer-edition-esd/', 199],
  122: ['https://www.andertons.co.uk/izotope-rx-12-advanced/', 1299],
  143: ['https://www.andertons.co.uk/moog-subsequent-37-paraphonic-analog-synth', 1525],
  149: ['https://www.andertons.co.uk/yamaha-mg16xu-16-channel-usb-mixing-desk-with-fx/', 504],
  176: ['https://www.andertons.co.uk/moog-muse-8voice-analog-bitimbral-polyphonic-synth/', 2778],
  220: ['https://www.andertons.co.uk/Neumann-KH120-II-Active-Studio-Monitor-EACH/', 699],
  224: ['https://www.andertons.co.uk/focal-twin-6-st6-studio-monitors/', 1675],
  231: ['https://www.andertons.co.uk/audix-om7-dynamic-vocal-mic/', 236],
  294: ['https://www.andertons.co.uk/Positive-Grid-Spark-2-50w-Practice-Amp/', 269],
  302: ['https://www.andertons.co.uk/iloud-micro-monitor-pro--single-mic-not-included/', 249],
  310: ['https://www.andertons.co.uk/squier-affinity-stratocaster-black', 239],
  311: ['https://www.andertons.co.uk/squier-classic-vibe-50s-stratocaster-in-black', 399],
  325: ['https://www.andertons.co.uk/m-audio-hammer-88-88-key-hammer-action-usb-midi-controller/', 379],
  329: ['https://www.andertons.co.uk/rode-procaster-dynamic-microphone-prodeprocaster/', 164],
  332: ['https://www.andertons.co.uk/tascam-model-12-10-channel-analogue-mixer-with-12-track-digital-recorder-usb-interface/', 525],
  333: ['https://www.andertons.co.uk/allen-heath-zedi10fx-hybrid-compact-mixer-usb-interface/', 246],
  334: ['https://www.andertons.co.uk/ssl-big-six/', 1499],
  339: ['https://www.andertons.co.uk/sennheiser-mkh-416-p48u3-shotgun-microphone/', 739],
  340: ['https://www.andertons.co.uk/rode-ntg5-shotgun-mic-inc-ws10-windshield/', 472],
  342: ['https://www.andertons.co.uk/sennheiser-mke600-shotgun-condensor-mic-for-cameras/', 222],
  345: ['https://www.andertons.co.uk/Rode-Microphones-VMNTG-VideoMic-NTG-OnCamera-Shotgun-Microphone/', 219],
  352: ['https://www.andertons.co.uk/gretsch-jim-dandy-parlor-wpg-rxb', 189],
  357: ['https://www.andertons.co.uk/gretsch-g5021e-rancher-penguin-parlor-acoustic-electric-black/', 485],
  361: ['https://www.andertons.co.uk/fender-highway-series-parlor-rosewood-fingerboard-all-mahogany/', 829],
  362: ['https://www.andertons.co.uk/sennheiser-xsw-iem-set-e-823200-831800-mhz/', 479],
  364: ['https://www.andertons.co.uk/beyerdynamic-m160-double-ribbon-dynamic-microphone/', 799],
  377: ['https://www.andertons.co.uk/baby-audio-transit-2-motion-effects-plugin/', 99],
  381: ['https://www.andertons.co.uk/izotope-neutron-5-standard--esd/', 252],
  386: ['https://www.andertons.co.uk/izotope-trash-creative-distortion-plugin/', 95],
  440: ['https://www.andertons.co.uk/fender-american-ultra-ii-stratocaster-maple-fingerboard-avalanche/', 1999],
  443: ['https://www.andertons.co.uk/electro-harmonix-nano-small-stone-phaser-pedal/', 69.99],
  444: ['https://www.andertons.co.uk/fender-player-ii-telecaster-maple-fingerboard-mocha/', 799]
};
const URL_SET = {};
for (const k of Object.keys(RECOVERED)) URL_SET[Number(k)] = RECOVERED[k][0];

// 2) MISMATCH: página correcta verificada, precio cfg erróneo -> precio live
const MISMATCH = { 28: 269, 60: 25, 58: 54, 91: 589, 114: 299, 135: 679, 174: 2999, 175: 3899, 226: 163, 232: 129, 234: 2549, 235: 803, 239: 386, 267: 859, 365: 323, 406: 1510 };

// 3) OOS: quitar precio andertons + añadir oos (dead no recuperados + solo-precio sin producto)
const OOS_ADD = new Set([20, 32, 67, 125, 126, 155, 191, 223, 240, 244, 335, 341, 350, 355, 400, 408, 414, 429, 430, 434]);
const URL_DELETE = new Set([20, 125, 126, 155, 191, 223, 240, 244, 335, 341, 350, 355, 400, 408, 414]);

// 4) precio+oos ya marcado: solo quitar precio andertons
const PRICE_REMOVE_ONLY = new Set([190, 280, 281, 287]);

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------
function fmtP(n) {
  const s = Number(n).toFixed(2);
  const [i, d] = s.split('.');
  return '£' + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + d;
}
function serVal(v) {
  if (typeof v === 'string') return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) return '[' + v.map(serVal).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).map(k => k + ':' + serVal(v[k])).join(',') + '}';
  return String(v);
}
function serEntry(o) { return '{' + Object.keys(o).map(k => k + ':' + serVal(o[k])).join(',') + '}'; }

// ---------------------------------------------------------------
// PATCH build-guides.js (TEST_SHOP_BTN)
// ---------------------------------------------------------------
let src = fs.readFileSync(ROOT + '/build-guides.js', 'utf8');
const btnStart = src.indexOf('const TEST_SHOP_BTN = {');
const dd = src.indexOf('\n};', btnStart);
const btnEnd = dd === -1 ? src.indexOf('\n}', btnStart) : dd;
const block = src.substring(btnStart, btnEnd + 2);
const EOL = src.includes('\r\n') ? '\r\n' : '\n';

function findEntry(block, id) {
  const re = new RegExp('^(\\s*)(' + id + '):\\s*\\{', 'm');
  const m = block.match(re);
  if (!m) return null;
  let i = block.indexOf('{', m.index);
  let depth = 0;
  for (; i < block.length; i++) {
    if (block[i] === '{') depth++;
    else if (block[i] === '}') { depth--; if (depth === 0) break; }
  }
  let j = i + 1;
  while (j < block.length && /\s/.test(block[j])) j++;
  const hasComma = block[j] === ',';
  return { start: m.index, end: i, leadingWs: m[1], hasComma };
}
function parseEntry(entryText) {
  const expr = entryText.replace(/^(\s*)\d+:\s*/, '').replace(/,\s*$/, '');
  return new Function('return (' + expr + ');')();
}

const edits = [];
const edited = [];
const created = [];
const missing = [];
const touched = new Set(Object.keys(RECOVERED).map(Number));
for (const k of Object.keys(MISMATCH)) touched.add(Number(k));
for (const k of OOS_ADD) touched.add(k);
for (const k of PRICE_REMOVE_ONLY) touched.add(k);

function patchEntry(id, block, objMod, mustOos) {
  const found = findEntry(block, id);
  if (!found) {
    missing.push(id);
    const newObj = objMod(mustOos ? { oos: ['andertons'] } : {});
    const newLine = foundLeading(id) + id + ': ' + serEntry(newObj) + ',';
    created.push(id);
    return newLine;
  }
  const t = block.substring(found.start, found.end + 1);
  const obj = parseEntry(t);
  const res = objMod(obj);
  const newLine = found.leadingWs + id + ': ' + serEntry(res || obj) + ',';
  edited.push(id);
  return newLine;
}
// indentation convention for created entries: match surrounding (4 spaces seen in file groups varies; use 4)
function foundLeading(id) { return '    '; }

for (const id of touched) {
  const isRec = RECOVERED[id];
  const isMis = MISMATCH[id];
  const isOos = OOS_ADD.has(id);
  const isRmOnly = PRICE_REMOVE_ONLY.has(id);
  const newLine = patchEntry(id, block, (obj) => {
    if (isRec) {
      obj.prices = obj.prices || {};
      obj.prices.andertons = fmtP(isRec[1]);
      if (Array.isArray(obj.oos)) { const i = obj.oos.indexOf('andertons'); if (i >= 0) obj.oos.splice(i, 1); }
      else delete obj.oos;
    } else if (isMis) {
      obj.prices = obj.prices || {};
      obj.prices.andertons = fmtP(isMis);
    } else {
      if (isOos) {
        obj.oos = obj.oos || [];
        if (obj.oos.indexOf('andertons') < 0) obj.oos.push('andertons');
      }
      if (obj.prices && obj.prices.andertons !== undefined) delete obj.prices.andertons;
    }
    return obj;
  }, isOos);
  edits.push({ id, newLine });
}

// apply replacements within block (reverse order by position found)
const applied = edits.map(e => {
  const f = findEntry(block, e.id);
  if (f) return { start: f.start, end: f.end + 1, newLine: e.newLine, id: e.id };
  // created entries: append after last entry (before closing brace of block)
  return { append: true, newLine: e.newLine, id: e.id };
});
let blockOut = block;
for (const ap of applied.filter(a => !a.append).sort((a, b) => b.start - a.start)) {
  let k = ap.end;
  while (blockOut[k] === ',') k++;
  blockOut = blockOut.substring(0, ap.start) + ap.newLine + blockOut.substring(k);
}
if (applied.some(a => a.append)) {
  const insertAt = blockOut.lastIndexOf('}');
  const tail = blockOut.substring(insertAt);
  let additions = applied.filter(a => a.append).map(a => a.newLine + '\n').join('');
  blockOut = blockOut.substring(0, insertAt) + additions + tail;
}
src = src.substring(0, btnStart) + blockOut + src.substring(btnEnd + 2);
fs.writeFileSync(ROOT + '/build-guides.js', src, 'utf8');
console.log('TEST_SHOP_BTN patched. edited:', edited.length, 'created:', created.length, 'missing:', missing.length);

// ---------------------------------------------------------------
// PATCH data/products.json
// ---------------------------------------------------------------
const products = JSON.parse(fs.readFileSync(ROOT + '/data/products.json', 'utf8'));
let urlSetN = 0, urlDelN = 0;
for (const p of products) {
  if (URL_SET[p.id]) {
    p.stores = p.stores || {};
    p.stores.andertons = URL_SET[p.id];
    urlSetN++;
  } else if (URL_DELETE.has(p.id) && p.stores && p.stores.andertons) {
    delete p.stores.andertons;
    urlDelN++;
  }
}
fs.writeFileSync(ROOT + '/data/products.json', JSON.stringify(products, null, 2) + '\n', 'utf8');
console.log('products.json patched. URLs set:', urlSetN, 'URLs deleted:', urlDelN);