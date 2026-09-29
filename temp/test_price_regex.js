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
  ok(/function tmgPriceHtml\(plain\)/.test(src), name + ': tmgPriceHtml helper');
  ok(/function tmgIsEsDoc\(\)/.test(src), name + ': tmgIsEsDoc helper');
  ok(/\.shop-price/.test(src), name + ': reads .shop-price elements');
  ok(/getAttribute\('data-price'\)/.test(src), name + ': reads data-price attribute');
  ok(/function fmtPricePlain\(/.test(src), name + ': fmtPricePlain present');
}

// 3. Generated pages: every price cell is a .shop-price element with a plain amount.
const guide = fs.readFileSync('guides/best-microphone.html', 'utf8');
const guideEs = fs.readFileSync('guides/best-microphone_es.html', 'utf8');
const cells = guide.match(/<span class='shop-price' data-price='[^']*'>/g) || [];
ok(cells.length > 0, 'best-microphone.html: ' + cells.length + ' .shop-price cells');
const amounts = [...guide.matchAll(/<span class='shop-price' data-price='([^']*)'>/g)].map(m => m[1]);
ok(amounts.every(a => /^[$£€]\d{1,3}(,\d{3})*$/.test(a)), 'all EN amounts are plain, no decimals, comma thousands');
ok((guide.match(/<span style='font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic'>Approx\.<\/span>/g) || []).length === cells.length, 'EN label count matches cell count');
const amountsEs = [...guideEs.matchAll(/<span class='shop-price' data-price='([^']*)'>/g)].map(m => m[1]);
ok(amountsEs.length > 0 && amountsEs.every(a => /^[$£€]\d{1,3}(,\d{3})*$/.test(a)), 'all ES amounts are plain (' + amountsEs.length + ')');
ok((guideEs.match(/<span style='font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic'>Aprox\.<\/span>/g) || []).length === amountsEs.length, 'ES label count matches cell count');

// 4. Price span markup must not be duplicated by the "-" separator splitting the flex item.
ok(!/'- '<span style="font-weight:700/.test(guide), 'row price stays inside one wrapper span');

// 5. Amazon/Reverb "Check price" label must NOT have the .shop-price wrapper.
ok((guide.match(/data-price='(Check price|Verificar precio)'/g) || []).length === 0, 'no Check price wrapped as shop-price');

console.log('\nsample EN amounts: ' + amounts.slice(0, 8).join(' | '));
console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
