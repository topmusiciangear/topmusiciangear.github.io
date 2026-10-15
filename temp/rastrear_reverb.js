const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(B + 'data/products.json', 'utf8');

['atc-scm25a-mk2', 'genelec-8351b-pair-white', '87230252', '81615907'].forEach(k => {
  const i = raw.indexOf(k);
  console.log(k + ': ' + (i > -1 ? 'SI en products.json' : 'NO en products.json'));
  if (i > -1) {
    const ini = Math.max(0, raw.lastIndexOf('"id"', i - 2000));
    const m = raw.slice(ini, i).match(/"id"\s*:\s*(\d+)[\s\S]{0,400}"title"\s*:\s*"([^"]+)"/);
    console.log('   -> ' + (m ? 'id ' + m[1] + ' ' + m[2] : '?'));
  }
});

// ¿y en TEST_SHOP_BTN?
const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
['atc-scm25a-mk2', 'genelec-8351b-pair-white'].forEach(k => {
  console.log(k + ': ' + (src.includes(k) ? 'SI en build-guides.js' : 'NO en build-guides.js'));
});
