const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const g = guides.find(x => x.id === 'pro-plugins');

console.log('### pro-plugins — ' + g.title);
console.log('ES: ' + g.title_es);
console.log('\nfeaturedProducts: ' + JSON.stringify(g.featuredProducts));
console.log('\nSECCIONES (' + g.sections.length + '):');
g.sections.forEach((s,i) => {
  console.log('  ' + i + '. ' + (s.heading||s.h) + '   products=' + JSON.stringify(s.products||[]));
});
console.log('\nverdictProsCons (' + (g.verdictProsCons||[]).length + '):');
(g.verdictProsCons||[]).forEach(v => console.log('  * ' + (v.name||v.title) + '  [' + (v.pros?v.pros.length:0)+'/'+(v.cons?v.cons.length:0)+']'));
console.log('\nproductTable: ' + (g.productTable ? g.productTable.columns.map(c=>c.title).join(' | ') : 'NO'));
console.log('comparison: ' + (g.comparison ? 'si (' + (g.comparison.headers||[]).join(' | ') + ')' : 'no'));
console.log('\nverdict:\n  ' + String(g.verdict).replace(/<[^>]+>/g,' ').slice(0,500));
console.log('\nconclusion:\n  ' + String(g.conclusion).replace(/<[^>]+>/g,' ').slice(0,700));
console.log('\nintro:\n  ' + String(g.intro).replace(/<[^>]+>/g,' ').slice(0,400));

// dondeElse se mencionan los productos sobrantes
const SOBRANTES = ['UA 1176 Classic Limiter Collection','TDR Kotelnikov GE','iZotope RX 12 Advanced','FabFilter Pro-Q 4','FabFilter Pro-C 3'];
const IDS = new Map(arr.map(p=>[p.title,p.id]));
console.log('\n\n=== donde aparecen los sobrantes ===');
SOBRANTES.forEach(n => {
  const id = IDS.get(n);
  const usos = [];
  if ((g.featuredProducts||[]).indexOf(id) > -1) usos.push('featuredProducts');
  g.sections.forEach((s,i) => { if ((s.products||[]).indexOf(id) > -1) usos.push('seccion ' + i + ' "' + (s.heading||s.h).slice(0,50) + '"'); });
  (g.verdictProsCons||[]).forEach((v,i) => { if ((v.name||v.title) === n) usos.push('veredicto ' + i); });
  const txt = JSON.stringify({i:g.intro, ie:g.intro_es, v:g.verdict, ve:g.verdict_es, c:g.conclusion, ce:g.conclusion_es, fs:g.featuredSnippet, d:g.description, de:g.description_es});
  const enTexto = (txt.match(new RegExp(n.split(' ')[0],'g'))||[]).length;
  console.log('  ' + n + ' (id ' + id + '): ' + usos.join(' | '));
  console.log('        menciones de la marca en el texto de la guia: ' + enTexto);
});
// los productos que deben QUEDARSE
console.log('\n=== los 2 que deben quedarse ===');
['FabFilter Total Bundle','Native Instruments Komplete 26 Ultimate'].forEach(n => {
  const id = IDS.get(n);
  const usos = [];
  if ((g.featuredProducts||[]).indexOf(id) > -1) usos.push('featuredProducts');
  g.sections.forEach((s,i) => { if ((s.products||[]).indexOf(id) > -1) usos.push('seccion ' + i); });
  (g.verdictProsCons||[]).forEach((v,i) => { if ((v.name||v.title) === n) usos.push('veredicto ' + i); });
  console.log('  ' + n + ' (id ' + id + '): ' + usos.join(' | '));
});