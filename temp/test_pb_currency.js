// Plugin Boutique geo-currency test.
// Exercises the REAL doSwap branch (extracted from js/shop-buttons.js) against a DOM shim,
// plus static-markup and data-map assertions on the generated guides.
const fs = require('fs');

let fail = 0;
const ok = (cond, msg) => { if (!cond) fail++; console.log((cond ? 'ok   ' : 'FAIL ') + msg); };
const read = f => fs.readFileSync(f, 'utf8');

function balancedExtract(src, name) {
  const s = src.indexOf('function ' + name + '(');
  if (s === -1) throw new Error('not found: ' + name);
  let i = src.indexOf('{', s), depth = 0, started = false;
  for (; i < src.length; i++) {
    if (src[i] === '{') { depth++; started = true; }
    else if (src[i] === '}') { depth--; if (started && depth === 0) return src.substring(s, i + 1); }
  }
  throw new Error('unbalanced: ' + name);
}

// --- price-cell element shim (same contract as the browser node) ---
function PriceCell(html) {
  let attrs = {};
  const parse = h => {
    const m = h.match(/^<span class="shop-price" data-price="([^"]*)"/);
    attrs = m ? { 'data-price': m[1] } : {};
  };
  parse(html);
  let _html = html;
  this.getAttribute = k => (k in attrs ? attrs[k] : null);
  this.setAttribute = (k, v) => { attrs[k] = v; };
  this.querySelector = sel => (sel === '.shop-price' ? this : null);
  Object.defineProperty(this, 'innerHTML', { get: () => _html, set: h => { _html = h; parse(h); } });
  Object.defineProperty(this, 'outerHTML', { get: () => _html, set: h => { _html = h; parse(h); } });
}

const WHITE = 'color:#ffffff';
const GRAY = 'color:#a8a8a8';

