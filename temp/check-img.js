var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
var matches=h.match(/620199[^"']*/g);
console.log('All 620199 occurrences:',matches);
