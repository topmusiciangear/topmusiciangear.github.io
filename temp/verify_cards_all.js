const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const SUF = [' (cada uno)', ' (each)', ' (par)', ' (pair)', ' (a pair)', ' (2 auriculares)', ' (2 headsets)'];
const norm = t => { let s = (t || '').trim(); SUF.forEach(x => { if (s.endsWith(x)) s = s.slice(0, -x.length); }); return s.trim(); };
const index = {};
products.forEach(p => { index[norm(p.title)] = p; index[norm(p.title_es || '')] = p; });

function revisar(selector, nombre, campo) {
  const files = fs.readdirSync(B + 'guides').filter(selector);
  let cards = 0, mal = [];
  files.forEach(f => {
    const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
    const re = /guide-product-card-title">([^<]+)<\/h3>[\s\S]{0,900}?guide-product-card-desc">([^<]*)</g;
    let m;
    while ((m = re.exec(h)) !== null) {
      cards++;
      const desc = m[2].trim();
      const prod = index[norm(m[1])];
      if (!prod) { mal.push(f + ' | sin mapear: ' + m[1]); continue; }
      const esp = (prod[campo] || '').trim();
      if (!esp) { mal.push(f + ' | ' + prod.title + ' | ' + campo + ' vacio'); continue; }
      if (desc.slice(0, 50) !== esp.slice(0, 50)) mal.push(f + ' | ' + prod.title + '\n     card: ' + desc.slice(0, 55) + '\n     json: ' + esp.slice(0, 55));
    }
  });
  console.log('--- ' + nombre + ' ---');
  console.log('paginas: ' + files.length + ' | cards: ' + cards + ' | problemas: ' + mal.length);
  mal.slice(0, 8).forEach(x => console.log('   ' + x));
}
revisar(f => f.endsWith('_es.html'), 'ES (desc_es)', 'desc_es');
revisar(f => f.endsWith('.html') && !f.endsWith('_es.html'), 'EN (desc)', 'desc');

// El texto ES no debe contener palabras inglesas tipicas
const EN = /\b(the|and|with|for|from|that|this|your|you|are|is|was|were|will|can|into|than|then|which|while|where|when|what|their|them|they|have|has|had|been|being|its|our|out|not|but|all|any|one|two|three|very|best|new|full|single|every|both|each|other|such|only|also|just|make|made|using|used|uses|built|includes|powerful|versatile|complete|professional|world|industry|standard|legacy|definitive)\b/gi;
const hits = products.filter(p => { const m = (p.desc_es || '').match(EN); return m; });
console.log('\ndesc_es con palabras inglesas: ' + hits.length);
hits.forEach(p => console.log('   ' + p.id + ' ' + p.title + ' -> ' + [...new Set((p.desc_es.match(EN) || []).map(h => h.toLowerCase()))].join(', ')));