const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = '<button type="button" id="guideSearchBtn" class="guide-search-btn" aria-label="${isEs ? \'Buscar\' : \'Search\'}"><i class="fa-solid fa-magnifying-glass"></i></button>';
const neu = '<button type="button" id="guideSearchBtn" class="guide-search-btn" aria-label="${isEs ? \'Buscar\' : \'Search\'}"><svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>';
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');