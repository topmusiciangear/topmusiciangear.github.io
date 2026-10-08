const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const cats = {};
p.forEach(x => { cats[x.category] = (cats[x.category] || 0) + 1; });
console.log('CATEGORIES:', JSON.stringify(cats));
const isPA = x => /subwoofer|PA speaker|column|EVERSE|ZLX|EON|PRX|DXR|TS4|ICOA|Stagepas|JRX|ELX200|K12|TS412|CP12|DBR|ART |TX31|EKX|ETX|FBT|SRT|S1 Pro|L1 /i.test(x.title);
const list = p.filter(isPA);
console.log('PA/SUB COUNT:', list.length);
list.forEach(x => {
  const has = x.desc.includes('(each)');
  console.log((has ? 'HAVE ' : 'MISS ') + x.id + ' | ' + x.title);
});
