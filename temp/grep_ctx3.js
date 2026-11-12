// grep_ctx3.js — tercera tanda (guides.json) + products.json completo
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const pr = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8');

['vintage set hums', 'learn its engine', 'ruidoso o el inteligente', 'bolsillo', 'Power Tap', 'compresi\\u00f3n sidechain y', 'buy one guitar', 'do the most work'].forEach(n => {
  let i = -1, c = 0;
  while ((i = raw.indexOf(n, i + 1)) >= 0) {
    c++;
    if (c <= 2) {
      console.log('=== [' + n + '] @' + i + ' ===');
      console.log(raw.slice(Math.max(0, i - 300), i + n.length + 300).replace(/\\n/g, ' '));
      console.log('');
    }
  }
  if (c === 0) console.log('=== [' + n + '] SIN OCURRENCIAS ===\n');
});

console.log('\n================== PRODUCTS.JSON ==================\n');
const PATS = [/workhorse/i, /todoterreno/i, /\b(beast|bestia)\b/i, /\b(grail|grial|santo grial)\b/i,
  /secret weapon|arma secreta/i, /swiss army|navaja suiza/i, /built like a tank|como un tanque/i,
  /game.?changer/i, /heavy (hitter|lifting)|trabajo pesado/i];
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
g.forEach(p => {
  ['desc', 'desc_es', 'featuredText', 'featuredText_es', 'title_es'].forEach(k => {
    if (typeof p[k] === 'string') {
      PATS.forEach(pt => {
        if (pt[0].test(p[k])) {
          console.log('--- id=' + p.id + ' ' + p.title + ' .' + k + ' [' + pt[0] + ']');
          console.log(p[k]);
          console.log('');
        }
      });
    }
  });
});
