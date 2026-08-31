var fs = require('fs');
var m = fs.readFileSync('js/app.min.js', 'utf8');

// Find the old search handler
var idx = m.indexOf('products.reduce((a,t)=>{const o=t.title.toLowerCase(),i=(t.title_es||"").toLowerCase(),n=(t.brand||"").toLowerCase()');
if (idx === -1) {
  console.log('ERROR: old pattern not found');
  process.exit(1);
}

// Find the start of the reduce (go back to find 'const o=')
var start = m.lastIndexOf('const o=', idx);
// Find the end - after .map(e=>e.product)
var endIdx = m.indexOf('.map(e=>e.product)', idx);
if (endIdx === -1) {
  console.log('ERROR: end pattern not found');
  process.exit(1);
}
var end = endIdx + '.map(e=>e.product)'.length;

var oldBlock = m.substring(start, end);
console.log('Old block length:', oldBlock.length);
console.log('Old block:', oldBlock.substring(0, 150) + '...');

// New search logic (minified)
var newBlock = 'const o=(()=>{const _n=s=>s.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLowerCase(),_s=s=>s.replace(/(es|s)$/i,""),_w=s=>_n(s).split(/[\\s\\-\\/]+/).filter(Boolean),_q=_n(e),_qs=_s(_q);return products.reduce((a,t)=>{const tw=_w(t.title),te=_w(t.title_es||""),aw=[...new Set([...tw,...te])],b=_n(t.brand||"");let sc=0;for(const w of aw){if(w===_q||w===_qs){sc+=10;break}if(w.indexOf(_q)===0||w.indexOf(_qs)===0){sc+=5;break}}if(b.indexOf(_q)===0)sc+=1;return sc>0&&a.push({product:t,score:sc}),a},[]).sort((e,a)=>a.score-e.score).map(e=>e.product)})();';

m = m.substring(0, start) + newBlock + m.substring(end);
fs.writeFileSync('js/app.min.js', m);
console.log('SUCCESS: replaced search handler in app.min.js');
