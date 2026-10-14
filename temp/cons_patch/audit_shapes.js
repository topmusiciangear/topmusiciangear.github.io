var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var o=[];
o.push('GUIDES='+A.length);
// products shape
var pkeys=Object.keys(P);
o.push('PRODUCTS type='+(Array.isArray(P)?'array':'object')+' n='+pkeys.length);
var sample = Array.isArray(P)?P[0]:P[pkeys[0]];
o.push('PROD_KEYS='+Object.keys(sample).join(','));
o.push('PROD_SAMPLE='+JSON.stringify(sample).slice(0,400));
// guide shapes: productTable / verdictProsCons / featuredProducts
var g0=A[0];
o.push('GUIDE0_KEYS='+Object.keys(g0).join(','));
o.push('TABLE_KEYS='+(g0.productTable?Object.keys(g0.productTable).join(','):'(none)'));
if(g0.productTable&&g0.productTable.columns) o.push('COL0_KEYS='+Object.keys(g0.productTable.columns[0]).join(','));
o.push('VPC_TYPE='+(Array.isArray(g0.verdictProsCons)?'array('+g0.verdictProsCons.length+')':typeof g0.verdictProsCons));
if(Array.isArray(g0.verdictProsCons)&&g0.verdictProsCons.length) o.push('VPC0='+JSON.stringify(g0.verdictProsCons[0]).slice(0,500));
o.push('FEAT0='+JSON.stringify(g0.featuredProducts));
// count guides with/without these
var c={table:0,vpc:0,feat:0,comp:0,faq:0,fsn:0};
A.forEach(function(g){
  if(g.productTable&&g.productTable.columns&&g.productTable.columns.length) c.table++;
  if(Array.isArray(g.verdictProsCons)&&g.verdictProsCons.length) c.vpc++;
  if(g.featuredProducts&&g.featuredProducts.length) c.feat++;
  if(g.comparison&&g.comparison.rows&&g.comparison.rows.length) c.comp++;
  if(Array.isArray(g.faq)&&g.faq.length) c.faq++;
  if(g.featuredSnippet) c.fsn++;
});
o.push('COVERAGE='+JSON.stringify(c));
fs.writeFileSync('temp/cons_patch/audit_shapes.txt', o.join('\n'),'utf8');
console.log('ok');
