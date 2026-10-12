var fs=require('fs');
var lines=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
fs.writeFileSync('temp/chunk.js','var x=['+lines.slice(29,45).join('\n')+'];\nconsole.log("chunk-lines-30-45-done");\n');
console.log('written');
