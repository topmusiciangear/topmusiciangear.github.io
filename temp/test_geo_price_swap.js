// Functional test of the geo-swap price logic using a minimal DOM shim.
// Extracts the real tmgIsEsDoc/tmgPriceHtml helpers from js/shop-buttons.js
// and exercises the price moves without a browser.
const fs = require('fs');

let fail = 0;
const ok = (cond, msg) => { if (!cond) fail++; console.log((cond ? 'ok   ' : 'FAIL ') + msg); };

// --- minimal element shim (only what the swap logic touches) ---
function El(html) {
  let attrs = {};
  const parse = (h) => {
    const m = h.match(/^<span class="shop-price" data-price="([^"]*)"/);
    attrs = m ? { 'data-price': m[1] } : {};
  };
  parse(html);
  this.getAttribute = (k) => (k in attrs ? attrs[k] : null);
  this.setAttribute = (k, v) => { attrs[k] = v; };
  this.querySelector = (sel) => (sel === '.shop-price' ? this : null);
  this.innerHTML = html;
  // setter re-parses, like a real DOM node whose markup was replaced
  let _html = html;
  Object.defineProperty(this, 'outerHTML', {
    get: () => _html,
    set: (h) => { _html = h; parse(h); }
  });
}

const langs = {};
for (const lang of ['en', 'es']) {
  const src = fs.readFileSync('js/shop-buttons.js', 'utf8');
  const doc = { documentElement: { lang } };
  // balanced-brace extraction
  const grab = (name) => {
    const s = src.indexOf('function ' + name + '(');
    if (s === -1) throw new Error('not found: ' + name);
    let i = src.indexOf('{', s), depth = 0, started = false;
    for (; i < src.length; i++) {
      if (src[i] === '{') { depth++; started = true; }
      else if (src[i] === '}') { depth--; if (started && depth === 0) return src.substring(s, i + 1); }
    }
    throw new Error('unbalanced: ' + name);
  };
  const fn = new Function('document', grab('tmgIsEsDoc') + '\n' + grab('tmgPriceHtml') + '\nreturn {tmgIsEsDoc:tmgIsEsDoc,tmgPriceHtml:tmgPriceHtml};')(doc);
  langs[lang] = fn;
}

const AMOUNT = (a) => a.replace(/[^0-9.,]/g, '');
const GRAY = 'color:#a8a8a8';
const WHITE = 'color:#ffffff';

// 1. tmgPriceHtml output shape
const en = langs.en.tmgPriceHtml('$1,839');
ok(en.includes('class="shop-price"'), 'EN html has .shop-price class');
ok(en.includes('data-price="$1,839"'), 'EN data-price keeps the amount');
ok(en.includes('>Approx.</span> $1,839<'), 'EN label + space + amount');
ok(/font-size:12px;font-weight:600/.test(en) && /font-style:italic/.test(en), 'EN label uses Check price typography');
ok(en.includes(WHITE) || en.includes(GRAY), 'EN label has an explicit color');
ok(!en.includes('margin-left:auto'), 'label does not steal layout (no margin-left:auto)');
ok(langs.es.tmgPriceHtml('€398').includes('>Aprox.</span> €398<'), 'ES label is Aprox.');
ok(langs.en.tmgPriceHtml('') === '' && langs.es.tmgPriceHtml('') === '', 'empty amount returns empty string');

