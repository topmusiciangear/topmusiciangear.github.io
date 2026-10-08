const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const i = s.indexOf('function shopButtonsTest(');
const seg = s.slice(i, i + 45000);
const marker = "if (oosList.indexOf(k) > -1";
const k = seg.indexOf(marker);
console.log(JSON.stringify(seg.slice(k, k + 2200)));
