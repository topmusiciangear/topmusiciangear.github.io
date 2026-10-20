const g = require('../data/guides.json');
let hits = 0;
for (const q of g) {
  for (const [k, txt] of [['verdict_es', q.verdict_es || ''], ['verdict', q.verdict || '']]) {
    const re = /<span class="product-name">([^<]+)<\/span>(.{0,70})/g;
    let m;
    while ((m = re.exec(txt))) {
      const name = m[1];
      const after = m[2].toLowerCase();
      if (after.includes(name.toLowerCase().slice(0, 12))) {
        console.log(q.id, k, '|', name, '|', m[2].replace(/\s+/g, ' ').slice(0, 80));
        hits++;
      }
    }
  }
}
console.log('hits', hits);
