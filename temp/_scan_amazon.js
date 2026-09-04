const fs = require('fs');
const g = fs.readFileSync('guides/best-beginner-electric-guitar.html', 'utf8');
// collect amazon ASINs (dp/xxxx) used as data-store=amazon primary + cards
const re = /data-store="amazon"[^>]*href="[^"]*\/dp\/([A-Z0-9]{10})/g;
const prim = new Set();
let m;
while ((m = re.exec(g))) prim.add(m[1]);

const cardRe = /guide-product-card/;
console.log('Secondary amazon links (buy dropdown rows):');
const secRe = /([A-Z]{2}\d{8})|(B0[A-Z0-9]{8})/g; // rough
console.log('Primary button amazon ASINs:', [...prim].join(', '));

// Show per-section store rows for amazon
const sections = g.split(/\n((?:sec-\d)|(?=<h2))/);
console.log('---- count amazon data-store occurrences:', (g.match(/data-store="amazon"/g)||[]).length);