const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'beginner-bass-guitars');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
['featuredSnippet', 'og:image', 'name1_en'].forEach(k => {
  let i = src.indexOf(k), n = 0;
  console.log('===== ' + k + ' =====');
  while (i > -1 && n < 4) { console.log('@' + i + ': ' + src.slice(Math.max(0, i - 160), i + 200).replace(/\n/g, '|')); i = src.indexOf(k, i + 4); n++; }
  console.log('');
});
console.log('--- snippet guide fields ---');
const f = g.featuredSnippet;
['title_en','text_en','name1_en','name2_en','brand1','brand2','price1','price2','rating1','rating2','type1','key1_en','key2_en','best1_en','best2_en','img1','img2','image1','image2','id1','id2','productId1','productId2'].forEach(k => console.log(k + ' = ' + JSON.stringify(f[k])));