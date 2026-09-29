// Validates the geo-swap price handling: prices are now moved as
// `.shop-price` elements (outerHTML / data-price) instead of being parsed
// out of innerHTML with a fragile regex.
// Run after: node build-guides.js && node temp/gen-shop-buttons.js
const fs = require('fs');

let fail = 0;
const ok = (cond, msg) => { if (!cond) fail++; console.log((cond ? 'ok   ' : 'FAIL ') + msg); };

const sources = {
  'build-guides.js': fs.readFileSync('build-guides.js', 'utf8'),
  'js/shop-buttons.js': fs.readFileSync('js/shop-buttons.js', 'utf8')
};

// 1. Old fragile regexes must be gone from both sources.
const old = [
  { re: /Approx\[\.\]\|Aprox\[\.\]/, name: 'escaped Approx[.] alternation' },
  { re: /font-weight:700;color:#fff\[\^>\]\*\)/, name: 'innerHTML style-capture regex' },
  { re: /dispMatch/, name: 'dispMatch variable' }
];
for (const [name, src] of Object.entries(sources)) {
  for (const o of old) ok(!o.re.test(src), name + ': no ' + o.name);
}

// 2. New helpers present in both sources.
for (const [name, src] of Object.entries(sources)) {
  ok(/function tmgIsEsDoc\(\)/.test(src), name + ': tmgIsEsDoc helper');
  ok(/\.shop-price/.test(src), name + ': reads .shop-price elements');
  ok(/getAttribute\('data-price'\)/.test(src), name + ': reads data-price attribute');
  ok(/function tmgPriceHtml\(plain,\s*primary\)/.test(src), name + ': tmgPriceHtml takes a primary flag');
  ok(/function fmtPrice\(raw, lang, primary\)/.test(src), name + ': fmtPrice takes a primary flag');
  ok(/fmtPricePlain/.test(src), name + ': fmtPricePlain present');
  ok(!/font-weight:700;color:#fff"\>Approx/.test(src), name + ': no hardcoded gray-less label');
}

// 3. Generated pages: every price cell is a .shop-price element with a plain amount.
const guide = fs.readFileSync('guides/best-microphone.html', 'utf8');
const guideEs = fs.readFileSync('guides/best-microphone_es.html', 'utf8');
const cells = guide.match(/<span class='shop-price' data-price='[^']*'>/g) || [];
ok(cells.length > 0, 'best-microphone.html: ' + cells.length + ' .shop-price cells');
const amounts = [...guide.matchAll(/<span class='shop-price' data-price='([^']*)'>/g)].map(m => m[1]);
ok(amounts.every(a => /^[$£€]\d{1,3}(,\d{3})*$/.test(a)), 'all EN amounts are plain, no decimals, comma thousands');
ok((guide.match(/<span style='font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic'>Approx\.<\/span>/g) || []).length > 0, 'EN rows use the gray label');
const amountsEs = [...guideEs.matchAll(/<span class='shop-price' data-price='([^']*)'>/g)].map(m => m[1]);
ok(amountsEs.length > 0 && amountsEs.every(a => /^[$£€]\d{1,3}(,\d{3})*$/.test(a)), 'all ES amounts are plain (' + amountsEs.length + ')');
ok((guideEs.match(/<span style='font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic'>Aprox\.<\/span>/g) || []).length > 0, 'ES rows use the gray label');

// 3b. White label on the blue primary: the build-time primary is Amazon here, so the
//     static white label shows on Hollyland cards. (At runtime the geo-swap also
//     renders white when it promotes a row price — see temp/test_geo_price_swap.js.)
const holly = fs.readFileSync('guides/wireless-lapel-mics.html', 'utf8');
const hollyEs = fs.readFileSync('guides/wireless-lapel-mics_es.html', 'utf8');
const whiteCount = (h) => (h.match(/<span style='font-size:12px;font-weight:600;color:#ffffff;font-style:italic'>(?:Approx|Aprox)\.<\/span>/g) || []).length;
ok(whiteCount(holly) > 0, 'Hollyland EN primaries use the white label (' + whiteCount(holly) + ')');
ok(whiteCount(hollyEs) > 0, 'Hollyland ES primaries use the white label (' + whiteCount(hollyEs) + ')');
ok(!/color:#a8a8a8;font-style:italic'>(?:Approx|Aprox)\./.test((holly.match(/class="shop-btn-primary"[\s\S]*?<\/a>/g) || []).join('')), 'no gray label inside a Hollyland primary');

// 4. Exactly one white label per primary button, and it sits inside the blue button.
const primaries = guide.match(/class="shop-btn-primary"[\s\S]*?<\/a>/g) || [];
ok(primaries.length > 0, 'guide has ' + primaries.length + ' primary buttons');
ok(primaries.every(p => !/color:#a8a8a8;font-style:italic'>(Approx|Aprox)\./.test(p)), 'no gray label inside a primary button');
ok(primaries.every(p => p.includes('background:#3b82f6')), 'primary buttons are the blue variant');

// 5. Amazon/Reverb "Check price" label must NOT have the .shop-price wrapper.
ok((guide.match(/data-price='(Check price|Verificar precio)'/g) || []).length === 0, 'no Check price wrapped as shop-price');

console.log('\nsample EN amounts: ' + amounts.slice(0, 8).join(' | '));
console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