// 1b. Color depends on the surface: white on the blue primary, gray on rows.
ok(langs.en.tmgPriceHtml('$439', true).includes(WHITE), 'primary=true -> white label (blue button)');
ok(!langs.en.tmgPriceHtml('$439', true).includes(GRAY), 'primary=true is NOT gray');
ok(langs.en.tmgPriceHtml('$439').includes(GRAY), 'primary omitted/false -> gray label (dark row)');
ok(!langs.en.tmgPriceHtml('$439').includes(WHITE), 'row label is NOT white');
ok(langs.es.tmgPriceHtml('$439', true).includes(WHITE), 'ES primary also white');
ok(/font-size:12px;font-weight:600;color:#ffffff;font-style:italic/.test(langs.en.tmgPriceHtml('$439', true)), 'primary keeps the rest of the Check price style');

// 2. The swap moves a price cell from a row into the primary and back, changing
//    the label color to suit the new surface.
const rowCell = new El(langs.en.tmgPriceHtml('£381'));
ok(rowCell.getAttribute('data-price') === '£381', 'row cell exposes data-price');
const asPrimary = langs.en.tmgPriceHtml(rowCell.getAttribute('data-price'), true);
ok(asPrimary.includes(WHITE) && !asPrimary.includes(GRAY), 'row -> primary: amount re-rendered with white label');
ok((asPrimary.match(/381/g) || []).length === 2, 'row -> primary: amount appears twice only (data-price + text)');
const backToRow = langs.en.tmgPriceHtml(rowCell.getAttribute('data-price'));
ok(backToRow.includes(GRAY) && !backToRow.includes(WHITE), 'primary -> row: amount re-rendered with gray label');
ok((backToRow.match(/381/g) || []).length === 2, 'primary -> row: amount appears twice only');

// 3. Hollyland: data-hu-*-p holds a PLAIN amount (no markup) and is re-rendered
//    with a WHITE label because the Hollyland primary is the blue button.
const buildGuide = fs.readFileSync('build-guides.js', 'utf8');
ok(/data-hu-' \+ r \+ '-p="' \+ fmtPricePlain\(/.test(buildGuide), 'data-hu-*-p stores the plain amount');
const pPriceLine = (src) => (src.split('\n').find(l => l.includes('const pPrice =')) || '').trim();
ok(/fmtPrice\(isHolly/.test(pPriceLine(buildGuide)) && pPriceLine(buildGuide).endsWith(", lang, true);"), 'build renders the primary (incl. Hollyland) with the white-label variant');
ok(/fmtPrice\(isHolly/.test(pPriceLine(fs.readFileSync('js/shop-buttons.js', 'utf8'))) && pPriceLine(fs.readFileSync('js/shop-buttons.js', 'utf8')).endsWith(", lang, true);"), 'SPA renders the primary (incl. Hollyland) with the white-label variant');
// Row prices must keep the 2-arg (gray) form
const rowCalls = (src) => (src.split('\n').filter(l => l.includes('fmtPrice(prices[') || l.includes('fmtPrice(cfg.prices[')));
for (const [name, src] of [['build-guides.js', buildGuide], ['js/shop-buttons.js', fs.readFileSync('js/shop-buttons.js', 'utf8')]]) {
  const rows = rowCalls(src);
  ok(rows.length >= 2 && rows.every(l => !l.includes(', true)')), name + ': both row price calls keep the gray variant (' + rows.length + ' calls)');
}
const holly = new El(langs.en.tmgPriceHtml('$3,455', true));
const hp = '$1,100';
ok(holly.getAttribute('data-price') === '$3,455', 'holly primary starts with the build-time price');
ok(holly.outerHTML.includes(WHITE), 'holly primary label starts white');
holly.outerHTML = langs.en.tmgPriceHtml(hp, true);
ok(holly.getAttribute('data-price') === hp && AMOUNT(holly.outerHTML).includes('1,100'), 'holly swap replaces price with the regional amount');
ok(holly.outerHTML.includes(WHITE) && !holly.outerHTML.includes(GRAY), 'holly swap keeps the white label (still the blue primary)');

// 4. Amazon row has no .shop-price; the label branch must be used instead.
const amazonRow = { querySelector: () => null };
ok(amazonRow.querySelector('.shop-price') === null, 'amazon row yields no shop-price element (falls back to Check price)');

// 5. Language must follow the document, not the store.
ok(langs.en.tmgPriceHtml('$1').includes('Approx.') && langs.es.tmgPriceHtml('$1').includes('Aprox.'), 'label language follows documentElement.lang');

console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
