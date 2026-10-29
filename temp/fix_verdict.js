const fs=require('fs');
const path='data/guides.json';
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const g=data.find(x=>x.id==='best-monitors');
if(g){
  // Remove LP-UNF mentions
  const removePattern = /<p><strong><span class="product-name">Kali Audio LP-UNF<\/span><\/strong> —[^<]*<[^>]*>.*?<\/p>\s*/g;
  // Simpler: remove any paragraph containing Kali Audio LP-UNF
  g.verdict = g.verdict.replace(/<p><strong><span class="product-name">Kali Audio LP-UNF<\/span><\/strong>[^<]*<\/p>\s*<p>/g, '<p>');
  // Also remove standalone paragraph
  g.verdict = g.verdict.replace(/<p><strong><span class="product-name">Kali Audio LP-UNF<\/span><\/strong> —[^<]*<\/p>\s*/g, '');
  // Remove from verdict_es
  if(g.verdict_es){
    g.verdict_es = g.verdict_es.replace(/<p><strong><span class="product-name">Kali Audio LP-UNF<\/span><\/strong>[^<]*<\/p>\s*<p>/g, '<p>');
    g.verdict_es = g.verdict_es.replace(/<p><strong><span class="product-name">Kali Audio LP-UNF<\/span><\/strong> —[^<]*<\/p>\s*/g, '');
  }
  // Remove from conclusion if present
  if(g.conclusion && g.conclusion.includes('LP-UNF')){
    g.conclusion = g.conclusion.replace(/Focal Shape 65<\/span><\/strong> —[^<]*<\/p>\s*<p><strong><span class="product-name">Kali Audio LP-UNF<\/span>/g,'');
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('fixed');
}
