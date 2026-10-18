const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('<div class="guide-product-card-img"><img src="${(p.img||');
const endPos = s.indexOf('</div>', pos);
const current = s.slice(pos, endPos + 6);

console.log('Current template:');
console.log(current);
console.log('---');
console.log('Contains ${scoreBadge(p)}:', current.includes('${scoreBadge(p)}'));
console.log('Contains </svg></button></div>:', current.includes('</svg></button></div>'));
console.log('Contains </button>${scoreBadge(p)}:</div>:', current.includes('</button>${scoreBadge(p)}</div>'));