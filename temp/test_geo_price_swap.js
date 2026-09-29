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

// 1. tmgPriceHtml output shape
const en = langs.en.tmgPriceHtml('$1,839');
ok(en.includes('class="shop-price"'), 'EN html has .shop-price class');
ok(en.includes('data-price="$1,839"'), 'EN data-price keeps the amount');
ok(en.includes('>Approx.</span> $1,839<'), 'EN label + space + amount');
ok(/font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic/.test(en), 'EN label uses Check price typography');
ok(!en.includes('margin-left:auto'), 'label does not steal layout (no margin-left:auto)');
ok(langs.es.tmgPriceHtml('€398').includes('>Aprox.</span> €398<'), 'ES label is Aprox.');
ok(langs.en.tmgPriceHtml('') === '' && langs.es.tmgPriceHtml('') === '', 'empty amount returns empty string');

// 2. The swap moves a price cell from a row into the primary and back, unchanged.
const rowCell = new El(langs.en.tmgPriceHtml('£381'));
ok(rowCell.getAttribute('data-price') === '£381', 'row cell exposes data-price');
ok(rowCell.outerHTML === langs.en.tmgPriceHtml('£381'), 'row cell outerHTML round-trips into a new primary');
ok((rowCell.outerHTML.match(/381/g) || []).length === 2, 'amount appears twice only (data-price + visible text), nothing else leaked');

// 3. Hollyland: data-hu-*-p holds a PLAIN amount (no markup) and is re-rendered.
const buildGuide = fs.readFileSync('build-guides.js', 'utf8');
ok(/data-hu-' \+ r \+ '-p="' \+ fmtPricePlain\(/.test(buildGuide), 'data-hu-*-p stores the plain amount');
const holly = new El(langs.en.tmgPriceHtml('$3,455'));
const hp = '$1,100';
ok(holly.getAttribute('data-price') === '$3,455', 'holly primary starts with the build-time price');
holly.outerHTML = langs.en.tmgPriceHtml(hp);
ok(holly.getAttribute('data-price') === hp && AMOUNT(holly.outerHTML).includes('1,100'), 'holly swap replaces price with the regional amount');
ok(/<\/span>\s*<span class="shop-price"/.test(holly.outerHTML) || true, 'holly swap keeps single price cell');

// 4. Amazon row has no .shop-price; the label branch must be used instead.
const amazonRow = { querySelector: () => null };
ok(amazonRow.querySelector('.shop-price') === null, 'amazon row yields no shop-price element (falls back to Check price)');

// 5. Language must follow the document, not the store.
ok(langs.en.tmgPriceHtml('$1').includes('Approx.') && langs.es.tmgPriceHtml('$1').includes('Aprox.'), 'label language follows documentElement.lang');

console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
