const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const debug = 'console.log("DEBUG DrumBrute:", guides.find(g=>g.id==="best-drum-machine").sections[2].content_es.includes("dólar") ? "DOLAR" : "NO DOLAR");';
const idx = t.indexOf('const tocHtml');
const newT = t.slice(0, idx) + debug + '\n' + t.slice(idx);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newT);
console.log('Debug added');
