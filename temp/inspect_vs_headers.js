const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
// guias vs (comparison sin headers): de donde salen sus titulos
const vs = guides.filter(g => g.comparison && !Array.isArray(g.comparison.headers) && Array.isArray(g.comparison.rows));
console.log('guias con comparison de 2+ columnas (formato vs): ' + vs.length + '\n');
vs.forEach(g => {
  const fsx = g.featuredSnippet || {};
  const h1 = fsx.name1_en || '(sin name1_en)';
  const h2 = fsx.name2_en || '(sin name2_en)';
  const vp = (g.verdictProsCons||[]).map(v=>v.name);
  const av = vp.length === 2;
  const mal = !av || vp[0] !== h1 || vp[1] !== h2;
  console.log((mal ? '!! ' : '   ') + g.id);
  console.log('      tabla EN: ' + h1 + '  |  ' + h2);
  console.log('      tabla ES: ' + (fsx.name1_es||'-') + '  |  ' + (fsx.name2_es||'-'));
  console.log('      veredictos: ' + vp.join('  |  '));
});
console.log('\n\n=== cuantas discrepan ===');
let mal = 0;
vs.forEach(g => {
  const fsx = g.featuredSnippet || {};
  const vp = (g.verdictProsCons||[]).map(v=>v.name);
  if (vp.length !== 2 || vp[0] !== fsx.name1_en || vp[1] !== fsx.name2_en) mal++;
});
console.log('  guias vs cuyo titulo de tabla NO coincide con el veredicto: ' + mal + ' de ' + vs.length);