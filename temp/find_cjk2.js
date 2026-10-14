const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['budget-usb-mics', 'best-monitors-for-small-rooms'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const w = (v, path) => {
    if (typeof v === 'string') {
      if (/[\u4e00-\u9fff]/.test(v)) {
        const j = v.search(/[\u4e00-\u9fff]/);
        console.log(id + ' @ ' + path + '\n   ' + JSON.stringify(v.slice(Math.max(0, j - 90), j + 60)) + '\n   CJK: ' + JSON.stringify([...new Set(v.match(/[\u4e00-\u9fff]/g))]));
      }
    } else if (Array.isArray(v)) v.forEach((x, i) => w(x, path + '[' + i + ']'));
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], path + '.' + k));
  };
  w(g, '');
});