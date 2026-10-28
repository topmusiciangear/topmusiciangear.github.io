const fs = require('fs');
const s = fs.readFileSync('guides/ai-tools-plugins.html', 'utf8');
const all = [...s.matchAll(/data-store="([a-z0-9]+)"/g)].map(m => m[1]);
const tally = {};
all.forEach(k => tally[k] = (tally[k] || 0) + 1);
console.log('all data-store in page:', JSON.stringify(tally));

// find the first dropdown and print 2500 chars
const i = s.indexOf('<div class="shop-more-list"');
console.log('\n---- dropdown block ----');
const block = s.slice(i, i + 2600);
console.log(block.replace(/></g, '>\n<'));
