var fs = require('fs');
var src = fs.readFileSync('auto-deals.js', 'utf8');
var start = src.indexOf('function parseWas');
var end = src.indexOf('\n}', src.indexOf('return null;', start)) + 2;
var fn = src.slice(start, end) + '\nconsole.log("babyface was: " + parseWas(fs.readFileSync("temp/babyface.html", "utf8")));\nconsole.log("cd60s was: " + parseWas(fs.readFileSync("temp/cd60s.html", "utf8")));';
fs.writeFileSync('temp/run_parsewas.js', fn);