// 1) Data map: 38 PB entries carry EUR canonical + US/UK overrides, GBP = USD x 0.7959
const buildGuide = read('build-guides.js');
function loadMap(file, head) {
  const s = read(file);
  const h = s.indexOf(head), open = h + head.length;
  let d = 0, q = null, i = open;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + s.slice(open, i + 1) + ')');
}
const MAP = loadMap('build-guides.js', 'const TEST_SHOP_BTN = ');
const pbIds = Object.keys(MAP).filter(id => MAP[id].prices && MAP[id].prices.pluginboutique);
const withCur = pbIds.filter(id => MAP[id].pbCur && MAP[id].pbCur.us && MAP[id].pbCur.uk);
ok(pbIds.length === 38, 'TEST_SHOP_BTN has 38 Plugin Boutique entries (' + pbIds.length + ')');
ok(withCur.length === pbIds.length, 'every PB entry has pbCur.us + pbCur.uk (' + withCur.length + '/' + pbIds.length + ')');
ok(pbIds.every(id => MAP[id].prices.pluginboutique.startsWith('€')), 'every PB canonical price is EUR');
ok(pbIds.every(id => MAP[id].pbCur.us.startsWith('$')), 'every pbCur.us is USD');
ok(pbIds.every(id => MAP[id].pbCur.uk.startsWith('£')), 'every pbCur.uk is GBP');
const num = v => parseFloat(String(v).replace(/[^0-9.]/g, ''));
const badGbp = withCur.filter(id => Math.abs(num(MAP[id].pbCur.uk) - +(num(MAP[id].pbCur.us) * 0.7959).toFixed(2)) > 0.005);
ok(badGbp.length === 0, 'GBP = USD x 0.7959 for all entries' + (badGbp.length ? ' (bad: ' + badGbp + ')' : ''));
ok(pbIds.every(id => [MAP[id].prices.pluginboutique, MAP[id].pbCur.us, MAP[id].pbCur.uk].every(v => /^\D[\d,]+\.\d\d$/.test(v))), 'all three currencies keep 2 decimals + thousands commas');
ok(!Object.keys(MAP).some(id => MAP[id].prices && /pluginboutique: "\d/.test(JSON.stringify(MAP[id].prices))), 'no PB price lost its currency symbol');
// known fixes
ok(MAP['382'] && MAP['382'].urls && /14563-Scaler-3/.test(MAP['382'].urls.pluginboutique), 'id 382 points at Scaler 3 (not Scaler 2)');
ok(MAP['119'] && MAP['119'].prices.pluginboutique === '€168.19' && MAP['119'].pbCur.us === '$166.79', 'id 119 price corrected (was $39.00)');
ok(!/6439-Scaler-2/.test(read('data/products.json').split('"stores"')[1] || ''), 'products.json no longer references Scaler 2 for id 382');

// 2) Render: the PB primary emits the three regional amounts
ok(/pbAttrs = ' data-pb-eu-p="' \+ fmtPricePlain/.test(buildGuide), 'build emits data-pb-eu-p from fmtPricePlain');
ok(/data-pb-us-p="' \+ fmtPricePlain\(cfg\.pbCur\.us\)/.test(buildGuide), 'build emits data-pb-us-p');
ok(/data-pb-uk-p="' \+ fmtPricePlain\(cfg\.pbCur\.uk\)/.test(buildGuide), 'build emits data-pb-uk-p');
ok(/primaryStoreKey === 'pluginboutique' && cfg\.pbCur/.test(buildGuide), 'pbAttrs gated on the PB primary + pbCur');
ok(/hollyAttrs \+ pbAttrs \+ ' target=/.test(buildGuide), 'pbAttrs injected into the primary anchor');

// 3) Static markup in the generated guides
for (const [file, lang] of [['guides/fx-plugins.html', 'en'], ['guides/fx-plugins_es.html', 'es']]) {
  const html = read(file);
  const primaries = html.match(/<a data-store="pluginboutique"[^>]*>/g) || [];
  ok(primaries.length > 0, file + ': has PB primaries (' + primaries.length + ')');
  const withAttrs = primaries.filter(m => /data-pb-eu-p="€[^"]+" data-pb-us-p="\$[^"]+" data-pb-uk-p="£[^"]+"/.test(m));
  ok(withAttrs.length === primaries.length, file + ': every PB primary has eu/us/uk amounts (' + withAttrs.length + '/' + primaries.length + ')');
  // displayed price must equal data-pb-eu-p (build-time zone = EU)
  const cards = (html.match(/<a data-store="pluginboutique"[\s\S]*?<\/a>/g) || []);
  const mismatch = cards.filter(m => {
    const eu = (m.match(/data-pb-eu-p="([^"]*)"/) || [])[1];
    return eu && !m.includes("data-price='" + eu + "'");
  });
  ok(cards.length === primaries.length, file + ': matched ' + cards.length + ' full PB buttons');
  ok(mismatch.length === 0, file + ': displayed primary price equals data-pb-eu-p' + (mismatch.length ? ' (' + mismatch.length + ' bad)' : ''));
  const label = lang === 'es' ? 'Aprox.' : 'Approx.';
  const cell = (html.match(/<span class='shop-price' data-price='€[^']*'><span style='font-size:12px;font-weight:600;color:#[0-9a-f]+;font-style:italic'>/g) || []);
  ok(cell.length > 0, file + ': PB price cells use the label + color variant (' + cell.length + ')');
  ok(html.includes('>' + label + '</span> €'), file + ': label is ' + label);
  const whiteCells = (html.match(/<span class='shop-price' data-price='€[^']*'><span style='font-size:12px;font-weight:600;color:#ffffff/g) || []);
  ok(whiteCells.length > 0, file + ': PB primary price label is white (' + whiteCells.length + ')');
  ok(!/<a data-store="pluginboutique"[^>]*data-pb-eu-p="\$/.test(html), file + ': no PB primary advertises a USD canonical');
}

// 4) Functional: run the REAL doSwap for every zone
const spa = read('js/shop-buttons.js');
const helpers = balancedExtract(spa, 'tmgIsEsDoc') + '\n' + balancedExtract(spa, 'tmgPriceHtml') + '\n' + balancedExtract(spa, 'doSwap');
function runSwap(zone, lang) {
  const cell = new PriceCell('');
  const attrs = { 'data-store': 'pluginboutique', href: 'https://www.pluginboutique.com/product/1/9999-X?a_aid=6a01e859cbe1a', 'data-pb-eu-p': '€301', 'data-pb-us-p': '$299', 'data-pb-uk-p': '£237' };
  const primary = {
    getAttribute: k => (k in attrs ? attrs[k] : null),
    setAttribute: (k, v) => { attrs[k] = v; },
    querySelector: sel => (sel === '.shop-price' ? cell : null),
    innerHTML: 'Buy at PLUGINBOUTIQUE - ' + (lang === 'es' ? 'Aprox.' : 'Approx.') + ' €301',
  };
  const card = { querySelector: sel => (sel === '.shop-btn-primary' ? primary : null) };
  const doc = { documentElement: { lang }, querySelectorAll: () => [card] };
  new Function('document', helpers + '\nreturn doSwap;')(doc)(zone);
  return { price: cell.getAttribute('data-price'), html: cell.outerHTML, attrs };
}
const eu = runSwap('musicstore', 'en');
ok(eu.price === '€301', 'EU zone (musicstore) shows the EUR amount (' + eu.price + ')');
const uk = runSwap('gear4music', 'en');
ok(uk.price === '£237', 'UK zone (gear4music) shows the GBP amount (' + uk.price + ')');
const us = runSwap('zzounds', 'en');
ok(us.price === '$299', 'US zone (zzounds) shows the USD amount (' + us.price + ')');
const row = runSwap('amazon', 'en');
ok(row.price === '$299', 'rest of world (amazon) shows the USD amount (' + row.price + ')');
const none = runSwap('none', 'en');
ok(none.price === '$299', 'zone "none" falls back to USD (' + none.price + ')');
[eu, uk, us, row, none].forEach((r, i) => {
  ok(r.attrs['data-store'] === 'pluginboutique', 'swap #' + i + ' never changes the store');
  ok(r.attrs.href === eu.attrs.href, 'swap #' + i + ' never changes the URL');
  ok(r.html.includes(WHITE) && !r.html.includes(GRAY), 'swap #' + i + ' keeps the white primary label');
});
const es = runSwap('gear4music', 'es');
ok(es.html.includes('Aprox.'), 'ES swap uses the Aprox. label');
// missing attribute must not break anything
const noAttrs = (() => {
  const cell = new PriceCell('');
  const primary = { getAttribute: () => null, setAttribute: () => {}, querySelector: () => cell, innerHTML: 'x' };
  const doc = { documentElement: { lang: 'en' }, querySelectorAll: () => [{ querySelector: () => primary }] };
  new Function('document', helpers + '\nreturn doSwap;')(doc)('zzounds');
  return cell.getAttribute('data-price');
})();
ok(noAttrs === null, 'PB primary without data-pb-* is left untouched');

// 5) The build's inline script carries the same branch
const inline = buildGuide.slice(buildGuide.indexOf('function doSwap(T){'));
ok(/if\(curStore==='pluginboutique'\)\{/.test(inline) && /data-pb-'\+pbReg\+'-p/.test(inline), 'inline guide doSwap has the PB currency branch');
ok(!/if\(curStore==='pluginboutique'\)return;/.test(inline), 'the old PB early-return is gone');
ok(/if \(curStore === 'pluginboutique'\)/.test(read('temp/gen-shop-buttons.js')), 'gen-shop-buttons.js has the PB currency branch');
ok(/data-pb-'\s*\+\s*pbReg\s*\+\s*'-p/.test(read('temp/gen-shop-buttons.js')), 'SPA source reads data-pb-<region>-p');

console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
process.exit(fail ? 1 : 0);
