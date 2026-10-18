const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// Read the exact current template from the file
const pos = s.indexOf('<div class="guide-product-card-img"><img src="${(p.img||');
const endPos = s.indexOf('</div>', pos);
const current = s.slice(pos, endPos + 6);

console.log('Current template length:', current.length);
console.log('Current has scoreBadge inside button:', current.includes('${scoreBadge(p)}</button>'));

// The badge is currently INSIDE the button. Need to move it outside.
// Pattern: ...</svg>${scoreBadge(p)}</button></div>
// Should become: ...</svg></button>${scoreBadge(p)}</div>

const fixed = current.replace('${scoreBadge(p)}</button></div>', '</button>${scoreBadge(p)}</div>');

if (fixed !== current) {
  s = s.slice(0, pos) + fixed + s.slice(endPos + 6);
  fs.writeFileSync(f, s, 'utf8');
  console.log('FIXED: badge moved outside button');
} else {
  console.log('Pattern not found or already fixed');
}

fs.writeFileSync(f, s, 'utf8');