const fs = require('fs');
const s = fs.readFileSync('./js/shop-buttons.js', 'utf8');
console.log('479 prices:', s.includes(' 479: {prices:{zzounds:"$2,999.00"'));
console.log('480 prices:', s.includes(' 480: {prices:{andertons:"£2,599.00"'));
console.log('481 empty:', s.includes(' 481: {},'));
// confirm subwoofer entries
['468:', '470:', '471:', '337:', '338:', '469:'].forEach((k) => {
  const re = new RegExp('\\s+' + k);
  console.log('shop-buttons has ' + k, re.test(s));
});
