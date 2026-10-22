const fs = require('fs');
const min = fs.readFileSync('css/style.min.css', 'utf8');
const m = min.match(/\.guide-product-card-img img\{[^}]*\}/);
console.log('style.min.css rule:', m && m[0]);

const page = fs.readFileSync('guides/at2020-vs-p120.html', 'utf8');
const inline = page.match(/\.guide-product-card-img img\{[^}]*\}/);
console.log('guide inline rule:', inline && inline[0]);
const allCardRules = [...page.matchAll(/[^{}]*guide-product-card-img img[^{}]*\{[^}]*\}/g)].map(x => x[0]);
console.log('all card-img rules in page:');
for (const r of allCardRules) console.log(' -', r.replace(/\s+/g, ' ').slice(0, 220));

const sec = page.indexOf('What Products Are in This Guide?');
const chunk = page.slice(sec, sec + 2500);
console.log('cards in section:', (chunk.match(/guide-product-card-img/g) || []).length);
console.log('card img inline object-fit:', /guide-product-card-img[^>]*>\s*<img[^>]*object-fit/.test(chunk));
