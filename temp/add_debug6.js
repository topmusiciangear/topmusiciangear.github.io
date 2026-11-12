const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const search = '      var pn = pc ? (isEs && pc.pros_es ? pc.pros_es : pc.pros) : undefined;';
const debug = search + '\n      if (pc && pc.name === "Arturia DrumBrute Impact" && isEs) console.log("DEBUG pn:", pn ? pn[3] : "none");';
const newT = t.replace(search, debug);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newT);
console.log('Debug added. Changed:', t !== newT);
