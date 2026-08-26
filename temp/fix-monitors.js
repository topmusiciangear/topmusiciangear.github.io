var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var h = g.find(function(x){ return x.id === 'best-monitors-for-small-rooms'; });

// Fix 1: iLoud Pro woofer in table — 3" → 3.5"
h.productTable.rows.forEach(function(r) {
  if (r.label === 'Woofer') {
    r.values[5].value = '3.5"';
    r.values[5].value_es = '3.5"';
  }
});

// Fix 2: Remove A7V from conclusion EN
h.conclusion = h.conclusion.replace(/\s*The Adam A7V's ribbon tweeter reveals every transient\.?\s*/i, ' ');
h.conclusion_es = h.conclusion_es.replace(/\s*El tweeter de cinta del Adam A7V revela cada transitorio\.?\s*/i, ' ');

// Clean up double spaces
h.conclusion = h.conclusion.replace(/\s{2,}/g, ' ').trim();
h.conclusion_es = h.conclusion_es.replace(/\s{2,}/g, ' ').trim();

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixed iLoud Pro woofer to 3.5" and removed A7V from conclusion');
