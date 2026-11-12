const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const search = "const guides = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'guides.json'), 'utf8').replace(/^\\ufeff/, ''));";
const debug = search + '\nconsole.log("DEBUG: guides loaded, DrumBrute has dolar:", guides.find(g=>g.id==="best-drum-machine").sections[2].content_es.includes("dólar"));';
const newT = t.replace(search, debug);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newT);
console.log('Debug added at correct location');
console.log('Changed:', t !== newT);
