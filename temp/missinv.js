const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
// where is each non-catalog name referenced?
const refs = {};
function addRef(name, where) {
  refs[name] = refs[name] || [];
  refs[name].push(where);
}
G.forEach(g => {
  if (g.productTable) {
    g.productTable.columns.forEach((c, i) => {
      const t = c.title;
      const inCat = P.some(p => p.title === t);
      if (!inCat) addRef(t, g.id + ':tablecol' + i);
    });
  }
  (g.verdictProsCons || []).forEach(v => {
    const inCat = P.some(p => p.title === v.name);
    if (!inCat) addRef(v.name, g.id + ':verdict');
  });
  if (g.comparison && g.featuredSnippet) {
    [g.featuredSnippet.name1_en, g.featuredSnippet.name2_en].forEach(nm => {
      if (nm && !P.some(p => p.title === nm)) addRef(nm, g.id + ':vs');
    });
  }
});
const names = Object.keys(refs);
console.log('total nombres sin match exacto:', names.length);
names.forEach(n => console.log('"' + n + '" => ' + refs[n].join(', ')));