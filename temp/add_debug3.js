const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const search = "    console.log(`Generated: guides/${filename}`);";
const debug = search + '\n    if (guide.id === "best-drum-machine" && lang === "es") console.log("DEBUG HTML DrumBrute ES:", html.includes("dólar") ? "DOLAR" : (html.includes("euro") ? "EURO" : "NEITHER"));';
const newT = t.replace(search, debug);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newT);
console.log('Debug added');
console.log('Changed:', t !== newT);
