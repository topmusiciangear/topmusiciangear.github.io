const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gd = g.find(x => x.id === 'best-digital-pianos');
console.log('--- section keys:', JSON.stringify(Object.keys(gd.sections[0])));
console.log('--- sec1:', JSON.stringify(gd.sections[0]).slice(0, 600));
console.log('--- sec5:', JSON.stringify(gd.sections[4]).slice(0, 600));
console.log('--- verdict full:', JSON.stringify(gd.verdictProsCons[0], null, 1).slice(0, 1200));
// reference guide verdict structure
const ref = g.find(x => x.id === 'best-compact-mixers');
console.log('--- ref verdict:', JSON.stringify(ref.verdictProsCons[Object.keys(ref.verdictProsCons)[0]], null, 1).slice(0, 800));
console.log('--- ref table cols:', JSON.stringify(ref.productTable.columns.slice(0,2)));
console.log('--- ref table rows0:', JSON.stringify(ref.productTable.rows[0]).slice(0,400));
console.log('--- guide table rows0:', JSON.stringify(gd.productTable.rows[0]).slice(0,400));
console.log('--- guide table row1:', JSON.stringify(gd.productTable.rows[1]).slice(0,500));
console.log('--- snippet keys:', Object.keys(gd.featuredSnippet).join(','));
console.log('--- top keys:', Object.keys(gd).join(','));
