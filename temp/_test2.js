const fs = require('fs');
const m = fs.readFileSync('js/app.min.js', 'utf8');
console.log('min old scorer _q=_n(e) still present:', m.indexOf('_q=_n(e)') >= 0);
console.log('min new scorer qw=_w(_n(e)) present:', m.indexOf('qw=_w(_n(e))') >= 0);
console.log('min qWords length condition present:', m.indexOf('qw.length<=4?qw.length:qw.length-1') >= 0);

const html = (() => {
  const vm = require('vm');
  const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
  const sandbox = { window: {}, document: { documentElement: { lang: 'en' }, querySelectorAll: () => [] }, navigator: {}, localStorage: { getItem: () => null, setItem: () => {} }, Intl, console };
  sandbox.window = sandbox;
  vm.runInNewContext(sb, sandbox);
  const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
  return sandbox.shopButtonsTest(prods.find(x => x.id === 20), false);
})();
const count = c => html.split(c).length - 1;
console.log('html has colored globe gradient 67c6f8:', count('67c6f8'));
console.log('html has uk flag navy 012169:', count('012169'));
console.log('html has B&W globe line x1="6.5":', count('<line x1="6.5"'));
// row order by data-store
console.log('rows:', (html.match(/data-store="[^"]+"/g) || []).join(','));