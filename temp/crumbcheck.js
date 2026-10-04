const fs = require('fs');
['guides/fender-bass-guide.html', 'guides/fender-bass-guide_es.html'].forEach(f => {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
  const i = h.indexOf('guide-breadcrumb');
  console.log(f, '=>', h.slice(i, i + 320).replace(/<[^>]*>/g, '|'));
});
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/fender-bass-guide_es.html', 'utf8');
const j = h.indexOf('"BreadcrumbList"');
console.log('JSONLD:', h.slice(j, j + 420));