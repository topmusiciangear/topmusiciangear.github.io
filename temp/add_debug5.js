const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const search = "    fs.writeFileSync(path.join(outDir, filename), html, 'utf8');\r\n    console.log(`Generated: guides/${filename}`);";
const debug = search + '\r\n    if (guide.id === "best-drum-machine" && lang === "es") { console.log("DEBUG WRITE:", html.includes("dólar") ? "DOLAR" : "EURO"); }';
const newT = t.replace(search, debug);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newT);
console.log('Debug added. Changed:', t !== newT);
