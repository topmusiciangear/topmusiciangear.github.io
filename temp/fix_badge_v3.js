const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('<div class="guide-product-card-img"><img src="${(p.img||');
const endPos = s.indexOf('</div>', pos);
const current = s.slice(pos, endPos + 6);

// The bug: ${scoreBadge(p)} is INSIDE the SVG (before </svg>)
// Fix: move it after </button>
const fixed = current.replace('${scoreBadge(p)}</svg></button></div>', '</svg></button>${scoreBadge(p)}</div>');

if (fixed !== current) {
  s = s.slice(0, pos) + fixed + s.slice(endPos + 6);
  fs.writeFileSync(f, s, 'utf8');
  console.log('FIXED: badge moved after button');
} else {
  console.log('Pattern not found');
}

fs.writeFileSync(f, s, 'utf8');