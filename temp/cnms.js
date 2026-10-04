const fs = require('fs');
// 1. catalog stores
const PF = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = require(PF);
const p = P.find(x => x.id === 553);
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Fender-CN-60S-Natural-/art-GIT0049159-000';
p.stores.andertons = 'https://www.andertons.co.uk/fender-classic-design-cn60s-nylon-strung-classical-guitar-in-natural-w-walnut-fingerboard/?search_query=Fender%20CN-60S';
fs.writeFileSync(PF, JSON.stringify(P, null, 2));
// 2. BTN prices + urls
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  553: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  553: {
    prices: {
      gear4music: "£189.00",
      andertons: "£189.00",
      musicstore: "€215.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B07K2JLS56",
      andertons: "https://www.andertons.co.uk/fender-classic-design-cn60s-nylon-strung-classical-guitar-in-natural-w-walnut-fingerboard/?search_query=Fender%20CN-60S",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Fender-CN-60S-Natural-/art-GIT0049159-000"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
console.log('CN-60S MS+Andertons done');