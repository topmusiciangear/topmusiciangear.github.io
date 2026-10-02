const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
t = t.replace('Twelve basses in three price tiers, verified spec by spec. Budget (under $500) for starting on a 5-string, mid-range ($500–$1,100) for working pros, premium (over $1,300) for studio flagships. Every low-B claim below was checked against manufacturer spec sheets — including the corrections nobody else makes.',
'Basses in 3 price tiers, verified spec by spec. Budget (under $500) for starting on a 5-string, mid-range ($500–$1,100) for working pros, premium (over $1,300) for studio flagships. Every low-B claim below was checked against manufacturer spec sheets — including the corrections nobody else makes.');
fs.writeFileSync('data/guides.json', t);
console.log('done');