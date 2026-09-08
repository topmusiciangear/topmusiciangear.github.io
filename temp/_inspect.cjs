var S = JSON.parse(require('fs').readFileSync('temp/_bassamps.json', 'utf8'));

function describe(v, indent) {
  var pad = '  '.repeat(indent);
  if (Array.isArray(v)) {
    console.log(pad + '[] len=' + v.length);
    if (v.length && typeof v[0] === 'object' && v[0] !== null) {
      console.log(pad + '  item keys: ' + Object.keys(v[0]).join(', '));
      if (Array.isArray(v[0].sections)) {
        console.log(pad + '  sections len=' + v[0].sections.length);
        console.log(pad + '  section keys: ' + Object.keys(v[0].sections[0]).join(', '));
      }
    }
  } else if (typeof v === 'object' && v !== null) {
    console.log(pad + '{ ' + Object.keys(v).join(', ') + ' }');
  } else {
    console.log(pad + '= ' + String(v).slice(0, 80));
  }
}
['intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'featuredSnippet', 'image', 'badge', 'category', 'datePublished', 'author', 'aboutName'].forEach(function (k) {
  console.log('### ' + k);
  describe(S[k], 0);
});
console.log('### relatedGuides');
describe(S.relatedGuides, 0);
console.log('### productTable');
describe(S.productTable, 0);
console.log('### verdictProsCons');
describe(S.verdictProsCons, 0);
console.log('### sections');
describe(S.sections, 0);