const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
// 1. table types per guide
let withPT = 0, withComp = 0, neither = [];
G.forEach(g => {
  if (g.productTable) withPT++;
  if (g.comparison) withComp++;
  if (!g.productTable && !g.comparison) neither.push(g.id);
});
console.log('guides:', G.length, 'productTable:', withPT, 'comparison:', withComp);
console.log('sin tabla:', neither.join(','));
// 2. productTable structure sample
const samp = G.find(g => g.productTable);
console.log('=== PT keys:', Object.keys(samp.productTable).join(','));
console.log(JSON.stringify(samp.productTable).slice(0, 1200));