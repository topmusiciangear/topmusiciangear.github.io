const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// Read the exact string from the file
const pos = s.indexOf('guide-product-card-img"><img src="${(p.img||');
const endPos = s.indexOf('</div>', pos);
const oldStr = s.slice(pos, endPos + 6);

console.log('oldStr length:', oldStr.length);
console.log('oldStr ends with:</div>', oldStr.endsWith('</div>'));

// Replace
const newStr = oldStr.replace('</svg></button></div>', '${scoreBadge(p)}</svg></button></div>');

if (s.indexOf(oldStr) >= 0) {
  s = s.replace(oldStr, newStr);
  console.log('productCard updated with scoreBadge');
} else {
  console.log('ERROR: oldStr not found');
  process.exit(1);
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado');